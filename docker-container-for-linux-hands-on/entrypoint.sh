#!/bin/bash
set -e

# /var/run/netns が存在しない場合は作成
mkdir -p /var/run/netns

# /data/netns が存在しない場合は作成
if [ ! -d /data/netns ]; then
    mkdir -p /data/netns
    echo "/data/netns directory created."
fi

# 初回マウント
mount --bind /data/netns /var/run/netns
echo "Network namespaces directory is now bind-mounted."

# inotify を使用して変更を監視し、バインドを維持
inotifywait -m -e create,delete,move /data/netns | while read -r _; do
    echo "Change detected in /data/netns, rebinding..."
    mount --bind /data/netns /var/run/netns
done &

# コンテナが終了しないようにする
exec tail -f /dev/null