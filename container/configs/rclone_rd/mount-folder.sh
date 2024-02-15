#!/bin/bash

plugin_name="rclone"

# Get realdebrid token (first argument)
if [ -z "$1" ]; then
  echo "No realdebrid token provided"
  exit 1
fi

echo "Creating folder for rclone config and cache"
echo "Config path: $(realpath $(dirname $0))/../../volumes/rclone_rd/config"
config_path=$(realpath $(dirname $0))/../../volumes/rclone_rd/config
cache_path=/tmp/rclone/cache

mkdir -p $config_path
mkdir -p $cache_path


echo "Checking if $plugin_name plugin is installed"

docker plugin ls --filter enabled=true | grep $plugin_name
if test $? -eq 0
then
  echo "$plugin_name plugin already installed"
  exit 0
fi

docker plugin ls --filter enabled=false | grep $plugin_name
if test $? -eq 0
then
  echo "$plugin_name plugin exists but is not enabled"
  echo "Enabling $plugin_name plugin"
  docker plugin enable $plugin_name
fi

echo "rclone_rd plugin not installed"
echo "Installing rclone_rd plugin"
docker plugin install itstoggle/docker-volume-rclone_rd:amd64 args="-v" --alias $plugin_name --grant-all-permissions config=$config_path cache=$cache_path

echo "Creating rclone volume"
# if volume already exists, remove it
docker volume rm -f realdebrid > /dev/null
docker volume create realdebrid -d $plugin_name -o type=realdebrid -o realdebrid-api_key=$1 -o allow-other=true -o dir-cache-time=10s

echo "Mounting successfully"