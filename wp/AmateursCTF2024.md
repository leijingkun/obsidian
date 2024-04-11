# Jail
### sansomega
```python
#!/usr/local/bin/python3
import subprocess

BANNED = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz\\"\'`:{}[]'


def shell():
    while True:
        cmd = input('$ ')
        if any(c in BANNED for c in cmd):
            print('Banned characters detected')
            exit(1)

        if len(cmd) >= 20:
            print('Command too long')
            exit(1)

        proc = subprocess.Popen(
            ["/bin/sh", "-c", cmd], stdout=subprocess.PIPE, stderr=subprocess.STDOUT)

        print(proc.stdout.read().decode('utf-8'), end='')

if __name__ == '__main__':
    shell()

```

没有过滤$(),数字,但是过滤了\\没法8进制执行
\* 可以构造出来flag.txt

`/*/*/*64 *` 会解析为/bin/base64 /bin/x86_64  flag.txt

---
base32!!!竟然有这个命令

`/*/*/????32 *.*`

另一个解法,使用diff3

`/*/????3 ./* ./???`

another
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240411222144.png)

### javajail1
```python
BANNED = ['import', 'class', 'Main', '{', '}']
```




# web
### 
# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2024-04-11   21:16