## powershell

 `Cmdlet`格式  （动词-名称）

Common verbs to use include:

-   Get
-   Start
-   Stop 
-   Read
-   Write
-   New
-   Out

**举例**

列出命令列表 `Get-Command`

支持模式匹配 `Get-Command Verb*`

*    递归查找 "interesting-file.txt"

    ```powershell
    Get-ChildItem -Path "文件夹路径" -Filter "b64.txt" -Recurse
    ```

感觉没必要做笔记了，chatGBT完全可以拿下了



