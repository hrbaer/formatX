#!/usr/bin/env bash

for file in examples/*.js
do
  echo
  echo "$file"
  echo
  node "$file"
  echo '________________________________________________________________________________'
done
echo
