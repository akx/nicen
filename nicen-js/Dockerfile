FROM node:14
ENV NICEN_JS_PORT 62080
WORKDIR /app
ADD package.json yarn.lock ./
RUN yarn
ADD . ./
CMD node index.js
