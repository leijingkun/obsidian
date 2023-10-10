1. 知识储备
常见的取证文件后缀：.raw/.vmem/.img
	  `raw`指原始图像文件，指尚未被处理，未被打印或用于编译
    `vmem`指虚拟内存文件，是由虚拟机创建的
    `img`是一种文件压缩格式，主要是为了创建软盘的镜像文件，可以用来压缩整个软盘或整片光盘的内容


## NSSCTF
### [NSSRound#1 Basic]cut_into_thirds
*使用`vol3`查看信息*
`python .\vol.py -f D:\CTF\attachment\cut_into_thirds.raw windows.info`
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230827212917.png)
*win7*
*提取用户密码哈希*

## MoeCTF
### 坚持访问的浏览器
工具
`D:\CTF\Forensics\Broswer\Infornito\`

跟进源码里的浏览器函数即可自定义取证的文件路径
```python
browser_modules = {
    'firefox': firefox(), 
    'chrome': chrome(), 
    'safari': safari()
}
```

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20231010230242.png)

浏览记录,访问最后一个url
