FROM node:14
RUN apt-get update -y && apt-get install -y clang-format libxml2-utils
RUN curl --proto '=https' --tlsv1.2 -sSf -o ./rustup-init https://static.rust-lang.org/rustup/dist/x86_64-unknown-linux-gnu/rustup-init && \
    chmod u+x ./rustup-init && \
    ./rustup-init -y --profile minimal -c rustfmt && \
    rm ./rustup-init && \
    ln -s /root/.rustup/toolchains/stable-x86_64-unknown-linux-gnu/bin/rustfmt /usr/local/bin
ENV NICEN_JS_PORT 62080
WORKDIR /app
ADD package.json yarn.lock ./
RUN yarn
ADD . ./
CMD node index.js
