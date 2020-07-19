FROM node:12-alpine

RUN apk update && apk add dumb-init curl bash
# install node-prune (https://github.com/tj/node-prune)
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

# where our app will live in container
WORKDIR /app

# react app
COPY  ./packages/dashboard/package.json ./packages/dashboard/package.json

# root package file
COPY package.json package.json
COPY yarn.lock yarn.lock
COPY lerna.json lerna.json

RUN yarn
RUN yarn run bootstrap

# run node prune
RUN /usr/local/bin/node-prune
# copy whatever is here into container
COPY . .

ARG REACT_APP_TEST
ENV REACT_APP_TEST $REACT_APP_TEST

RUN yarn run build

EXPOSE 1234

ENTRYPOINT ["/usr/bin/dumb-init", "--"]