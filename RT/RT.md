
[[VulnHub]]

# nmap红队四扫

```bash
#全端口扫描
sudo nmap --min-rate 10000 <ip> -p- -oA nmapscan/ports

#tcp全扫
sudo nmap -sT -sV -sC -O -p22,80,8080 <ip> -oA nmapscan/detail

#udp快速扫描
sudo nmap -sU --top-ports 30 <ip> -oA nmapscan/udp

#script扫
sudo nmap --script-vuln -p21,80,22,3306 <ip> nmapscan/vuln

```

分隔端口号
`cat ports.txt |awk -F'/' '{print $1}' |paste -sd ','`

存储到变量里
ports=$(cat ports.txt |awk -F '/' '{print $1}' |paste -sd ',')


# 信息收集
## IP和端口信息
[参考文章](https://xz.aliyun.com/t/9455)
### ASN
autonomous system number:自治系统号
> An autonomous system number is a unique identifier that is globally available and allows its autonomous system to exchange routing information with other systems.
> 
> 自治系统编号是一个唯一的全局可用的标识符，并允许其自治系统与其他系统交换路由信息

**ASN编号的格式:**
`AS59055` :杭州阿里巴巴广告有限公司

#### 自治系统
autonomous system
"自治系统（AS）是具有统一路由策略的巨型网络或网络群组"
###  BGP路由协议
border gateway protocol 边界网关协议
> 主要用于互联网AS(自治系统)之间的互联，BGP的最主要功能在于控制路由的传播和选择最好的路由。

http://wq.apnic.net/static/search.html
https://bgp.he.net/cc#_prefixes
https://spyse.com/ (比较适合用来快速分析网站信息)
### NMAP使用
Ping选项
```
-PE/-PI (ICMP Echo Request Ping)
-PN/-PD/-P0 (不Ping)
-PS (TCP SYN Ping)
-PU (UDP Ping)
-PY (SCTP Ping)
-PO (IP Protocol Ping)
-PP (ICMP Timestamp Ping)
-PM (ICMP Address Mask Ping)
-R (Require Reverse)
-n (Disable Reverse DNS)
--dns-servers (Specify DNS Servers)`
```
OS系统探测
```
-O (系统指纹)
-A (更高级，更详细的识别操作系统)
--osscan-limit (限制系统扫描)
--osscan-guess, --fuzzy (更灵活的猜测)
```
版本探测
```
-sV (版本扫描)
--allports (不错过任何端口)
--version-intensity <Level> (版本扫描强度) 设置从 0 (简单) 到 9 (详细)
--version-light (简单扫描版本)
--version-all (扫描全部版本)
--version-trace (For Debugging) 显示NMAP细节
```
扫描技术
```
-sS (TCP SYN Scan) 半开扫描也是隐形扫描
-sT (TCP Connect() Scan) 
-sA (ACK Scan)
-sW (Window Scan)
-sU (UDP Scan)
-sN (Null Scan)
-sF (FIN Scan)
-sX (Xmas Tree Scan)
--scanflags <Flags> (Customize TCP Scan Flags)
-sP (Ping Scan)
-sO (IP Protocol Scan)
-sR (RPC Scan) Remote Procedure Call
-sP (Ping Scan)
-sn (Ping Scan) 不扫描端口
-sL (List Scan) 简单的列表扫描
-sI (Idle Scan) Zombie Scan
-b (FTP Bounce Attack)
-sY (SCTP Init Scan)
-sZ (Cookie-Echo Scans)
#### 机器和端口选项
--exclude (不包括某主机/网络) 
--excludefile (不包括目标文件)
-iR (随机目标)
--randomize_hosts/-rH (随机主机)
-iL (文件中读取目标) 
-Pn (视所有主机为在线状态) 
--system-dns (使用系统的 DNS解析)
--traceroute (追踪每个跃点)
-p <Port Range> (只扫描特殊端口)
-F (Fast Scan) 扫描比默认状态更少的端口，快速扫描
-r (连续扫描) 
--top-ports (扫描常见端口)
--port-ratio (扫描比常见端口更多的端口)
```
防火墙/ids规避和欺骗
```
-f/-ff (分段IP数据包)
--mtu <databytes>(最大传输单位)
--ttl <value> (存活时间)
-D <decoy1,decoy2[,ME],...> (创建诱饵掩盖目标)
-S <IP_Address> (欺骗源地址)
-e <iface> (使用指定接口)
-g/--source-port (扫描给定的端口)
--proxies <url1,[url2],...>(通过 HTTP/SOCKS4 代理中继连接)
--data-length <databytes> (Data Length) 将随机数据附加到发送的数据包
--spoof-mac <mac address/prefix/vendor name>  mac地址欺骗
--badsum (伪造数据包)  发送带有伪造 TCP/UDP/SCTP 校验和的数据包
--host-timeout <milliseconds> 主机超时时间
--initial-rtt-timeout <milliseconds> (初始化往返超时)
--min-rtt-timeout <milliseconds> (最小超时时间)
--max-rtt-timeout <milliseconds> (最大超时时间)
--max-hostgroup <number> (每次扫描的最大并行主机数)
--min-hostgroup <number> (每次扫描的最小并行主机数)
--max-parallelism <number> (最大并行端口扫描)
--min-parallelism <number> (最小并行端口扫描)
--scan-delay <milliseconds> (扫描之间的最小延迟)
--max-scan-delay <milliseconds> (探针之间的最大延迟)
--timing/-T<0|1|2|3|4|5> (扫描力度，简单 (T0)| 偷偷摸摸 (T1)| 礼貌 (T2)| 正常 (T3)| 使劲 (T4)| 疯狂 (T5))
--min-rate <number> (每秒发送数据包的速度不低于 <Number>)
--max-rate <number> (每秒发送数据包的速度不超过 <Number>)
```
运行时交互和报告选项
```
-v/--verbose/-vv (详细模式/增加详细度)
-d/--debug/-dd (调试模式/增加详细度)
--interactive (交互模式)
--noninteractive (非交互模式)
--reason (显示端口处于特定状态的原因)
--open (仅显示打开（或可能打开）的端口)
--packet-trace (数据包跟踪显示所有发送和接收的数据包)
-iflist (打印主机接口和路由（用于调试）)
--log-errors (将错误/警告记录到正常格式的输出文件)
--append-output (追加输出)
--resume <logfilename> (恢复中止的扫描)
--stylesheet <path/URL> (将 XML 输出转换为 HTML)
--webxml (参考来自 Nmap.Org 的样式表以获得更可移植的 XML)
--no-stylesheet (防止 XSL 样式表与/XML 输出的关联)
-oA (一次输出三种主要格式)
-oN <logfilename> (常规模式)
-oX <logfilename> (XML Format)
-oG <logfilename> (Grepable Format)
-oS <logfilename> (Script Kiddie Format)
```
脚本和其他选项
```
-sC/--script <Lua Script> (使用lua脚本)
--script-args <n1=v1,[n2=v2,...]> (脚本参数)
--script-args-file=filename (参数写入文件)
--script-trace (显示所有发送和接收的数据)
--script-updatedb (升级脚本库)
--script-help <Lua Script> (显示脚本帮助细节)
-h/--help (帮助查看)
-V/--version (Nmap 版本)
--datadir <directory_name> (Data目录)
-6 (IPv6 支持)
--privileged (完整权限)
```

## 域名信息
### CDN检测
[多地ping](https://ping.chinaz.com/)
nslookup
[CNDfinder](https://www.cdnplanet.com/tools/cdnfinder/)
### 绕过CDN
历史ip记录 [dns历史记录](https://viewdns.info/)
[https证书](https://censys.io/)
whois  https://whois.aliyun.com/
## 子域名检查
本地subdomain爆破
```shell
cd C:\Users\20925\Desktop\Info\子域名爆破\subDomainsBrute
python .\subDomainsBrute.py <url> -o <path>
```

## 网站架构和指纹识别
[svn文件泄露](https://github.com/admintony/svnExploit)
[url提取网站](https://www.bulkdachecker.com/url-extractor/)
## 其他信息
- 默认密码
https://default-password.info/
http://routerpasswords.com
注册时临时验证
Sms
https://www.materialtools.com/
http://receivefreesms.com/
Email
https://10minutemail.net/
https://zh.mytrashmailer.com/
http://24mail.chacuo.net/enus
https://www.linshiyouxiang.net/
Fake id
https://www.fakenamegenerator.com/
http://www.haoweichi.com/
https://www.fakeaddressgenerator.com/
威胁情报平台
Virustotal: https://www.virustotal.com/gui/home/upload
腾讯哈勃分析系统:https://habo.qq.com/tool/index
微步在线威胁情报:https://x.threatbook.cn/
奇安信威胁情报:https://ti.qianxin.com/
360威胁情报:https://ti.360.net/#/homepage
安恒威胁情报:https://ti.dbappsecurity.com.cn/
火线安全平台:https://www.huoxian.cn
Hacking8安全信息流:https://i.hacking8.com/
零零信安:https://0.zone



# 内网

## 端口转发
### 正向端口转发
边界机有双网卡,内+外
217为边界,108为内网
- windows
```powershell
netsh interface portproxy add v4tov4 listenport=3389 listenaddress=172.16.217.186 connectport=3389 connectaddress=172.16.108.184
//查看存在的转发
netsh interface portproxy show all
//使用netstat确保 3389 端口当前处于被侦听状态：
netstat -ano | findstr 3389
```
- linux
```bash
sudo iptables -I INPUT -p tcp -m tcp --dport 3389 -j ACCEPT
sudo iptables -t nat -A PREROUTING -p tcp --dport 3389 -j DNAT --to-destination 172.16.108.184:3389
sudo iptables -t nat -A POSTROUTING -j MASQUERADE
sudo iptables -I FORWARD -j ACCEPT
sudo iptables -P FORWARD ACCEPT
sudo sysctl net.ipv4.ip_forward=1

#重启防火墙
sudo ufw disable && sudo ufw enable
#其他系统
/etc/init.d/iptables restart
```

或使用socat
```bash
socat TCP4-LISTEN:3389,fork TCP4:172.16.108.184:3389

```


### 反向端口转发
> 公网Web服务器只有内网 ip，然后通过路由器把 80 端口映射到公网的 ip上。这种情况下不能让 Web服务器直接监听本地的端口，然后让攻击主机进行连接，因为路由器只做了80端口的映射。




## socks代理
frp
[[tool#frp]]
### reGeorg
> 如果我们获得了一个webshell，可以使用 socks 代理的webshell来实现 socks代理。


## 隧道
### ssh隧道
```bash
ssh -CfNg -D localhost:1086 ubuntu@localhost
```



