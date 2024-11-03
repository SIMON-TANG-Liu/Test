#!/bin/bash

# 构建镜像
if docker build -t swanlab-core-app:latest .; then
  echo "Docker build succeeded."

  # 清理未使用的镜像
  if docker image prune -f; then
    echo "Docker image prune succeeded."

    # 切换到指定目录
    cd ~/SwanLab-IaC/deploy/dev || { echo "Directory ~/SwanLab-IaC/deploy/dev does not exist."; exit 1; }

    # 启动容器
    docker compose up swanlab-core-app -d
  else
    echo "Docker image prune failed."
    exit 1
  fi
else
  echo "Docker build failed."
  exit 1
fi
