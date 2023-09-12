#!/usr/bin/env bash

echo Started

echo "generate I18n"
node script/generate-i18n.js
echo "Format source"
yarn eslint
yarn fix

echo Finished