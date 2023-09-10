
# 安卓系统架构
![image](https://p2.ssl.qhimg.com/t01fc2d94f1f5c3fd24.png)

#安卓逆向
# <<Android应用安全防护和逆向分析 2017>>
## 密码算法分析
安卓5.x锁屏密码算法
### 第一种：输入密码算法
对输入的明文密码+设备的salt值进行MD5和SHA1操作，之后转化成hex值进行拼接即可，最终加密信息保存到本地目录/data/system/password.key。
### 第二种：手势密码算法
将九宫格手势密码中的点数据转化成对应的字节数组，然后直接进行SHA1加密即可。最终加密信息保存到本地目录/data/system/gesture.key。
## NDK开发基础
### JNI(java native interface)
> JNI代表Java Native Interface，是Java平台提供的一种机制，用于在Java代码中调用和与本地代码（如C、C++）进行交互。JNI技术允许Java应用程序与本地代码之间进行双向通信，从而扩展了Java的功能和灵活性。

太难先不看

## Android中开发与逆向常用命令总结
非shell命令
```zsh

# 说明：可以查看当前应用的activity信息。
adb shell dumpsys activity top

#可以查看指定包名应用的详细信息（相当于应用的AndroidManifest.xml中的内容）
adb shell dumpsys package [pkgname]

#可以查看指定进程名或者进程id的内存信息。
adb shell dumpsys meminfo [pname/pid]

#可以查看指定包名应用的数据库存储信息（包括存储的SQL语句
adb shell dumpsys dbinfo [packagename]

#
```

shell命令
```zsh
#清空数据
pm clear [packagename]

#查看apk中的信息以及编辑apk程序包。
aapt dump xmltree[apk包][需要查看的资源文件xml]

#dex文件的详细信息
dexdump [dex文件路径]


```
## so文件格式解析
Android中的so文件就是ELF文件，所以要了解so文件，必须先来了解一下ELF文件的格式

```shell
#查看文件头部信息
readelf -h <xx.so>

#查看文件节(section)头信息
readelf -s <xx.so>

#查看文件段头(program)信息
readelf -l <xx.so>

#查看全部 -a 

```
## AndroidManifest.xml文件格式解析


## resource.arsc文件格式解析


## dex文件格式解析


## Android应用安全防护的基本策略
