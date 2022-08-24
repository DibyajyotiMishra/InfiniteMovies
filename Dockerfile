# pull from a base image
FROM node:15-alpine

# use 'app' as working directory
WORKDIR /app

# copy contents of current directory to 'app'
COPY . /app

# install yarn
RUN apk update && apk add yarn
RUN rm yarn.lock
# RUN apt-get update; apt-get install curl
# RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
# RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
# RUN apt-get update && apt-get install -y yarn

# install dependencies
RUN yarn install --ignore-engines

# build production version
RUN yarn build

# listen on port 3000
EXPOSE 3000

# set Node server
ENTRYPOINT yarn start





