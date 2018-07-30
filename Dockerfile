FROM base/archlinux:2018.07.01
RUN pacman -Sy --noconfirm nodejs rust python3 clang yarn python-pip
RUN pip3 install --no-cache circus
ENV PIP_DISABLE_PIP_VERSION_CHECK 1

# Python

ADD ./nicen-py /app/nicen-py
RUN cd /app/nicen-py && pip3 install --no-cache --quiet -r requirements.txt

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
