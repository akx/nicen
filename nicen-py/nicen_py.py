from envparse import Env
from flask import Flask, Response, request, jsonify
import black
import time

env = Env()
env.read_envfile()

app = Flask(__name__)

@app.route('/black', methods=['POST'])
def blacken():
    width = int(request.args.get('width', 120))
    src = request.get_data().decode('utf-8')
    t0 = time.perf_counter()
    try:
        dst = black.format_file_contents(
            src,
            line_length=width,
            fast=False,
            mode=black.FileMode.AUTO_DETECT,
        )
    except black.NothingChanged:
        dst = src
    except Exception as exc:
        return (str(exc), 400)

    resp = Response(dst.encode('UTF-8'))
    resp.headers['Content-type'] = 'text/python; charset=utf-8'
    resp.headers['X-Duration'] = str(time.perf_counter() - t0)
    return resp


app.run(
    host=env.str('NICEN_PY_HOST', default='0.0.0.0'),
    port=env.int('NICEN_PY_PORT', default='42080'),
    debug=env.bool('DEBUG', default=False),
)