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
### 2. Kerberos认证协议
