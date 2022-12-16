FROM node:18.12.1-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Needed for prisma
RUN apt-get update
RUN apt-get install -y openssl

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install all (dev + prod) dependencies.
RUN yarn install

# Copy database schema
COPY prisma ./prisma/

# Generate binaries for linux
RUN npx prisma generate

# Copy local code to the container image.
COPY . .

# Run the web service on container startup.
ENTRYPOINT [ "./boot.sh" ]
