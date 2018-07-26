FROM mhart/alpine-node:10.7.0
# h/t https://hub.docker.com/r/frolvlad/alpine-python3/~/dockerfile/
RUN apk add --no-cache python3 py3-zmq py3-psutil && \
    python3 -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip && \
    pip3 install --upgrade pip setuptools wheel && \
    if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi && \
    if [[ ! -e /usr/bin/python ]]; then ln -sf /usr/bin/python3 /usr/bin/python; fi && \
    rm -r /root/.cache
RUN pip install --no-cache circus
ADD . /app
RUN cd /app/nicen-py && pip install --no-cache --quiet -r requirements.txt
RUN cd /app/nicen-hub && yarn --silent --non-interactive --production && yarn cache clean
WORKDIR /app
CMD circusd ./circus.ini
ENV NICEN_PORT 8042
EXPOSE ${NICEN_PORT}
