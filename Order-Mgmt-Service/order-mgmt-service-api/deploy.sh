#!/bin/bash
echo "Deploying to ${ENVIRONMENT? "- Need to set ENVIRONMENT to develop, qa, staging, or production"}"

echo 'Cleaning build directory'
rm -Rf ./build

# Compile our typescript
echo 'Check typescript errors'
./node_modules/.bin/tsc -p . || exit

# Move our Email Templates
echo 'Move files'
cp ./serverless.yml ./build
cp ./package.json ./build
cp ./package-lock.json ./build
cp -r ./environments/. ./build

#cp -R ./serverless-env-vars ./build
#cp -R ./.env ./build

cd ./build || exit

echo 'Npm install'
npm install

echo 'Deploying to AWS Serverless'
../node_modules/.bin/serverless deploy

