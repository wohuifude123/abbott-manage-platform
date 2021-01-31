# 前端代码规范
> AUTHOR: Abbott.liu

> create: 2020/01/10

> update: 2021/01/27

## 结构、样式、行为分离

尽量确保文档和模板只包含 HTML 结构，样式都放到样式表里，行为都放到脚本里。

## 缩进

统一四个空格缩进（总之缩进统一即可），不要使用 Tab 或者 Tab、空格混搭。

## 文件编码

使用不带 BOM 的UTF-8编码。

在 HTML中指定编码<meta charset="UTF-8"> ；

## type属性

在样式表和脚本的标签中忽略type属性

在样式表（除非不用 CSS）和脚本（除非不用 JavaScript）的标签中 不写 type 属性。

HTML5默认 type 为 text/css 和 text/javascript 类型，所以没必要指定。即便是老浏览器也是支持的。

## 目录结构

```
├── build 构建脚本目录
│ ├── build.js 生产环境构建脚本
│ ├── check-versions.js
│ ├── utils.js 构建相关工具方法
│ ├── vue-loader.conf.js
│ ├── webpack.base.conf.js webpack基础配置
│ ├── webpack.dev.conf.js webpack开发环境配置
│ └── webpack.prod.conf.js webpack生产环境配置
├── config 配置相关
│ ├── index.js
│ ├── dev.env.js 开发环境变量
│ ├── prod.env.js 生产环境变量
│ └── test.env.js
├── src
│ ├── components // 全局UI组件
│ ├── pages // 入口 加载组件 初始化等
│ │ └── home //图表组件
│ │ ├── assets 资源文件
│ │ ├── modules 存放不同页面
│ │ ├── router // 路由
│ │ ├── main.js // 入口 加载组件 初始化等
│ │ ├── App.vue // 入口页面
│ │ ├── index.html // html打包所用模板
│ ├── store // 全局store管理
│ ├── utils // 全局公用方法
├── lib // 第三方资源
├── .babelrc // babel-loader 配置
├── eslintrc.js // eslint 配置项
├── .gitignore // git 忽略项
└── package.json // package.json

```

## 项目命名

全部采用小写方式， 以下划线分隔。

示例：my_project_name

## 目录命名

参照项目命名规则；有复数结构时，要采用复数命名法。

示例：scripts, styles, images, data_models

| 命名 | 备注 | 
| --- | ---- |
| scripts | js文件目录 |
| styles | 样式文件目录 | 
| images | 图片文件目录 | 
| data_models | 数据文件目录 | 

## 文件夹命名
	
| 英文 | 中文 | 
| --- | ---- |
| admin | 后台管理 |
| app	| 应用 | 
| article | 资讯 | 
| aboutus | 关于我们 | 
| common  | 公共  | 
| config  | 配置  | 
| contactus	 | 联系我们  | 
| data |  数据 | 
| en-us  |  英文 | 
| extend	 |  延伸 | 
| feedback |  信息反馈 | 
| history | 发展历史  | 
| leavewords | 留言 | 
| install |  安装 | 
| lang | 语言包 | 
| lib | 库 | 
| mall | 商城 | 
| newslist | 新闻列表 | 
| newsdetail | 新闻详细页面 | 
| picture | 组图 | 
| product | 商品 | 
| prolist | 产品列表 | 
| prodetail | 产品详细页面 | 
| search | 搜索 | 
| section | 区块 | 
| shop | 商店 | 
| static | 静态 | 
| system | 系统 | 
| templates | 模版 | 
| ucenter | 用户中心 |
| upload | 上传 |
| video | 视频 |
| vote | 投票 |
| zh-tw | 繁体中文 | 
| zh-cn | 简体中文 | 

## CSS样式文件命名

| 英文 | 中文 | 
| --- | ---- |
| global.css | 全局样式 | 
| layout.css | 布局结构 | 
| base.css | 基本共用 | 
| style.css | 综合样式 | 
| master.css | 主要的 | 
| module.css | 模块 | 
| forms.css | 表单 | 
| themes.css | 主题/网页换肤 | 
| font.css | 字体 | 
| print.css | 打印 | 
| font.css | 字体 | 
| mend.css | 补丁 | 

私有样式/独立页面，根据实际情况，可以自定义命名 CSS 文件。

以上这些常用的文件命名，无需全部使用，根据实际情况，每个页面引用不超过 3 个 CSS 文件。

## CSS命名

### 命名规则

* class 必须单词全字母小写，每个单词间以 - 分隔，分隔符之间有且仅有一个单词。
* class 必须代表相应模块或部件的内容或功能，不得以样式信息进行命名。
* 颜色：使用颜色的名称或者16进制代码，如：

```
.red { color: red; } 
.f60 { color: #f60; } 
.ff8600 { color: #ff8600; }
```

* 字体大小，直接使用“font+字体大小”作为名称，如：

```
.font12px { font-size: 12px; }
.font9pt {font-size: 9pt; }
```

* 对齐样式，使用对齐目标的英文名称，如：

```
.left { float:left; }
.bottom { float:bottom; }
```

* 标题栏样式，使用“类别+功能”的方式命名，如：

```
.bar-news { }
.bar-product { }
```

### 命名示例

* .div1{} /* 不推荐；无意义 */
* .a_green{} /* 不推荐；无意义 */
* .menu{} /* 推荐；特殊性*/
* .header{} /* 推荐；通用性*/

### 公共命名

* .wrapper 页面外围控制整体布局宽度
* .container 容器，用于最外层
* .layout 布局

### 命名精简

id和class命名越精简越好，只要足够表达意思，这样有助于理解，同时也能提高代码效率

* .navigation{} /* 不推荐 */
* .login_box_inside_con{} /* 不推荐 */
* .nav{} /* 推荐 */

命名嵌套问题，书写css要注意先后顺序和嵌套问题，从性能上考虑尽量减少选择器的层级

* .nav ul.list{} /* 不推荐 */
* .nav .list{} /* 推荐 */

注意事项

* 命名中尽量避免使用中文拼音，应该采用更简明有语义的英文单词进行组合
* 命名注意缩写，但是不能盲目缩写
* 不允许通过1、2、3等序号进行命名
* 避免class与id重名
* id注意用于标识模块或页面的某一个父容器区域，名称必须唯一，不要随意新建id
* class用于标识某一个类型的对象，命名必须言简意赅
* 尽可能提高代码模块的复用，样式尽量用组合的方式
* 规则名称中不应该包含颜色、定位等与具体显示效果相关的信息，应该用意义命名，而不是结果名称

### 其他规范

* 不要轻易改动全站级CSS和通用CSS库，改动后，要经过全面测试
* 避免使用filter
* 避免在CSS中使用expression
* 避免过小的背景图片平铺
* 尽量不要在CSS中使用!important
* 绝对不要在CSS中使用"*"选择符
* 层级(z-index)必须清晰明确，页面弹窗、气泡为最高级(最高级为999)，不同弹窗气泡之间可在三位数之间调整，普通区块为10-90内10的倍数；区块展开、弹出为当前父层级上个位增加，禁止层级间盲目攀比
* 背景图片在情况允许，尽可能使用sprite技术，减小http请求，考虑到多人协作开发，sprite按照模块、业务、页面来划分
* 页面内部尽量避免使用style属性，CSS放在head标签中，由link标签引入，使页面的结构与表现分离
* 尽量减少使用float、position等影响性能的属性，这样可以避免新手在布局时出现的混乱
* 尽量少使用<br />来断行
* 不要连续出现多个 (空格)，也尽量少使用全角空格（英文字符集下，全角空格会变成乱码），空白应该尽量使用text-indent、maring/padding等方法来实现
* 排版如果遇到需要首行缩进的处理，可以使用text-indent:2em;
* 图片如果需要加载就在页面上用img标签写出，并指明宽高，重要的图片必须加上alt属性，给重要的元素和截断的元素上加上title
* 如果有跳转的地方，统一使用a标签，<a href="#"></a>，需要跳转到新页面，则还需要加上targent="_blank"属性，如果点击的是空链接(#)，则会自动将当前页面重置到首端，可以使用"javascript:void()"来替代原来的"#"
* 分清楚什么情况下jpg/gif/png图片

## JavaScript命名

### 变量

命名方式：小驼峰（除了对象的属性外，主要是考虑到cgi返回的数据）`eg: var myFirstName`

命名规范： 类型+对象描述的方式，如果没有明确的类型，就可以使前缀为名词。前缀应当是名词，找不到合适的名词可以根据情况使用形容词（函数的名字前缀为动词，以此区分变量和函数）

```
类型 小写字母 
array arr
boolean b 
function fn 
int int
object obj
regular reg
string str
```

命名建议：语义化，尽量在变量名字中体现所属类型，如:length、count等表示数字类型；而包含name、title表示为字符串类型。

ID在变量名中全大写`eg: var goodID;`

URL在变量名中全大写`eg: var reportURL;`

Android在变量名中大写第一个字母`eg:var AndroidVersion;`

iOS在变量名中小写第一个，大写后两个字母
`eg:  var iOSVersion;`

常量全大写，用下划线连接
`eg: var MAX_INDEX = 1;`

构造函数，大写第一个字母
```
function Person(name) {
    this.name = name;
}
```

类的名字用大写开头： 如：`public class Person{}`

属性名用小写：如`String personName="哈哈";`

方法名用小写：如

```
public String getPersonName(){
	return this.personName
}
```

构造函数的名字要与类名称一样，所以也是大写开头。

### 函数

命名方法：小驼峰式命名法。

命名规范：前缀应当为动词。

动词 含义 返回值 

```
// 是否可阅读
can 判断是否可执行某个动作 ( 权限 ) 函数返回一个布尔值。true：可执行；false：不可执行 
has 判断是否含有某个值 函数返回一个布尔值。true：含有此值；false：不含有此值 
is 判断是否为某个值 函数返回一个布尔值。true：为某个值；false：不为某个值 
get 获取某个值 函数返回一个非布尔值 
set 设置某个值 无返回值、返回是否设置成功或者返回链式对象
```

命名建议：使用常见动词约定。

```
// 是否可阅读
function canRead() {
	return true;
}
```

```
// 获取名称
function getName() {
	return this.name;
}
```

## 注释规范

1. html注释: 注释格式 <!–这儿是注释–>, ’–’只能在注释的始末位置,不可置入注释文字区域;
2. css注释: 注释格式 /*这儿是注释*/;
3. JavaScript注释, 单行注释使用’//这儿是单行注释’ ,多行注释使用 /* 这儿有多行注释 */;

## 其他规范
1. 开发过程中严格按分工完成页面, 以提高css复用率, 避免重复开发;
2. 减小沉冗代码, 书写所有人都可以看的懂的代码. 简洁易懂是一种美德. 为用户着想, 为服务器着想.       
