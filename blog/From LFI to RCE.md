### 从LFI到RCE

```php
<?php
include($_GET['file']);
```

这是一行简单的文件包含代码,最常见的就是php伪协议读取文件
