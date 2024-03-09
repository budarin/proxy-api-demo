#!/bin/sh

set -e

tsc ./src/client/index.ts --outDir ./dist/client;
cp ./src/index.html ./dist/client;
http-server ./dist/client -p 3000 -b -g --cors