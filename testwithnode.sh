#!/usr/bin/env bash

for file in examples/*.js
do
  echo "$file"
  node "$file"
  echo
done
