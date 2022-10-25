###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:16-alpine As development

ENV NODE_VERSION=16.18.0

# Create app directory
WORKDIR /usr/src/users-api

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./

# 👇 update npm to the latest version
RUN npm install -g npm@latest

# 👇 clean npm cache
RUN npm cache clean --force

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci

# # 👇 update npm to the latest version
# RUN npm install -g npm@latest

# # 👇 clean npm cache
# RUN npm cache clean --force

# # 👇 delete node modules and package-lock.json 
# RUN npm rm -rf node_modules && rm package-lock.json

# # 👇 retry installing dependencies
# RUN npm install

# Bundle app source
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:16-alpine As build

ENV NODE_VERSION=16.18.0

WORKDIR /usr/src/users-api

COPY --chown=node:node package*.json ./

# In order to run `npm run build` we need access to the Nest CLI.
# The Nest CLI is a dev dependency,
# In the previous development stage we ran `npm ci` which installed all dependencies.
# So we can copy over the node_modules directory from the development image into this build image.
COPY --chown=node:node --from=development /usr/src/users-api/node_modules ./node_modules

COPY --chown=node:node . .

# Run the build command which creates the production bundle
RUN npm run build

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Running `npm ci` removes the existing node_modules directory.
# Passing in --only=production ensures that only the production dependencies are installed.
# This ensures that the node_modules directory is as optimized as possible.
RUN npm ci --only=production && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:16-alpine As production

ENV NODE_VERSION=16.18.0

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/users-api/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/users-api/dist ./dist

# Start the server using the production build
CMD [ "node", "dist/main.js" ]