#!/bin/bash

ip="$(ifconfig en0 | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1')``"

echo "const ip = '$ip'; module.exports = ip" > ip.js