#!/bin/bash

if [ -z "$1" ]; then
    target="win"
else
    target="$1"
fi

case $target in
    "win")
        npm run "dist:win"
        exit 0
        ;;
    "mac")
        npm run "dist:mac"
        exit 0
        ;;
    "linux")
        npm run "dist:linux"
        exit 0
        ;;
    "all")
        npm run "dist:all"
        exit 0
        ;;
    *)
        echo "Error: No match for the argument."
        exit 1
        ;;
esac
