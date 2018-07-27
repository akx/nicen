FROM mhart/alpine-node:10.7.0
# h/t https://hub.docker.com/r/frolvlad/alpine-python3/~/dockerfile/
RUN apk add --no-cache python3 py3-zmq py3-psutil clang && \
    python3 -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip && \
    pip3 install --upgrade pip setuptools wheel && \
    if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi && \
    if [[ ! -e /usr/bin/python ]]; then ln -sf /usr/bin/python3 /usr/bin/python; fi && \
    rm -r /root/.cache
RUN pip install --no-cache circus

# Python

ADD ./nicen-py /app/nicen-py
RUN cd /app/nicen-py && pip install --no-cache --quiet -r requirements.txt

# Javascript

ADD ./nicen-js /app/nicen-js
RUN cd /app/nicen-js && yarn --silent --non-interactive --production && yarn cache clean

# Hub and frontend

ADD ./nicen-hub /app/nicen-hub
RUN cd /app/nicen-hub && yarn --silent --non-interactive --production && yarn cache clean
ADD . /app
RUN cd /app/frontend && yarn --silent --non-interactive && yarn build --out-dir=../nicen-hub/public && rm -rf node_modules && yarn cache clean

WORKDIR /app
CMD circusd ./circus.ini
ENV NICEN_PORT 8042
EXPOSE ${NICEN_PORT}
