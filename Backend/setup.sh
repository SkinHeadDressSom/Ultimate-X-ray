#!/bin/bash

echo "🚀 Starting Docker containers..."
docker-compose up -d --build

echo "⚡ Running Kong migrations..."
docker-compose run --rm kong kong migrations bootstrap

# Restart Kong to ensure it picks up the migration changes
echo "🔄 Restarting Kong service..."
docker-compose restart kong

# Ensure Kong Admin API is ready
KONG_ADMIN_URL="http://localhost:8001"
echo "⏳ Waiting for Kong Admin API to be ready..."
until curl -s $KONG_ADMIN_URL >/dev/null; do
  echo "Waiting for Kong Admin API..."
  sleep 2
done

echo "🧹 Cleaning existing Kong configuration..."
# Delete all routes
for route in $(curl -s $KONG_ADMIN_URL/routes | jq -r '.data[].id'); do
  curl -s -X DELETE $KONG_ADMIN_URL/routes/$route
  echo "Deleted route: $route"
done

# Delete all services
for service in $(curl -s $KONG_ADMIN_URL/services | jq -r '.data[].id'); do
  curl -X DELETE $KONG_ADMIN_URL/services/$service
done

# Delete all consumers
for consumer in $(curl -s $KONG_ADMIN_URL/consumers | jq -r '.data[].id'); do
  curl -X DELETE $KONG_ADMIN_URL/consumers/$consumer
done

echo "✅ Kong configuration cleared."

echo "📥 Loading Kong configuration..."
docker-compose exec kong kong config db_import /kong.yml
docker-compose exec kong kong reload
curl -s http://localhost:8001/routes | jq

echo "🎉 Kong setup complete!"
