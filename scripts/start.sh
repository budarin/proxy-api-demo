#!/bin/sh

set -e

rm -rf ./dist;
tsc;
cp ./src/index.html ./dist/client;
node ./dist/server/index.mjs