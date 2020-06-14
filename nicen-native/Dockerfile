FROM rust:1.40 as rustfmt-build
RUN cargo install rustfmt --root=/out

FROM node:14
RUN apt-get update -y && apt-get install -y clang-format libxml2-utils
ENV NICEN_JS_PORT 62080
WORKDIR /app
ADD package.json yarn.lock ./
RUN yarn
ADD . ./
COPY --from=rustfmt-build /out /usr/local
CMD node index.js
