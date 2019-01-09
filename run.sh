#!/bin/bash

docker rm -f nodejs
docker rm -f mongodb
docker run --name mongodb -p 8000:8000 -v /projects:/projects -v /usr/local/mongodb/data:/data/db -d mongo:4
docker run -d  --network container:mongodb -v /usr/local/src/expressapp:/src -w /src --name nodejs node:8 sh -c "DEBUG=expressapp:* npm start"
docker logs -f nodejs