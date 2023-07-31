https://overthewire.org/
# Bandit
### level0
ssh登录
### level1
cat命令
### level2
[dash文件处理](https://www.google.com/search?q=dashed+filename&oq=dashed+filename&aqs=chrome..69i57j0i512j0i30l2j0i5i30l2.5691j0j7&sourceid=chrome&ie=UTF-8)
### level3
文件名里有空格处理![image](https://i.imgur.com/5kTormS.png)

### level4
隐藏文件`.filename`
### level5
多试几个,文件名为`file07`
### level6
> The password for the next level is stored in a file somewhere under the inhere directory and has all of the following properties:
> 
> human-readable
> 1033 bytes in size
> not executable

`find -size 1033c`
### level7
> The password for the next level is stored somewhere on the server and has all of the following properties:
> 
> owned by user bandit7
> owned by group bandit6
> 33 bytes in size

`find / -user bandit7 -group bandit6 -size 33c 2>/dev/null`
### level8
> The password for the next level is stored in the file data.txt next to the word millionth

使用grep筛选
`cat data.txt |grep "millionth"`
### level9
> The password for the next level is stored in the file data.txt and is the only line of text that occurs only once

` sort data.txt |uniq -u`
### level10
> The password for the next level is stored in the file data.txt in one of the few human-readable strings, preceded by several ‘=’ characters.

`cat data.txt |strings |grep "="`
### level11
base64解码
### level12
rot13解码
### level13
