云服务器配置

### 新建用户
```
sudo useradd -s /bin/bash ubuntu
sudo passwd ubuntu
```

### 软件清单

#### yazi
https://yazi-rs.github.io/docs/quick-start/

debian/ubuntu需要手动编译/下载release
`yazi-x86_64-unknown-linux-musl.zip`
解压
```bash
sudo mv ya* /usr/local/bin
sudo chmod +x /usr/local/bin/yazi /usr/local/bin/ya
```

#### docker

```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

```bash
#换源
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://7hfmt1g5.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

#### docker面板-dpanel

```bash
sudo curl -sSL https://dpanel.cc/quick.sh -o quick.sh && sudo bash quick.sh
```

