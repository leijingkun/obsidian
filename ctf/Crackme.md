# Android

### 自毁程序密码_1.0原版.apk
[wp](https://www.52pojie.cn/thread-1315444-1-7.html)

- 还原JNI函数名
> 一般JNI函数方法名首先是一个指针加上一个数字，比如v4+676。然后将这个地址作为一个方法指针进行方法调用，并且第一个参数就是指针自己，比如(v4+676)(v4…)。这实际上就是我们在JNI里经常用到的JNIEnv方法。因为Ida并不会自动的对这些方法进行识别，所以当我们对so文件进行调试的时候经常会见到却搞不清楚这个函数究竟在干什么，因为这个函数实在是太抽象了。解决方法非常简单，只需要对JNIEnv指针做一个类型转换即可。

我们可以选中v4变量，然后按一下y键，然后输入： `JNIEnv*`

IDA安卓调试.so文件
`C:\Program Files\IDA_Pro_7.7\dbgsrv\`


### app-debug
#frida
- app为测试版本,使用adb安装时,要加点参数
```bash
adb install -g -t -r -d app-debug.apk
```

jadx->发现静态注册的native函数,ida打开

frida hook函数hook java层函数参数和返回值
```js
Java.perform(() => {
    let MainActivity = Java.use("com.roysue.easyso1.MainActivity");
    MainActivity["method01"].implementation = function (str) {
        console.log('method01 is called' + ', ' + 'str: ' + str);
        let ret = this.method01(str);
        console.log('method01 ret value is ' + ret);
        return ret;
    };
})
```

`Frida -U -l .\hook.js esayso1`


# Crackme160
### 1 Acid burn
打开是一个gui



# crackme.one
