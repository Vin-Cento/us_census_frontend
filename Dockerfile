FROM node:alpine

WORKDIR /app
COPY package.json .

RUN ["npm", "install"]
ENTRYPOINT [ "npm", "run", "dev" ]
