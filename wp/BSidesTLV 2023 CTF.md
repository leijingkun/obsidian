
# web
### My Vouchers Repo
一个优惠券网站,已知前端是angular框架,但是也没有adminbot啊
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230627003809.png)
登录后回显token,应该是flask-session
```shell
> flask-unsign.exe --unsign --cookie eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Int7NTUqNTV9fSIsImV4cCI6MTY4OTA5NTgzNX0.oQ9JTWjesgX7s2_EB66EILlda8RNG_u_3bOWIwtpZpM
```
没有爆破出来

### Back To The Future
*想回到过去...*

# reverse
### Breaking The Vault: Uncover the Secrets
#apk
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230626211013.png)
输入pin值和salt
jadx打开
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230626211046.png)
`checkSalt`和`getFlag`都有native关键字,也就是来自外部引用
解压后找到一个.so文件,ida打开
*checkSalt*
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230626212025.png)
有个compare操作,猜测是Salt值`l33t`
*getFlag*
代码有点难了,看不懂捏
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230627130334.png)

大概猜到是与`-rr5urtw`这个字符异或0x41
```python
string="-rr5urtw"
for i in range(len(string)):
    print(chr(ord(string[i])^0x41),end='')
#l33t4356  也就是salt+pin
```
![Screenshot_2023-06-27-13-02-28-629_com.example.my.jpg|200](https://gitee.com/leiye87/typora_picture/raw/master/20230627130513.jpg)

---
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230627131313.png)
双击跟进`byte_14310`,导出数据异或也可获得flag
```python
string=[  0x03, 0x12, 0x28, 0x25, 0x24, 0x32, 0x15, 0x0D, 0x17, 0x73, 
  0x71, 0x73, 0x72, 0x3A, 0x13, 0x04, 0x1E, 0x00, 0x11, 0x0A, 
  0x1E, 0x08, 0x12, 0x1E, 0x07, 0x14, 0x0F, 0x3C, 0x00]
for i in string:
    print(chr(i^0x41),end='')
```

### GemHunter
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230627162211.png)
是一个unity写的游戏
得收集12颗宝石
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230627162440.png)

用ce修改,但是好像没什么用
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230627165817.png)
看来必须学习一波ce修改unity了
...还是等wp吧

---
修改后flag会出现但是由于窗口大小的问题我们看不到,需要修改窗口大小
![image](https://i.imgur.com/Rj6eMVa.png)

### Tsebrakhn
一个64位elf文件
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230627225025.png)
ida打开会出现`sp analysis failed`错误
> IDA有栈跟踪的功能，它在函数内部遇到ret(retn)指令时会做判断：栈指针的值在函数的开头/结尾是否一致，如果不一致就会在函数的结尾标注"sp-analysis failed"

唉等wp了

---


# pwn

# crypto

# Misc
### CD-KEY
算是web题
给了源码和网页
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230627003325.png)
用来判断CDK正确性,dinner goto是这样的


---
## *相关wp*
https://github.com/rwandi-ctf/ctf-writeups/tree/main/BSidesTLV2023



2023-06-26   20:45