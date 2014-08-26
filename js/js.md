##script 的6个属性
async 可选 表示应该立即下载脚本，但不应该妨碍页面中的其他操作，比如下载其他资源或等待加载其他脚本。只对外部脚本文件有效。
charset 可选。
表示src 属性指定的代码的字符集。由于大多数浏览器会忽略它的值，一次这个属性很少有人用。
defer:可选。
#在xhtml 中的用法
//<![CDATA[

//]]>
# 语句 
分号结尾如果省略分号，则由解析器确定语句的结尾。不要省略分号的原因 输入不完整 删除多余空格压缩js可能会导致错误。某些情况下增加性能，因为这样不必再花时间推测应该在哪里加分号。

# 变量 ECMAscript 变量是松散类型 所谓松散类型就是可以用来保存任何类型的数据。换句话说，每个变量仅仅是一个用于保存值得占位符而已。
函数中的变量在函数被调用时赋值，在函数退出时销毁。

# 数据类型
ECMAScript 有五种简单数据类型（也称为基本数据类型）：Undefined、Null、Boolean、Number、String
还有一种复杂数据类型Object
typeof 检测给定变量的数据类型。typeof null 会返回 object ,因为特殊值null被认为是一个空的对象引用。Safari 5及以前版本、chrome 7及之前的版本在对正则表达式调用typeof 操作符时会返回 “function" 而其他浏览器在这种情况下会返回”Object"
Undefined 类型只有一个值，即特殊的undefined 在var声明变量但未对其加以初始值的这个变量的值就是undefined。
Null 类型
null类型是第二个只有一个值的数据类型，这个特殊的值是null.从逻辑角度来看，null值表示一个空对象指针，而这也正是使用typeof操作符检测null值时候会返回object.
实际上undefined 的值是派生自null值的。 null==undefined true;
Number NaN （not a number）是一个特殊数值。 isNaN()函数接受一个参数。
Number() parseInt() parseFloat()
Number()函数转换规则如下。
如果是boolean值，true和false将分别被转换为1和0.
如果是数字值，只有简单的传入和返回。
如果是null值返回0
如果是undefined,返回NaN
如果是字符串，遵循下列规则：
String  