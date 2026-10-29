"""
Скачивает фото всех мест из Википедии в папку images/.
Фото сохраняются как images/<id>.jpg, а авторы и лицензии — в images/CREDITS.md.

Запуск из папки проекта (нужен Python 3 и интернет):
    python tools/download_images.py
На Windows можно просто дважды нажать на tools/download_images.bat
"""

import json
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
IMAGES = ROOT / "images"
WIDTH = 1000  # ширина фото в пикселях
HEADERS = {"User-Agent": "EgyptWay-student-project/1.0"}


def download(url):
    request = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.read()


def download_json(url):
    return json.loads(download(url).decode("utf-8"))


def clean(text):
    return re.sub(r"<[^>]+>", "", text or "").strip()


def get_credits(file_name):
    url = (
        "https://commons.wikimedia.org/w/api.php?action=query&format=json"
        "&prop=imageinfo&iiprop=url|extmetadata&titles=" + urllib.parse.quote("File:" + file_name)
    )
    page = next(iter(download_json(url)["query"]["pages"].values()))
    info = page.get("imageinfo", [{}])[0]
    meta = info.get("extmetadata", {})
    author = clean(meta.get("Artist", {}).get("value")) or "неизвестен"
    license_name = clean(meta.get("LicenseShortName", {}).get("value"))
    return author, license_name, info.get("descriptionurl", "")


def main():
    data = (ROOT / "data.js").read_text(encoding="utf-8")
    places = re.findall(r'id: "(\w+)", wiki: "([^"]+)"', data)
    IMAGES.mkdir(exist_ok=True)
    credits = ["# Фото\n", "Все фото взяты с Wikimedia Commons.\n"]
    done = 0

    for place_id, wiki in places:
        print(f"{place_id}: ", end="", flush=True)
        try:
            summary = download_json(
                "https://en.wikipedia.org/api/rest_v1/page/summary/" + urllib.parse.quote(wiki)
            )
            original = summary.get("originalimage")
            if not original:
                print("в статье нет фото")
                continue

            url = original["source"]
            thumb = summary.get("thumbnail")
            if thumb and original.get("width", 0) > WIDTH:
                url = re.sub(r"/\d+px-", f"/{WIDTH}px-", thumb["source"])

            (IMAGES / f"{place_id}.jpg").write_bytes(download(url))

            file_name = urllib.parse.unquote(original["source"].split("/")[-1])
            author, license_name, page_url = get_credits(file_name)
            credits.append(f"- **{place_id}.jpg** — автор: {author}, лицензия: {license_name}, источник: {page_url}")
            done += 1
            print("скачано")
        except Exception as error:
            print(f"ошибка — {error}")
        time.sleep(0.5)

    (IMAGES / "CREDITS.md").write_text("\n".join(credits) + "\n", encoding="utf-8")
    print(f"\nГотово: {done} из {len(places)} фото в папке images/")


if __name__ == "__main__":
    main()
