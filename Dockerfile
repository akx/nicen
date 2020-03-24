FROM archlinux/base:latest as dotnetbuild
RUN pacman -Sy --noconfirm
RUN pacman -S --noconfirm dotnet-sdk

ADD ./nicen-dotnet /app/nicen-dotnet
RUN cd /app/nicen-dotnet && dotnet restore && dotnet build && dotnet publish -o /app/nicen-dotnet-built

FROM archlinux/base:latest
RUN pacman -Sy --noconfirm
RUN pacman -S --noconfirm nodejs rust python3 clang yarn python-pip dotnet-runtime libxml2 glibc git
ENV PIP_DISABLE_PIP_VERSION_CHECK 1
RUN pip3 install --no-cache circus gunicorn

# Python

ADD ./nicen-py /app/nicen-py
RUN cd /app/nicen-py && pip3 install --no-cache --quiet -r requirements.txt

# Javascript

ADD ./nicen-js /app/nicen-js
RUN cd /app/nicen-js && yarn --silent --non-interactive --production && yarn cache clean

# .NET

ADD ./nicen-dotnet /app/nicen-dotnet
COPY --from=dotnetbuild /app/nicen-dotnet-built /app/nicen-dotnet-built

# Hub

ADD ./nicen-hub /app/nicen-hub
RUN cd /app/nicen-hub && yarn --silent --non-interactive --production && yarn cache clean

# Frontend

ADD ./frontend /app/frontend
ADD ./assets /app/assets
RUN cd /app/frontend && yarn --silent --non-interactive --production && yarn build --out-dir=../nicen-hub/public && rm -rf node_modules && yarn cache clean

# Configuration and all the rest

ADD . /app
WORKDIR /app
CMD circusd ./circus.ini
ENV NICEN_PORT 8042
ENV NICEN_PY_PORT 42080
EXPOSE ${NICEN_PORT}
