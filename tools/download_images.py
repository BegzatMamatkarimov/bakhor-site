"""
Скачивает фото всех мест из Википедии в папку images/
и записывает авторов и лицензии в images/images.js.

Запуск из папки проекта (нужен Python 3 и интернет):
    python tools/download_images.py

Ничего устанавливать не нужно — только стандартная библиотека Python.
"""

import html
import json
import re
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
IMAGES = ROOT / "images"
WIDTH = 1200  # ширина фото в пикселях — хватает для карточек и окна места
HEADERS = {"User-Agent": "EgyptWay-student-project/1.0 (educational website)"}


def get(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as res:
        return res.read()


def get_json(url):
    return json.loads(get(url).decode("utf-8"))


def strip_tags(text):
    return html.unescape(re.sub(r"<[^>]+>", "", text or "")).strip()


def credits_for(file_name):
    """Автор, лицензия и страница файла на Wikimedia Commons."""
    api = (
        "https://commons.wikimedia.org/w/api.php?action=query&format=json"
        "&prop=imageinfo&iiprop=url|extmetadata&titles="
        + urllib.parse.quote("File:" + file_name)
    )
    pages = get_json(api)["query"]["pages"]
    info = next(iter(pages.values())).get("imageinfo", [{}])[0]
    meta = info.get("extmetadata", {})
    return {
        "author": strip_tags(meta.get("Artist", {}).get("value", "")),
        "license": strip_tags(meta.get("LicenseShortName", {}).get("value", "")),
        "source": info.get("descriptionurl", ""),
    }


def main():
    data = (ROOT / "data.js").read_text(encoding="utf-8")
    sights = re.findall(r'id: "(\w+)", wiki: "([^"]+)"', data)
    if not sights:
        sys.exit("Не нашёл места в data.js")

    IMAGES.mkdir(exist_ok=True)
    result = {}

    for sight_id, wiki in sights:
        print(f"→ {sight_id} ({wiki}) … ", end="", flush=True)
        try:
            summary = get_json(
                "https://en.wikipedia.org/api/rest_v1/page/summary/" + urllib.parse.quote(wiki)
            )
            original = summary.get("originalimage", {})
            thumb = summary.get("thumbnail", {})
            if not original:
                print("нет фото в статье")
                continue

            # Берём уменьшенную копию шириной WIDTH, если оригинал больше
            url = original["source"]
            if thumb and original.get("width", 0) > WIDTH:
                url = re.sub(r"/\d+px-", f"/{WIDTH}px-", thumb["source"])

            ext = Path(urllib.parse.urlparse(url).path).suffix.lower() or ".jpg"
            if ext not in (".jpg", ".jpeg", ".png", ".webp"):
                ext = ".jpg"
            file_path = IMAGES / f"{sight_id}{ext}"
            file_path.write_bytes(get(url))

            file_name = urllib.parse.unquote(urllib.parse.urlparse(original["source"]).path.split("/")[-1])
            info = credits_for(file_name)
            result[sight_id] = {
                "file": f"images/{file_path.name}",
                "author": html.escape(info["author"])[:120],
                "license": html.escape(info["license"]),
                "source": info["source"],
            }
            print(f"ok ({file_path.stat().st_size // 1024} КБ)")
        except Exception as error:  # одно неудачное фото не должно останавливать остальные
            print(f"ошибка: {error}")
        time.sleep(0.5)  # не нагружаем серверы Википедии

    js = (
        "// Скачанные фото мест. Файл перезаписывается скриптом tools/download_images.py\n"
        "const LOCAL_IMAGES = "
        + json.dumps(result, ensure_ascii=False, indent=2)
        + ";\n"
    )
    (IMAGES / "images.js").write_text(js, encoding="utf-8")
    print(f"\nГотово: {len(result)} из {len(sights)} фото в папке images/")


if __name__ == "__main__":
    main()
