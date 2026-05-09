from pathlib import Path

from flask import Flask, abort, send_from_directory


SITE_ROOT = Path(__file__).resolve().parent / "_site"

app = Flask(__name__, static_folder=None)


@app.route("/")
def home():
    return send_site_file("index.html")


@app.route("/<path:requested_path>")
def site_file(requested_path):
    path = requested_path.strip("/")

    if not path:
        path = "index.html"

    if "." not in Path(path).name:
        path = f"{path}.html"

    return send_site_file(path)


def send_site_file(path):
    target = (SITE_ROOT / path).resolve()

    if SITE_ROOT not in target.parents and target != SITE_ROOT:
        abort(404)

    if not target.is_file():
        abort(404)

    return send_from_directory(SITE_ROOT, path)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
