# 52pojie吾爱安卓逆向入门
## 第二节.初识APK文件结构、双开、汉化、基础修改
### 双开
np|mt管理器,单击->功能->apk共存(修改了app的包名)  仅当没有做签名校验生效

### 汉化
可以使用开发者工具复制控件文字

搜索&修改
### 修改图标与应用名称
np管理器->单击->功能->通用编辑

## 



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
## APK文件格式
```js
assets//资源文件
lib//.so文件
META-INF//存放apk签名信息，用来保证apk包的完整性和系统的安全
res//存放资源文件，包括icon，xml文件
	res/layout/: //存放被编译为屏幕布局（或屏幕的一部分）的XML文件
	res/values/: //存放可以被编译成很多类型的资源文件
	array.xml: //定义数组
	string.xml: //定义字符串（string）值

AndroidMainifest.xml//应用程序配置文件，每个应用都必须定义和包含的，它描述了应用的名字、版本、权限、引用的库文件等信息
classes.dex//传统 Class 文件是由一个 Java 源码文件生成的 .Class 文件，而 Android 是把所有 Class 文件进行合并优化，然后生成一个最终的 class.dex 文件。它包含 APK 的可执行代码，是分析 Android 软件时最常见的目标。由于dex文件很难看懂，可通过apktool反编译得到.smali文件，smali文件是对Dalvik虚拟机字节码的一种解释（也可以说是翻译），并非一种官方标准语言。通过对smali文件的解读可以获取源码的信息
resources.arsc//二进制资源文件，它是一个映射表
```



## AndroidManifest.xml文件格式解析


## resource.arsc文件格式解析


## dex文件格式解析


## Android应用安全防护的基本策略
