#!/usr/bin/env bash
# Probe every screen's reveal, in chunks, with a fresh dev server per chunk.
#
#   bash tools/probe-all.sh
#
# One pass over 35 screens is a few thousand Fast Refresh rebuilds on one Metro
# process, and it does not survive that: after 23 screens the web server hit
# `Ineffective mark-compacts near heap limit` at 3.7GB and took the run down at
# screen 24. The screens either side of that line measured identically across
# two passes, so the failure is positional - a long pass degrades, it does not
# find bad screens. Hence chunks, and a larger heap inside each one.
set -u
cd "$(dirname "$0")/.."
LOG=.probe/stage-all.log
: > "$LOG"

kill_server() {
  for pid in $(netstat -ano | grep -E ":8082 .*LISTENING" | awk '{print $5}' | sort -u); do
    taskkill //F //T //PID "$pid" >/dev/null 2>&1
  done
  sleep 3
}

start_server() {
  # `grep "LISTENING.*:8082"` can never match - netstat prints LISTENING AFTER
  # the port, so that readiness loop waits for ever. Match the port first.
  NODE_OPTIONS=--max-old-space-size=8192 npx expo start --web --port 8082 \
    > ".probe/expo-$1.log" 2>&1 &
  until netstat -ano | grep -Eq ":8082 .*LISTENING"; do sleep 2; done
  # Warm the bundle, so the first screen is not measured through the cold build.
  curl -s -o /dev/null --max-time 420 http://localhost:8082/ || true
  sleep 5
}

chunk() {
  name=$1
  shift
  kill_server
  start_server "$name"
  echo "--- chunk $name ---" >> "$LOG"
  python tools/stage-all.py "$@" >> "$LOG" 2>&1
  echo "chunk $name exit=$?" >> "$LOG"
}

chunk a romeospot romeobook romeodate crypinhome crypinswap crypinconfirm \
        vestahome vestabrowse vestaitem lumistart lumihome lumistock
chunk b tamarstart tamarfind tamargym zonestart zonehome zonemenu zoneroute \
        zoneitem vitalcycle vitalweight vitalprog vitalstats
chunk c vitalday sonichome sonicplay sonicexplore quranone qurantwo \
        quranthree twirlfeed globestart globehome globestay

kill_server
echo "all chunks done" >> "$LOG"
