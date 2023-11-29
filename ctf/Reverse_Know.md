[[ctf/Reverse|ctf刷题]]


## pyc
`python -m py_compile your_script.py`编译py->pyc

### uncompyle6
支持 Python 1.0-3.8 版本


### pycdc
python3.9+
存在`D:\reverse\pycdc.exe`

`pycdc <filename>`  pyc->py

`pycdas <filename>`
## jeb安装
https://www.52pojie.cn/forum.php?mod=viewthread&tid=1598242&highlight=jeb



## angr符号执行框架
### angr_find

```python
import angr
#加载二进制文件
project=angr.Project("./angr_ctf/dist/00_angr_find",auto_load_libs=False)
#表示程序入口点为main
init=project.factory.entry_state()

simulation=project.factory.simgr(init)
#期待执行的函数地址
print_good=0x0804867D
simulation.explore(find=print_good)

if simulation.found:
    for i in simulation.found:
        solution_state=i
        print(solution_state.posix.dumps(0))
else:
    print("no")
```


### angr_avoid

代码中会有avoid函数,修改
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20231127145948.png)

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20231127145906.png)


需要阻止这个函数,只需添加一个参数avoid
```python
import angr
proj=angr.Project("./angr_ctf/dist/01_angr_avoid")

init=proj.factory.entry_state()

sim=proj.factory.simgr(init)

print_good=0x080485E0
avoid=0x080485A8
sim.explore(find=print_good,avoid=avoid)

if sim.found:
    for i in sim.found:
        solution_state=i
        print(solution_state.posix.dumps(0))
else:
    print("no")


```

## 汇编
Intel格式:<指令>,<目标>,<源>

AT&T 格式:<指令>,<源>,<目标>
寄存器前有%,立即数前有$
[寄存器介绍](https://www.cnblogs.com/nicere/p/17030075.html)


## 脱壳

> ==OEP==
> OEP：(Original Entry Point)，程序的入口点。软件加壳一般隐藏了程序真实的OEP（或者用了假的OEP）， 我们需要寻找程序真正的OEP，才可以完成脱壳。
> 
> 一般加壳程序在使用Ollydbg等动态调试工具时，会停在壳的预处理块。即处在对于程序原始代码块的解压或解密操作之前，在运行完程序自脱壳模块后，会停留在程序加壳之前的OEP位置，此时是dump程序的最佳时期。脱壳时在真实OEP处下int3断点，就可以捕捉到程序代码段完全恢复的状态。因此，寻找加壳程序的正确OEP，也成了手动脱壳时的第一要务

> ==IAT==
> IAT：(Import Address Table)，导入地址表。由于导入函数就是被程序调用但其执行代码又不在程序中的函数，这些函数的代码位于一个或者多个DLL中。当PE文件被装入内存的时候，Windows装载器才将DLL 装入，并将调用导入函数的指令和函数实际所处的地址联系起来（动态连接），这操作就需要导入表完成。其中导入地址表就指示函数实际地址。 多数加壳软件在运行时会重建导入地址表，因此获取加壳程序正确的导入地址表也是手动脱壳操作中的一个关键问题

所以怎么找OEP呢

