FROM node:10-alpine
WORKDIR /root/
COPY src /root/src
COPY bin /root/bin
COPY public /root/public
COPY static /root/static
COPY webpack /root/webpack
COPY *.json /root/
COPY *.js /root/
COPY *.babelrc /root/
COPY *.eslintrc /root/

ENV NODE_ENV production
ENV NODE_PATH ./src
ENV NPM_CONFIG_PRODUCTION false
RUN npm i --unsafe-perm
EXPOSE 3000
CMD ["npm", "start"]
