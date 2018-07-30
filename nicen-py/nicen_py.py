from envparse import Env
from flask import Flask, Response, request, jsonify
import black
import autopep8
import time
import functools

env = Env()
env.read_envfile()

app = Flask(__name__)


def as_formatter(func):
    @functools.wraps(func)
    def request_handler():
        width = int(request.args.get('width', 120))
        code = request.get_data().decode('utf-8')
        t0 = time.perf_counter()
        try:
            code = func(code, width=width)
        except Exception as exc:
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

if __name__ == '__main__':
    app.run(
        host=env.str('NICEN_PY_HOST', default='0.0.0.0'),
        port=env.int('NICEN_PY_PORT', default='42080'),
        debug=env.bool('DEBUG', default=False),
    )
