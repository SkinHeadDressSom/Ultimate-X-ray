#!/bin/bash
echo "Starting Docker containers..."
docker-compose up -d

echo "Running Kong migrations..."
docker-compose run --rm kong kong migrations bootstrap

echo "Loading Kong configuration..."
docker-compose exec kong kong config db_import /kong.yml
