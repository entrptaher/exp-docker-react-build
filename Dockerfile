FROM node:11-slim

RUN apt-get update && apt-get install -yq build-essential dumb-init

# where our app will live in container
WORKDIR /app

# react app
COPY  ./dashboard/package.json ./package.json

# Install deps
RUN yarn global add serve
RUN yarn

# copy whatever is here into container
COPY ./dashboard/. .

ARG REACT_APP_TEST
ENV REACT_APP_TEST $REACT_APP_TEST
RUN echo $REACT_APP_TEST 

RUN yarn run build

ENTRYPOINT ["/usr/bin/dumb-init", "--"]