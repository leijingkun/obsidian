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


## so文件格式解析
Android中的so文件就是ELF文件，所以要了解so文件，必须先来了解一下ELF文件的格式

## AndroidManifest.xml文件格式解析


## resource.arsc文件格式解析


## dex文件格式解析


## Android应用安全防护的基本策略
