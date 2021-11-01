FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies for packages that require node-gyp support on the alpine variant
RUN apk add --no-cache --virtual .gyp python make g++ \
    && npm install \
    && apk del .gyp

COPY . .

# App must run on port 8000
EXPOSE 80

CMD [ "npm", "start" ]
