# web
### Secrets
> My notes and secrets are stored in this secret vault. I'm sure no one can get them.


![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240410224006.png)
一串可疑字符串,搜了下sdoc文件是三星笔记,但是这文件格式也不对啊
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240410224047.png)

cookie可能存在目录穿越?实测../可以往上,但是读不到根目录,wapp说是nextjs 13.4.9版本,穿了几个创建的main.js/ts都没有,放弃...

### YAJF
基于jq命令的注入

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240410232131.png)

会将命令注入到jq的后面,且args长度<=5

---
迷迷糊糊的出了???
```bash
json={"env":""}
&args=|jq&args='env'
```

# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2024-04-10   22:39