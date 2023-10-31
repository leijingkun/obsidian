
### w1r3s
ip:
`192.168.36.129`

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20231025134356.png)

#### user
- 21 ftp
#ftp 匿名登录
```bash
ftp <IP>
>anonymous
>anonymous
>ls -a # List all files (even hidden) (yes, they could be hidden)
>binary #Set transmission to binary instead of ascii
>ascii #Set transmission to ascii instead of binary
>bye #exit
```

下载所有文件

```bash
wget -m ftp://anonymous:anonymous@10.10.10.98 #Donwload all
wget -m --no-passive ftp://anonymous:anonymous@10.10.10.98 #Download all
```

- 80
扫描得到目录
/administrator
访问查看源码发现是cuppa cms
`searchexploit cuppa`
存在任意文件包含漏洞,读取/etc/shadow,`john`爆破密码,登录用户属于sodu组,直接sudo bash




### billu
`192.168.36.130`



#### user
- 22

- 80
目录扫描
`gobuster dir -u http://192.168.36.130 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt`

