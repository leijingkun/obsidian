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

