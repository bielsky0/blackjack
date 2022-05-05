FROM node:17
RUN apt-get update
WORKDIR /backend
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "run" ,"start"]
