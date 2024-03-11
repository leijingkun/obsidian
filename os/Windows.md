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

# 提权
 

# 域渗透
## 信息收集
### 域内常用命令
`ipconifg /all` 查看网卡配置信息,本机IP段,所在域
`net config workstation`查看计算机名,全名,用户名,系统版本,工作站,域,登录域
`net view /domain` 查看当前存在的域
`ping -a <ip>` -a反向根据IP查看主机名
`net view /domain:<域名>` 查看域里所有主机

`net user`

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
- 