FROM node:15.8.0-buster
ENV NICEN_JS_PORT 62080
RUN apt-get update -y && apt-get install -y --no-install-recommends ruby2.5
WORKDIR /app
ADD package.json yarn.lock ./
RUN yarn
ADD . ./
CMD node index.js
