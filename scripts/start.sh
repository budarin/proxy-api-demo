#!/bin/sh

set -e

tsc;
cp ./src/index.html ./dist/client;
node ./dist/server/index.mjs