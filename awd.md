1. 先备份
```shell
tar -cvf web.tar /var/www/html
zip -q -r web.zip /var/www/html
```

3. 审源码,扫漏洞,上日志waf

### defend:  日志waf,输入replace
```shell
ssh <-p 端口> username@ip
scp 文件路径  username@ip:存放路径
cat /root/.bash_history
#显示最近登录的5个帐号
last -n 5|awk '{print $1}'
#显示/etc/passwd的账户
cat /etc/passwd|awk -F ':' '{print $1}'
#查看UID为0的帐号
awk -F: '{if($3==0)print $1}' /etc/passwd
#查找777的权限的文件
find . -name "*.php" -perm 4777
#查找24小时内被修改的PHP文件
find ./ -mtime 0 -name "*.php"
#查看进程
ps aux | grep pid或者进程名　　　　
#查看已建立的网络连接及进程
netstat -antulp | grep EST
#查看指定端口被哪个进程占用
lsof -i:端口号 或者 netstat -tunlp|grep 端口号
#结束进程命令
kill PID
killall <进程名>
pkill <进程名>
pkill -u用户名
#封杀某个IP或者ip段
iptables -I INPUT -s source_ip[/mask] -j DROP
#禁止从某个主机ssh远程访问登陆到本机
iptable -t filter -A INPUT -s source_ip[/mask] -p tcp --dport 22 -j DROP
#备份mysql数据库
mysqldump -u 用户名 -p 密码 数据库名 > bak.sql
mysqldump --all-databases > bak.sql
#还原mysql数据库
mysql -u 用户名 -p 密码 数据库名 < bak.sql
#定时任务，在固定的时间间隔执行指定的系统指令或shell script
crontab [-u user] file_name
crontab [-u user] [-e |-l| -r]
#检测所有的tcp连接数量及状态
netstat -ant|awk|grep|sed -e -e|sort|uniq -c|sort -rn
#查看页面访问排名前十的IP
cat /var/log/apache2/access.log|cut -f1 -d|sort|uniq -c|sort -k  -r|head -　　
#查看页面访问排名前十的URL
cat /var/log/apache2/access.log|cut -f4 -d|sort|uniq -c|sort -k  -r|head -
```

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230725011242.png)

### break: 写exp,批量攻击脚本(存在提交限制),不死马

```shell
javac -cp 
jar cvf <xxx.jar> *
```
3. 权限维持: 


---
tips
可以`python -m http.server` 来偷别人payload
