FROM node:14 AS frontend-build
WORKDIR /frontend
ADD frontend/package.json frontend/yarn.lock ./
RUN yarn --silent --non-interactive
ADD frontend/ ./
ADD assets/ /assets/
RUN yarn build --out-dir=/public

FROM node:14
ENV NICEN_PORT 8042
WORKDIR /app
ADD nicen-hub/package.json nicen-hub/yarn.lock ./
RUN yarn --silent --non-interactive --production
ADD nicen-hub/ ./
COPY --from=frontend-build /public ./public
CMD node index.js
