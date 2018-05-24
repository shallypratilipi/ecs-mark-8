FROM 370531249777.dkr.ecr.ap-south-1.amazonaws.com/node:8.3.0
#FROM node:carbon


# Install app dependencies
COPY package.json package.json
RUN npm install

# Bundle app source

COPY .babelrc .babelrc
COPY .eslintignore .eslintignore
COPY .eslintrc.js .eslintrc.js
COPY .postcssrc.js .postcssrc.js
COPY index.html index.html
COPY build.sh build.sh
COPY build build
COPY config config
COPY static static
COPY src src

RUN ./build.sh

COPY old_build old_build
COPY server.js .

EXPOSE 80
