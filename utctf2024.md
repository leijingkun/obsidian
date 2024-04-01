# web
### Beginner: Off-Brand Cookie Clicker
前端题,直接js找接口
### Schrödinger
zip软链接读取文件
`mklink /home/xxxx/flag.txt flag`

### Easy Mergers v0.1
一个创建公司(json)并允许使用merge合并,应该是原型链污染,没找到要污染的属性
payload
`{"attributes":["__proto__"],"values":[{"cmd":"whoami"}]}`
污染cmd属性
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240401194743.png)

### Home on the Range
主页只有一个 **Directory listing of www**
文件夹下有一个hello.html,访问只有一个hello
Server:BaseHTTP/0.6 Python/3.12.2

---
没想到真的是../路径穿越,偷懒使用浏览器url编码,还得是postman或者burp
读取服务器源码
`http://guppy.utctf.live:7884/../../server.py`
根据代码猜测会跟http range头有关
设置`bytes=100-500`可以读取指定文件的字节范围
读取当前进程的内存,并使用range获取指定范围
读取进程内存映射
`/proc/self/maps`
选择rw区域并脚本run

### Unsound
一个rust写的web页面,可以加密和解密数据,加密在前端,解密在后端且不返回解密得到的数据


# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2024-04-01   19:42