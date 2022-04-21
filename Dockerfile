FROM node:18-alpine

WORKDIR /web/lucos/speak

# Legacy method of installing resources was using the lucos_core library - installed in a relative location on the file system
RUN apk add git
RUN git clone https://github.com/lucas42/lucos_core.git /web/lucos/core

COPY . .

ENV NODE_ENV production
EXPOSE 8014

CMD [ "node", "server.js" ]