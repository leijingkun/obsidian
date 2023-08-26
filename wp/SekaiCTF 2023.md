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

其中空格可以用`%09`代替,
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





# pwn

# crypto

# Misc


---
# *相关wp*




2023-08-27   00:13