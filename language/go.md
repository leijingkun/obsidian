### 切片(slice)的数据竞争
```go
package main

import (
    "sync"
    "testing"
)

func TestAppend(t *testing.T) {
    x := []string{"start"}  //无竞争
    x := make([]string, 0, 6) //有竞争

    wg := sync.WaitGroup{}
    wg.Add(2)
    //俩个协程添加数据
    go func() {
        defer wg.Done()
        y := append(x, "hello", "world")
        t.Log(cap(y), len(y))
    }()
    go func() {
        defer wg.Done()
        z := append(x, "goodbye", "bob")
        t.Log(cap(z), len(z))
    }()
    wg.Wait()
}
```

对于无竞争的切片,内存中的结构体为
![image.png|500](https://gitee.com/leiye87/typora_picture/raw/master/20240402232130.png)

原始切片为 x，长度和容量都是 1。
协程1为切片 x，添加元素，并将结果赋值给新的变量 y。相当于直接开辟了内存空间 y，做元素新增的操作。
协程2为切片 x，添加元素，并将结果赋值给新的变量 z。相当于直接开辟了内存空间 z，做元素新增的操作。
当多个线程读取内存 x 时，由于 x 底层一直就没变化，因此，不会发生数据争用。竞争检测是通过的。

存在竞争的切片
![image.png|500](https://gitee.com/leiye87/typora_picture/raw/master/20240402232226.png)

从图中可以看到，切片 x 的内存布局有所变化，长度为 0，但是容量为 6。在代码示例2中，有2个协程，在往 x 中，分别添加2个元素。问题是，在这个切片 x 中，是有足够的空间，可以放下 6个新元素的。因此，协程1和协程2，都会往切片 x 的内存空间中，添加新元素。

而竞争，就是发生是因为两个goroutine都试图写入相同的内存区域。因此，数据竞争产生了。golang test –race 也就失败了。