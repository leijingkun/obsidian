## powershell

 `Cmdlet`格式  （动词-名称）

Common verbs to use include:

-   Get
-   Start
-   Stop 
-   Read
-   Write
-   New
-   Out

**举例**

列出命令列表 `Get-Command`

支持模式匹配 `Get-Command Verb*`

*    递归查找 "interesting-file.txt"

    ```powershell
    Get-ChildItem -Path "文件夹路径" -Filter "b64.txt" -Recurse
    ```

感觉没必要做笔记了，chatGBT完全可以拿下了
# 信息收集
### 88-kerberos-sec
可以使用kerbrute爆破用户名
> 在kerberos的AS-REQ认证中当cname值中的用户不存在时返回包提示KDC_ERR_C_PRINCIPAL_UNKNOWN，所以当我们没有域凭证时，可以通过Kerberos pre-auth从域外对域用户进行用户枚举。


`.\kerbrute_windows_amd64.exe userenum -d jab.htb --dc dc01.jab.htb D:\dict\wordlists\SecLists\Usernames\xato-net-10-million-usernames-dup.txt`
获取users里的用户列表的hash
> 对于域用户，如果设置了选项Do not require Kerberos preauthentication(不要求Kerberos预身份认证)，此时向域控制器的88端口发送AS-REQ请求，对收到的AS-REP内容重新组合，能够拼接成”Kerberos 5 AS-REP etype 23”(18200)的格式，接下来可以使用hashcat或是john对其破解，最终获得该用户的明文口令。默认情况下该配置不会设置。
不要求Kerberos预身份认证默认不启用

`impacket-GetNPUsers jab.htb/ -usersfile users -format hashcat -outputfile hashes`

# 提权
总结
```bash
1. 查看有无可滥用的令牌
2. 
```
### window访问令牌
> 每个登录到系统的用户都持有一个包含该登录会话安全信息的访问令牌。当用户登录时，系统会创建一个访问令牌。代表用户执行的每个进程都有访问令牌的副本。该令牌标识用户、用户所属的组以及用户的特权。令牌还包含一个标识当前登录会话的登录SID（安全标识符）。

> 当本地管理员登录时，会创建两个访问令牌：一个具有管理员权限，另一个具有普通权限。默认情况下，当此用户执行进程时，将使用具有常规（非管理员）权限的令牌。当此用户尝试以管理员身份执行任何操作（例如“以管理员身份运行”）时，将使用UAC来请求权限。

当用于任何其他用户的有效凭据,可以通过凭据创建一个新的登录会话:
`runas /user:domain\username cmd.exe`

```powershell
#查看SID(安全标识符),组
whoami /all
```
### 访问控制列表(ACL)

### MS14-068提权

## rpcclient
rpc remote procedure call 远程过程调用,它允许请求操作另一台计算机上的服务

# 域渗透
## 信息收集

### rpcclient

登录
`rpcclient -U "drbrown" 10.10.11.241`

### 域内常用命令
`ipconifg /all` 查看网卡配置信息,本机IP段,所在域
`net config workstation`查看计算机名,全名,用户名,系统版本,工作站,域,登录域
`net view /domain` 查看当前存在的域
`ping -a <ip>` -a反向根据IP查看主机名
`net view /domain:<域名>` 查看域里所有主机

`net user`

```text
net view                 # 查看局域网内其他主机名
net config Workstation   # 查看计算机名、全名、用户名、系统版本、工作站、域、登录域
net user                 # 查看本机用户列表
net user /domain         # 查看域用户
net localgroup administrators # 查看本地管理员组（通常会有域用户）
net view /domain         # 查看有几个域
net user 用户名 /domain   # 获取指定域用户的信息
net group /domain        # 查看域里面的工作组，查看把用户分了多少组（只能在域控上操作）
net group 组名 /domain    # 查看域中某工作组
net group "domain admins" /domain  # 查看域管理员的名字
net group "domain computers" /domain  # 查看域中的其他主机名
net group "doamin controllers" /domain  # 查看域控制器主机名（可能有多台）
```

## window认证机制
### 1. NTLM认证协议
> NTLM hash本地的认证
> 
> 当用户注销、重启、锁屏之后，windows会让winlogon显示登陆界面，接收用户的输入之后，会将将密码交付给lsass进程，这个进程会将明文密码加密成NTLM hash，再与SAM数据库里对应的用户密码做对比。

- winlogon(Windows logon process)windows注册进程：是windows NT 用户的登陆程序，用于管理用户的登陆与退出
- lsass( Local Security Authority Service): 用于本地安全与登陆策略
- SAM(Security Account Manager 安全账户管理)：windows采用的账户管理策略，这个策略会将本地组的用户的账户和hash加密之后保存到SAM数据库中，SAM数据库文件路径是%systemroot%\system32\config\SAM文件




### 2. Kerberos认证协议
 
## 攻击
### 1.Hash传递攻击 PTH(Pass The Hash)

> 如果内网主机的本地管理员账户密码相同，那么可以通过pass the hash远程登录到任意一台主机，操作简单、威力无穷。



+ 在工作组环境中：

Windows 2003和之前的机器，可以使用本地管理员组内用户进行攻击。
Windows 2003 之后的机器，只能是administrator用户的哈希值才能进行哈希传递攻击，其他用户(包括管理员用户但是非administrator)也不能使用哈希传递攻击，会提示拒绝访问。
- 在域环境中：

只能是域管理员组内用户(可以是域管理员组内非administrator用户)的哈希值才能进行哈希传递攻击，攻击成功后，可以访问域内任何一台机器。



使用mimikatz工具

### 2.票据传递攻击 PTT(Pass The Ticket)

### 3.黄金票据伪造
> TGT=Krbtgt的NTLM哈希加密
> 
> 1、Kerberos中的TGT和Logon Session Key（CT_SK）是AS返回的，TGT它是由Krbtgt加密和签名的，krbtgt的 NTLM Hash又是固定的，而CT_SK并不会保存在KDC中。
> 
> 2、所以只要得到krbtgt的NTLM Hash，就可以伪造TGT和Logon Session Key（CT_SK）。
> 
> 3、Client与TGS的交互中，而已有了黄金票据后（TGT），就跳过AS验证，不用验证账户和密码，所以也不担心域管密码修改。

