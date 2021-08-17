#!/bin/bash
set -e

if [ ! -f "/app/database/production.sqlite3" ]; then
  cd /app && bundle exec rails db:reset
fi

# Remove a potentially pre-existing server.pid for Rails.
rm -f /app/tmp/pids/server.pid

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"