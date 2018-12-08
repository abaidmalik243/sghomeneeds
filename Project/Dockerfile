# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:10.9.0

# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn


# Install `serve` to run the application.
RUN npm install -g serve
CMD serve -p $PORT -s build
EXPOSE 80

# Copy all local files into the image.
COPY package.json package.json
RUN npm install

# Copy all local files into the image.
COPY . .

RUN npm run build --production
