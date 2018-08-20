import traceback

from bs4.element import MinimalHTMLFormatter
from envparse import Env
from flask import Flask, Response, request
import black
import autopep8
import time
import functools
import textwrap
import bs4

env = Env()
env.read_envfile()

app = Flask(__name__)


class MinimalHTML5Formatter(MinimalHTMLFormatter):
    void_element_close_prefix = None


def as_formatter(func):
    @functools.wraps(func)
    def request_handler():
        width = int(request.args.get('width', 120))
        code = request.get_data().decode('utf-8')
        t0 = time.perf_counter()
        try:
            code = textwrap.dedent(code)
            code = func(code, width=width)
        except Exception as exc:
            traceback.print_exc()
            return (str(exc), 400)
        resp = Response(code.encode('UTF-8'))
        resp.headers['Content-type'] = 'text/python; charset=utf-8'
        resp.headers['X-Duration'] = str(time.perf_counter() - t0)
        return resp

    return request_handler


@app.route('/black', methods=['POST'])
@as_formatter
def blacken(code, width):
    try:
        return black.format_file_contents(
            code,
            line_length=width,
            fast=False,
            mode=black.FileMode.AUTO_DETECT,
        )
    except black.NothingChanged:
        return code


@app.route('/autopep8', methods=['POST'])
@as_formatter
def autopep8ify(code, width):
    return autopep8.fix_code(code)


@app.route('/bs4', methods=['POST'])
@as_formatter
def bs4ify(code, width):
    soup = bs4.BeautifulSoup(code, 'html5lib')
    # If the input document did not smell like a full HTML document, only
    # output the body; `html5lib` will otherwise insist on having all the
    # accoutrements.
    if not any(p in code.lower() for p in ('<html', '<head', '<body')):
        soup = soup.find('body', recursive=True)
        soup.hidden = True  # h/t https://groups.google.com/forum/#!topic/beautifulsoup/-VQdp2p0I8E
    return soup.prettify(formatter=MinimalHTML5Formatter())


if __name__ == '__main__':
    app.run(
        host=env.str('NICEN_PY_HOST', default='0.0.0.0'),
        port=env.int('NICEN_PY_PORT', default='42080'),
        debug=env.bool('DEBUG', default=False),
    )
