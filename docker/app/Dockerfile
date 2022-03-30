FROM node:12.20.0

EXPOSE 3000

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
COPY yarn.lock /usr/src/app/yarn.lock

RUN yarn --no-progress --non-interactive --frozen-lockfile

COPY ./components/ /usr/src/app/components
COPY ./content/ /usr/src/app/content
COPY ./lib/ /usr/src/app/lib
COPY ./pages/ /usr/src/app/pages
COPY ./public/ /usr/src/app/public
COPY ./stores/ /usr/src/app/stores
COPY ./types/ /usr/src/app/types
COPY ./server.js /usr/src/app/server.js
COPY ./next.config.js /usr/src/app/next.config.js
COPY ./.eslintrc /usr/src/app/.eslintrc
COPY ./.babelrc /usr/src/app/.babelrc
COPY ./next-env.d.ts /usr/src/app/next-env.d.ts
COPY ./tsconfig.json /usr/src/app/tsconfig.json
COPY ./jest.config.js /usr/src/app/jest.config.js

RUN npm run build

CMD [ "npm", "run", "start" ]