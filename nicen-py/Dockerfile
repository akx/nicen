FROM python:3.8
ENV NICEN_PY_PORT 42080
ADD requirements.txt /tmp
RUN pip install --no-cache-dir gunicorn -r /tmp/requirements.txt
ADD . /app
WORKDIR /app
CMD gunicorn -b 0.0.0.0:${NICEN_PY_PORT} --workers=2 nicen_py:app
