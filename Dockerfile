FROM node:20

ADD . /app

WORKDIR /app

RUN npm install 
RUN npm run build
#RUN npm start

ENTRYPOINT ["npm"]
CMD ["start"]
