#!/bin/bash
for i in 1 2 3 4 5; do
  PID=$(netstat -ano | grep ':8788' | grep LISTENING | awk '{print $5}' | head -1)
  [ -z "$PID" ] && break
  taskkill //F //PID "$PID" > /dev/null 2>&1 || true
  sleep 1
done
