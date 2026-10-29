"""
Скачивает фото всех мест из Википедии в папку images/.
Фото сохраняются как images/<id>.jpg, а авторы и лицензии — в images/CREDITS.md.

Запуск из папки проекта (нужен Python 3 и интернет):
    python tools/download_images.py
На Windows можно просто дважды нажать на tools/download_images.bat

Уже скачанные фото пропускаются, поэтому скрипт можно запускать повторно.
Чтобы заменить фото, удалите файл из images/ и строку о нём в CREDITS.md.
"""

import json
import re
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
IMAGES = ROOT / "images"
CREDITS = IMAGES / "CREDITS.md"
WIDTH = 960  # ширина фото; Википедия отдаёт только стандартные размеры (500, 960, 1280…)
API = "https://en.wikipedia.org/w/api.php?format=json&action=query&"
HEADERS = {"User-Agent": "EgyptWay/1.0 (https://github.com/BegzatMamatkarimov/bakhor-site; student project)"}


def download(url, attempts=5):
    # Если Википедия просит подождать (ошибка 429), ждём и пробуем снова
    for attempt in range(attempts):
        try:
            request = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(request, timeout=30) as response:
                return response.read()
        except urllib.error.HTTPError as error:
            if error.code != 429 or attempt == attempts - 1:
                raise
            time.sleep(10 * (attempt + 1))


def ask_api(params):
    return json.loads(download(API + urllib.parse.urlencode(params)))


def clean(text):
    return re.sub(r"<[^>]+>", "", text or "").strip()


def main_photo(article):
    """Имя главного фото статьи Википедии."""
    data = ask_api({"titles": article, "prop": "pageimages", "piprop": "name"})
    page = next(iter(data["query"]["pages"].values()))
    return page.get("pageimage")


def photo_info(file_name):
    """Ссылка на фото шириной WIDTH, автор, лицензия и страница файла."""
    data = ask_api({
        "titles": "File:" + file_name,
        "prop": "imageinfo",
        "iiprop": "url|extmetadata",
        "iiurlwidth": WIDTH,
        "iiextmetadatafilter": "Artist|LicenseShortName",
    })
    info = next(iter(data["query"]["pages"].values()))["imageinfo"][0]
    meta = info.get("extmetadata", {})
    return {
        # Тот же файл отдаёт и upload.wikimedia.org — берём его, адрес надёжнее
        "url": (info.get("thumburl") or info["url"]).replace("//thumb.wikimedia.org/", "//upload.wikimedia.org/"),
        "author": clean(meta.get("Artist", {}).get("value")) or "см. страницу файла",
        "license": clean(meta.get("LicenseShortName", {}).get("value")),
        "page": info.get("descriptionurl", ""),
    }


def main():
    data = (ROOT / "data.js").read_text(encoding="utf-8")
    places = re.findall(r'id: "(\w+)", wiki: "([^"]+)"(?:, photo: "([^"]+)")?', data)
    IMAGES.mkdir(exist_ok=True)

    old = CREDITS.read_text(encoding="utf-8") if CREDITS.exists() else ""
    saved = dict(re.findall(r"- \*\*(\w+)\.jpg\*\* (.+)", old))

    for place_id, article, photo in places:
        print(f"{place_id}: ", end="", flush=True)
        image = IMAGES / f"{place_id}.jpg"
        if place_id in saved and image.exists():
            print("уже есть")
            continue
        try:
            file_name = photo or main_photo(article)
            if not file_name:
                print("в статье нет фото")
                continue
            info = photo_info(file_name)
            image.write_bytes(download(info["url"]))
            saved[place_id] = f"— автор: {info['author']}, лицензия: {info['license']}, источник: {info['page']}"
            print("скачано")
        except Exception as error:
            print(f"ошибка — {error}")
        time.sleep(3)  # не нагружаем серверы Википедии

    lines = ["# Фото", "", "Все фото взяты с Wikimedia Commons.", ""]
    lines += [f"- **{place_id}.jpg** {saved[place_id]}" for place_id, _, _ in places if place_id in saved]
    CREDITS.write_text("\n".join(lines) + "\n", encoding="utf-8")

    missing = [place_id for place_id, _, _ in places if place_id not in saved]
    print("\nГотово!" if not missing else f"\nНе скачались: {', '.join(missing)}. Запустите скрипт ещё раз через минуту.")


if __name__ == "__main__":
    main()
