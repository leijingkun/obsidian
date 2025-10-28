### 参考文献
https://d.wanfangdata.com.cn/thesis/D02183055
基于类型推断的js引擎测试

https://mp.weixin.qq.com/s/AA6Kb46LgA4NfSkPQEAM-Q




> [!NOTE] https://www.freebuf.com/vuls/250723.html
> 使用fuzzilli对Javascript引擎QuickJS进行Fuzzing和漏洞分析


### 基础知识

1. 单元测试
目的: 验证引擎中各个组件的功能是否正常。
工具: 使用框架如 Google Test、Catch2（C++），或 Jest、Mocha（JavaScript）进行单元测试。
示例: 测试基本语法解析、表达式求值、内置对象的行为等。
2. 集成测试
目的: 确保不同模块之间的交互正常。
内容: 测试多个组件或模块的协作，例如，脚本加载、执行上下文管理等。
3. 性能测试
目的: 测量引擎的执行速度和内存占用。
工具: 使用性能测试框架（如 Benchmark.js）来评估特定代码片段的执行时间。
示例: 测试不同类型的算法（排序、递归）的性能表现。
4. 规范测试
目的: 验证引擎是否符合语言规范（如 ECMA-262）。
工具: 使用规范测试套件，如 Test262（JavaScript）来验证引擎的兼容性。
示例: 检查引擎对 ECMAScript 特性的实现是否正确。
5. 回归测试
目的: 确保新代码的加入没有破坏现有功能。
内容: 每次代码更改后，运行一系列测试用例以验证之前通过的测试依然通过。
6. 兼容性测试
目的: 确保引擎在不同平台和环境中的一致性表现。
内容: 测试在不同操作系统、浏览器或运行时环境下的行为。
7. 安全性测试
目的: 检查引擎中的安全漏洞。
工具: 使用静态分析工具（如 ESLint）和动态分析工具来识别潜在的安全问题。
示例: 测试代码注入、内存泄漏等安全问题。
8. 交互式测试
目的: 测试引擎的交互功能，如 REPL（Read-Eval-Print Loop）。
内容: 验证用户输入的代码是否能被正确解析和执行。
9. 边界条件测试
目的: 验证引擎在处理极端输入时的稳定性。
内容: 测试大数组、深递归等边界情况。


- 对JS语言的引擎(quickjs,xs,JerryScript,Mujs,Duktape,Hermes)等fuzz方法研究


https://zhuanlan.zhihu.com/p/471343703


![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20241223162359.png)

输入构造:JS代码
- 基于历史数据
- 基于工具生成 csmith


> [!NOTE] 开源工具
> https://github.com/andreafioraldi/libafl_quickjs_fuzzing
> https://github.com/googleprojectzero/fuzzilli/



![6799a792b09319d762d7f182f35b16d.png](https://gitee.com/leiye87/typora_picture/raw/master/20241227132501.png)

| Compiler    | status |
| ----------- | ------ |
| Mujs        | yes    |
| XS          | no     |
| Duktape     | no     |
| JerryScript | yes    |
| Hermes      | yes    |
| quickJs     | yes    |


1、基本概念：模糊测试、差分测试、测试用例、变异
fuzz(随机数据)\不同版本,不同参数\测试的输入\修改测试用例
2、嵌入式JS引擎的基本架构？

3、嵌入式JS引擎与普通JS引擎使用的优化方法有哪些不同？

4、查看一些嵌入式JS引擎的缺陷报告。


### EmbeddedFuzz

语料库文件`top2000corpus-20230106-FX-SF.db`缺失

```
主要是（1）清理一下冗余代码，（2）删除中文注释，（3）更改绝对路径。
```


```
初始化:
读取配置文件,加载所有simples到CallableProcessor
循环:
遍历simples,添加自调用后,插入OriginalTestcases(唯一),变异前差分run一次,若报错信息一致则忽略并更新used=1
变异:
根据flag执行不同的变异,遍历变异列表
```


https://test262.fyi/
https://ming1016.github.io/2021/02/21/deeply-analyse-quickjs/#QuickJS

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20250312053415.png)
https://zhuanlan.zhihu.com/p/377880724

