#!/bin/sh

set -e

tsc --project client.tsconfig.json;
cp ./src/index.html ./dist/client;
http-server ./dist/client -p 3000 -b -g --cors