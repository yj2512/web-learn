1、手写promise
	#Promise的三种状态
		pending - 进行中
		fulfilled - 成功
		rejected - 失败

		class MyPromise {
			constructor(fn) {
				this.resolvedCallbacks = [];
				this.rejectedCallbacks = [];
				
				this.state = 'PENDING';
				this.value = '';
				
				fn(this.resolve.bind(this), this.reject.bind(this));
				
			}
			
			resolve(value) {
				if (this.state === 'PENDING') {
					this.state = 'RESOLVED';
					this.value = value;
					
					this.resolvedCallbacks.map(cb => cb(value));   
				}
			}
			
			reject(value) {
				if (this.state === 'PENDING') {
					this.state = 'REJECTED';
					this.value = value;
					
					this.rejectedCallbacks.map(cb => cb(value));
				}
			}
			
			then(onFulfilled, onRejected) {
				if (this.state === 'PENDING') {
					this.resolvedCallbacks.push(onFulfilled);
					this.rejectedCallbacks.push(onRejected);
					
				}
				
				if (this.state === 'RESOLVED') {
					onFulfilled(this.value);
				}
				
				if (this.state === 'REJECTED') {
					onRejected(this.value);
				}
			}
		}

		// new MyPromise((resolve, reject)=> {resolve(1)}).then((res)=>{console.log(res)})

		// Promise.all
		Promise.myAll = function(promiseArr) {
			return new Promise((resolve, reject) => {
				const ans = [];
				let index = 0;
				for (let i = 0; i < promiseArr.length; i++) {
					promiseArr[i]
					.then(res => {
						ans[i] = res;
						index++;
						if (index === promiseArr.length) {
							resolve(ans);
						}
					})
					.catch(err => reject(err));
				}
			})
		}

		// Promise.race
		Promise.race = function(promiseArr) {
			return new Promise((resolve, reject) => {
				promiseArr.forEach(p => {
					// 如果不是Promise实例需要转化为Promise实例
					Promise.resolve(p).then(
						val => resolve(val),
						err => reject(err),
					)
				})
			})
		}




2、DOM操作——怎样添加、移除、移动、复制、创建和查找节点
	（1）创建新节点
		createDocumentFragment()    //创建一个DOM片段
		createElement()   //创建一个具体的元素
		createTextNode()   //创建一个文本节点

	（2）添加、移除、替换、插入
		appendChild()
		removeChild()
		replaceChild()
		insertBefore() //在已有的子节点前插入一个新的子节点

	（3）查找
		getElementsByTagName()    //通过标签名称
		getElementsByName()    //通过元素的Name属性的值(IE容错能力较强，会得到一个数组，其中包括id等于name值的)
		getElementById()    //通过元素Id，唯一性
		querySelector
		querySelectorAll

3、null是一个表示”无”的对象，转为数值时为0；undefined是一个表示”无”的原始值，转为数值时为NaN。

	当声明的变量还未被初始化时，变量的默认值为undefined。
	null用来表示尚未存在的对象，常用来表示函数企图返回一个不存在的对象。

4、js延迟加载的方式有哪些？

	defer和async、动态创建DOM方式（创建script，插入到DOM中，加载完毕后callBack）、按需异步载入js

	async:开启另外一个线程下载js文件(并行进行下载)，下载完成，立马执行。（此时才发生阻塞）

	defer:开启另一个线程下载js文件,直到页面加载完成时才执行。（根本不阻塞）

5、数组去重
	Array.from(new Set(array)); 

6、0.1 + 0.2 === 0.3 嘛？为什么？

		JavaScirpt 使用 Number 类型来表示数字（整数或浮点数），遵循 IEEE 754 标准，通过 64 位来表示一个数字（1 + 11 + 52）

		1 符号位，0 表示正数，1 表示负数 s
		11 指数位（e）
		52 尾数，小数部分（即有效数字）
		最大安全数字：Number.MAX_SAFE_INTEGER = Math.pow(2, 53) - 1，转换成整数就是 16 位，所以 0.1 === 0.1，是因为通过 toPrecision(16) 去有效位之后，两者是相等的。

		在两数相加时，会先转换成二进制，0.1 和 0.2 转换成二进制的时候尾数会发生无限循环，然后进行对阶运算，JS 引擎对二进制进行截断，所以造成精度丢失。

		所以总结：精度丢失可能出现在进制转换和对阶运算中

7、JS 数据类型

	基本类型：Number、Boolean、String、null、undefined、symbol（ES6 新增的），
	BigInt（ES2020） 引用类型：Object，对象子类型（Array，Function）
	
	JS中类型转换分为 强制类型转换 和 隐式类型转换 。
		通过 Number()、parseInt()、parseFloat()、toString()、String()、Boolean(),进行强制类型转换。

		逻辑运算符(&&、 ||、 !)、运算符(+、-、*、/)、关系操作符(>、 <、 <= 、>=)、相等运算符(==)或者 if/while 的条件，可能会进行隐式类型转换。
		
		String() 的转换规则与 toString() 基本一致，最大的一点不同在于 null 和 undefined，使用 String 进行转换，null 和 undefined对应的是字符串 'null' 和 'undefined'


8、事件流

	事件流是网页元素接收事件的顺序，"DOM2级事件"规定的事件流包括三个阶段：事件捕获阶段、处于目标阶段、事件冒泡阶段。

	阻止冒泡： event.stopPropagation()  event.cancelBubble

	事件委托 事件委托是指将事件绑定目标元素的到父元素上，利用冒泡机制触发该事件
	event.target返回触发事件的元素
	event.currentTarget返回绑定事件的元素

9、事件是如何实现的？

	基于发布订阅模式，就是在浏览器加载的时候会读取事件相关的代码，但是只有实际等到具体的事件触发的时候才会执行。

	比如点击按钮，这是个事件（Event），而负责处理事件的代码段通常被称为事件处理程序（Event Handler），也就是「启动对话框的显示」这个动作。

	在 Web 端，我们常见的就是 DOM 事件：

	DOM0 级事件，直接在 html 元素上绑定 on-event，比如 onclick，取消的话，dom.onclick = null，同一个事件只能有一个处理程序，后面的会覆盖前面的。
	DOM2 级事件，通过 addEventListener 注册事件，通过 removeEventListener 来删除事件，一个事件可以有多个事件处理程序，按顺序执行，捕获事件和冒泡事件
	DOM3级事件，增加了事件类型，比如 UI 事件，焦点事件，鼠标事件

10、JS 隐式转换，显示转换
	（1）	"+" 操作符，如果有一个为字符串，那么都转化到字符串然后执行字符串拼接
	（2）"-" 操作符，转换为数字，相减 (-a, a * 1 a/1) 都能进行隐式强制类型转换
	（3）布尔值到数字
			1 + true = 2       
			1 + false = 1
	（4）转换为布尔值
			for 中第二个(< ,> ,=>)
			while
			if
			三元表达式
			|| （逻辑或） && （逻辑与）左边的操作数 !(逻辑非)
			
	
	== 和 === 有什么区别？
	=== 不需要进行类型转换，只有类型相同并且值相等时，才返回 true.
	== 如果两者类型不同，首先需要进行类型转换。具体流程如下:
		1. 首先判断两者类型是否相同，如果相等，判断值是否相等.
		2. 如果类型不同，进行类型转换
		3. 判断比较的是否是 null 或者是 undefined, 如果是, 返回 true .
		4. 判断两者类型是否为 string 和 number, 如果是, 将字符串转换成 number
		5. 判断其中一方是否为 boolean, 如果是, 将 boolean 转为 number 再进行判断
		6. 判断其中一方是否为 object 且另一方为 string、number 或者 symbol , 如果是, 将 object 转为原始类型再进行判断
		let person1 = {
		    age: 25
		}
		let person2 = person1;
		person2.gae = 20;
		console.log(person1 === person2); //true,注意复杂数据类型，比较的是引用地址


11、['1', '2', '3'].map(parseInt)   输出

12、什么是防抖和节流
	防抖(debounce)——触发高频事件后 n 秒后函数只会执行一次，如果 n 秒内高频事件再 次被触发，则重新计算时间;
	节流(throttle)——高频事件触发，但在 n 秒内只会执行一次，所以节流会稀释函数的执 行频率。

	function debounce(fn,wait=300){
    let timer
    return function(){
      if(timer){
          clearTimeOut(timer)
      }
      timer=setTimeOut(()=>{
          fn.apply(this,arguments)
      },wait)
    } 
	}

	function throttle(fn, wait = 300) {
        let prev = +new Date();
        return function () {
          const args = argument,
          now = +new Date();
          if (now > prev + wait) {
            prev = now;
            fn.apply(this, args)
          }
        }
     }





13、介绍下 Set、Map、WeakSet 和 WeakMap 的区别？
	Set——对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用 
	WeakSet——成员都是对象；成员都是弱引用，可以被垃圾回收机制回收，可以 用来保存 DOM 节点，不容易造成内存泄漏； 
	Map——本质上是键值对的集合，类似集合；可以遍历，方法很多，可以跟各 种数据格式转换。
	WeakMap——只接受对象最为键名（null 除外），不接受其他类型的值作为键 名；键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收， 此时键名是无效的；不能遍历，方法有 get、set、has、delete。

14、算法手写题 
	已知如下数组，编写一个程序将数组扁平化去并除其中重复部分数据，最终得 到一个升序且不重复的数组 var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10]; 
	答：使用 Set 方法去重，flat(Infinity)扁平化 Array.from(new Set(arr.flat(Infinity))).sort((a,b)=>{ return a-b})
	//[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

15、介绍下观察者模式和订阅-发布模式的区别，各自适 用于什么场景 
	观察者模式中主体和观察者是互相感知的，
	发布-订阅模式是借助第三方来实现 调度的，发布者和订阅者之间互不感知

16、下面的代码打印什么内容，为什么？ 
	var b = 10; 
	(function b(){ 
		b = 20; 
		console.log(b); 
	})();
	 答：ƒ b(){b = 20; console.log(b); } 
	 	首先函数声明比变量要高，其次 b = 20 没有 var 获取其他，说明是 window 最 外层定义的变量。 js 作用域中，先找最近的 那就是 b fn ，直接打印了，如果 b = 20 有 var 那就 是打印 20

17、简单改造下面的代码，使之分别打印 10 和 20。
	var b = 10; 
	(function b(){ 
		b = 20; 
		console.log(b); 
	})();
	答：var b = 10; 
	(function (){
		 b = 20;
		  console.log(b);
	})();   // 20

	 var b = 10; 
	 (function (){ 
		 console.log(b); 
		 b = 20; 
		})();	 // 10

18、下面代码输出什么
	var a = 10;
	(function () { 
		console.log(a) 
		a = 5 
		console.log(window.a) 
		var a = 20; 
		console.log(a)
	})() 
	分别为 undefined 10 20，
	原因是作用域问题，在内部声名 var a = 20;相当于 先声明 var a;然后再执行赋值操作，这是在ＩＩＦＥ内形成的独立作用域；
	如果 把 var a=20 注释掉，那么 a 只有在外部有声明，显示的就是外部的Ａ变量的值 了。结果Ａ会是 10 5 5

19、使用 sort() 对数组 [3, 15, 8, 29, 102, 22] 进 行排序，输出结果
		输出：[102, 15, 22, 29, 3, 8]
		解析：根据 MDN 上对 Array.sort()的解释，默认的排序方法会将数组元素转换 为字符串，然后比较字符串中字符的 UTF-16 编码顺序来进行排序。所以'102' 会 排在 '15' 前面。
		正确排序：
		[3, 15, 8, 29, 102, 22].sort((a,b)=>{return a-b})

20、冒泡排序如何实现，时间复杂度是多少， 还可以如 何改进？
		冒泡算法的原理： 
			升序冒泡： 两次循环，相邻元素两两比较，如果前面的大于后面的就交换位置 
			降序冒泡： 两次循环，相邻元素两两比较，如果前面的小于后面的就交换位置
			冒泡排序在 平均和最坏情况下的时间复杂度都是 O(n^2)，最好情况下都是 O(n)，空间复 杂度是 O(1)。
			// 升序冒泡 
			function maopao(arr){ 
				const array = [...arr] 
				for(let i = 0, len = array.length; i < len - 1; i++){ 
					for(let j = i + 1; j < len; j++) { 
						if (array[i] > array[j]) { 
							let temp = array[i] 
							array[i] = array[j] 
							array[j] = temp
						} 
					} 
				}
				return array 
			}

		// 插入排序
		function insertionSort(arr) {
			var len = arr.length;
			var preIndex, current;
			for (var i = 1; i < len; i++) {
					preIndex = i - 1;
					current = arr[i];
					while(preIndex >= 0 && arr[preIndex] > current) {
							arr[preIndex+1] = arr[preIndex];
							preIndex--;
					}
					arr[preIndex+1] = current;
			}
			return arr;
		}


21、对象转数组 
	如下：{1:222, 2:123, 5:888}，请把数据处理为如下结构：[222, 123, null, null, 888, null, null, null, null, null, null, null]。
	let obj = {1:222, 2:123, 5:888}; 
	const result = Array.from({ length: 12 }).map((_, index) => obj[index + 1] || null); 
	console.log(result)

22、ES6 代码转成 ES5 代码的实现思路
	ES6 转 ES5 目前行业标配是用 Babel，转换的大致流程如下： 
	1. 解析：解析代码字符串，生成 AST； 
	2. 转换：按一定的规则转换、修改 AST； 
	3. 生成：将修改后的 AST 转换成普通代码。
	（抽象语法树（Abstract Syntax Tree，AST）

23、webpack 热更新原理解析
	1. 启动阶段
		(1)、代码文件通过 webpack Compile 进行打包 (webpack Compile :将 JS 编译成 Bundle)
		(2)、将打包好的文件传输给 Bundle Server
		(3)、然后Bundle Server会让文件以服务器的方式让浏览器可以访问到（正常是通过文件目录来访问）
		(4)、代码展示到浏览器
	2. 更新阶段
		(1)、变更后的代码同样会通过 webpack Compile 进行打包编译，、
		(2)、编译好之后会发送给 HMR Server
		(3)、HMR Server即可知道哪些资源、js模块、文件发生了改变
		(4)、然后通过 websorket 传输.hot-update.json的形式，通知 HMR Runtime
		(5)、HMR Runtime 在接收到文件变化后，就会更新代码
		(6)、最终代码更新，且无需刷新浏览器

24、事件循环Event Loop   
		macro-task(宏任务)：包括整体代码script，setTimeout，setInterval
		micro-task(微任务)：Promise，process.nextTick(node)

25、手写 bind、apply、call
	// call
	Function.prototype.call = function (context, ...args) {
		context = context || window;
		
		const fnSymbol = Symbol("fn");
		context[fnSymbol] = this;
		
		context[fnSymbol](...args);
		delete context[fnSymbol];
	}

	// apply   第二个参数是一个数组
	Function.prototype.apply = function (context, argsArr) {
		context = context || window;
		
		const fnSymbol = Symbol("fn");
		context[fnSymbol] = this;
		
		context[fnSymbol](...argsArr);
		delete context[fnSymbol];
	}

	// bind
	Function.prototype.bind = function (context, ...args) {
		context = context || window;
		const fnSymbol = Symbol("fn");
		context[fnSymbol] = this;
		
		return function (..._args) {
			args = args.concat(_args);
			
			context[fnSymbol](...args);
			delete context[fnSymbol];   
		}
	}

26、原型链和原型链的继承
	当对象查找一个属性的时候，如果没有在自身找到，那么就会查找自身的原型，如果原型还没有找到，那么会继续查找原型的原型，直到找到 Object.prototype 的原型时，此时原型为 null，查找停止。这种通过 通过原型链接的逐级向上的查找链被称为原型链

27、数组扁平化
	function flatten(arr) {
		let result = [];

		for (let i = 0; i < arr.length; i++) {
			if (Array.isArray(arr[i])) {
				result = result.concat(flatten(arr[i]));
			} else {
				result = result.concat(arr[i]);
			}
		}

		return result;
	}

	const a = [1, [2, [3, 4]]];
	console.log(flatten(a));

28、不安全的 JSON 值
	所有安全的 JSON 值都可以使用 JSON.stringify 序列化，不安全的 JSON 值有：undefined、function、symbol 和 循环引用。JSON.stringify
	在对象中遇到这些不安全的 JSON 值的时候会自动将其忽略，在数组中遇到则会返回 null，以保证数组成员位置不变
	JSON.stringify(undefined); // null
	JSON.stringify(function () {}); // null
	JSON.stringify([1, undefined, 2, function () {}, 3]); // "1, null, 2, null, 3"
	JSON.stringify({ a: 2, b: function () {} }); // "{"a":2}"

	值为undefined会被省略掉
	Date类型会变成字符串类型
	RegExp、Error对象识别不了，只能得到空对象
	NaN、Infinity和-Infinity，则序列化的结果会变成null

29、JSON.stringify 的第二个参数
	(1) 当 replacer 是一个数组时，那么他必须是一个字符串数组，其中包含序列化要处理的对象的属性名称，除此之外的属性就会被忽略
		const obj = {
			a: 42,
			b: 30,
			c: 100,
		};
		JSON.stringify(obj, ['a', 'c']); // {"a":42,"c":100}
		(2) 当 replacer 是一个函数时，他会对对象本身调用一次，然后在对对象中的每个属性各调用一次。每次传递两个参数（对象的键和值）。如果要忽略某个键就返回 undecided，否则就返回指定的值
			const obj = {
				a: 42,
				b: 30,
				c: 100,
			};
			JSON.stringify(obj, (k, v) => {
				// 注意：第一次 k 是 undefined，v 是原对象
				if (k !== 'c') return v;
			}); // "{"a":42,"b":30}"

30、Math.floor(1.9); // 1       Math.floor(-1.9); // -2

31、类型转换问题
	原题：如何让 (a == 1 && a == 2 && a == 3) 的值为 true?
	这个问题考查的数据类型转换，== 类型转换有个基本规则
	NaN 与任何值都不相等，包括自己本身
	undefined 与 null 相等(==)，其他都不等
	对象与字符串类型做比较，会把对象转换成字符串然后做比较
	其他类型比较都要转换成 数字 做比较
	那么这个问题我们重写 toString 或者 valueOf 方法就可以了
	const a = {
		val: 1,
		toString() {
			return this.val++;
		},
	};
	if (a == 1 && a == 2 && a == 3) {
		console.log('ok');
	}
	还有一种方法实现
	var i = 1;
	Object.defineProperty(window, 'a', {
		get() {
			return i++;
		},
	});

	if (a == 1 && a == 2 && a == 3) {
		console.log('OK');
	}

	拓展一下 [] == ![] 为什么是 true
	上面隐式类型转换规则中提到，其他类型比较都要转换成数字做比较，这个就是对应那条规则的
	首先 [].toString() 会得到一个 '' 字符串
	![] 得到一个布尔值 false
	'' 与 false 比较肯定要转换成数字比较
	那么 '' 转换则为 0， false 转换也是 0
	所以这道题就是 true

32、菲波那切数列
	1、1、2、3、5、8、13、21、34 ....
	这道题有个规律，第一项加上第二项永远等于第三项：1 + 1 = 2；1 + 2 = 3；2 + 3 = 5；3 + 5 = 8 ....
	要求是传入第几项，得到该值，根据这个规律来实现一下
	function feibo(n, sum1 = 1, sum2 = 1) {
		if (n === 1 || n === 2) return sum2;
		return feibo(n - 1, sum2, sum1 + sum2);
	}

33、深度冻结对象
	在 vue 项目开发中，有些不变的常量，我们不想 vue 为他做双向绑定，以减少一些性能上消耗，我们可以把使用 Object.freeze 将对象冻结，此时 vue 将不会对这个对象进行冻结，但是这个冻结只是冻结对象第一层，所以遇到对象层级比较深的话，我们可以写个深度冻结的 api，来对常量对象做一些冻结优化
	const deepFreeze = o => {
		const propNames = Object.getOwnPropertyNames(o);
		propNames.forEach(name => {
			const prop = o[name];
			if (typeof prop === 'object' && prop !== null) {
				deepFreeze(prop);
			}
		});
		return Object.freeze(o);
	};

34、树遍历
	对于树结构的遍历一般有深度优先和广度优先
	广度优先和深度优先的概念很简单，区别如下：
	深度优先，访问完一颗子树再去访问后面的子树，而访问子树的时候，先访问根再访问根的子树，称为先序遍历；先访问子树再访问根，称为后序遍历。
	广度优先，即访问树结构的第 n+1 层前必须先访问完第 n 层
	(1)深度优先
			先序遍历
			const treeForEach = (tree, func) => {
				tree.forEach(data => {
					func(data);
					data.children && treeForEach(data.children, func);
				});
			};
			后序遍历，只需要调换一下节点遍历和子树遍历的顺序即可
			const treeForEach = (tree, func) => {
				tree.forEach(data => {
					data.children && treeForEach(data.children, func);
					func(data);
				});
			};
	(2)广度优先
		广度优先的思路是，维护一个队列，队列的初始值为树结构根节点组成的列表，重复执行以下步骤直到队列为空。取出队列中的第一个元素，进行访问相关操作，然后将其后代元素（如果有）全部追加到队列最后。
		const treeForEach = (tree, func) => {
			let node,
				list = [...tree];
			while ((node = list.shift())) {
				func(node);
				node.children && list.push(...node.children);
			}
		};

35、computed 和 watch 的区别和运用的场景
	当我们需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算；

	当我们需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许我们执行异步操作 ( 访问一个 API )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

36、Vue 的父组件和子组件生命周期钩子函数执行顺序？
		Vue 的父组件和子组件生命周期钩子函数执行顺序可以归类为以下 4 部分
		(1) 加载渲染过程 
			父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted
		(2) 子组件更新过程
			父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated
		(3) 父组件更新过程
			父 beforeUpdate -> 父 updated
		(4) 销毁过程
			父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed

37、父组件可以监听到子组件的生命周期吗？
	（1）// Parent.vue
			<Child @mounted="doSomething"/>

			// Child.vue
			mounted() {
				this.$emit("mounted");
			}
	（2）//  Parent.vue
			<Child @hook:mounted="doSomething" ></Child>

			doSomething() {
				console.log('父组件监听到 mounted 钩子函数 ...');
			},

			//  Child.vue
			mounted(){
				console.log('子组件触发 mounted 钩子函数 ...');
			},    

			// 以上输出顺序为：
			// 子组件触发 mounted 钩子函数 ...
			// 父组件监听到 mounted 钩子函数 ...

38、谈谈你对 keep-alive 的了解？
	keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，避免重新渲染 ，其有以下特性：

		一般结合路由和动态组件一起使用，用于缓存组件；

		提供 include 和 exclude 属性，两者都支持字符串或正则表达式， include 表示只有名称匹配的组件会被缓存，exclude 表示任何名称匹配的组件都不会被缓存 ，其中 exclude 的优先级比 include 高；

		对应两个钩子函数 activated 和 deactivated ，当组件被激活时，触发钩子函数 activated，当组件被移除时，触发钩子函数 deactivated。

39、组件中 data 为什么是一个函数？
		为什么组件中的 data 必须是一个函数，然后 return 一个对象，而 new Vue 实例里，data 可以直接是一个对象？
		因为组件是用来复用的，且 JS 里对象是引用关系，如果组件中 data 是一个对象，那么这样作用域没有隔离，子组件中的 data 属性值会相互影响，如果组件中 data 选项是一个函数，那么每个实例可以维护一份被返回对象的独立的拷贝，组件实例之间的 data 属性值不会互相影响；而 new Vue 的实例，是不会被复用的，因此不存在引用对象的问题。

40、v-model 的原理？
		我们在 vue 项目中主要使用 v-model 指令在表单 input、textarea、select 等元素上创建双向数据绑定，我们知道 v-model 本质上不过是语法糖，v-model 在内部为不同的输入元素使用不同的属性并抛出不同的事件：

		text 和 textarea 元素使用 value 属性和 input 事件；

		checkbox 和 radio 使用 checked 属性和 change 事件；

		select 字段将 value 作为 prop 并将 change 作为事件。

		以 input 表单元素为例：
		<input v-model='something'>
		相当于
		<input v-bind:value="something" v-on:input="something = $event.target.value">

		如果在自定义组件中，v-model 默认会利用名为 value 的 prop 和名为 input 的事件，如下所示：
		父组件：
		<ModelChild v-model="message"></ModelChild>
		子组件：
		<div>{{value}}</div>

		props:{
				value: String
		},
		methods: {
			test1(){
				this.$emit('input', '张三')
			},
		},

41、Vue 是如何实现数据双向绑定的？
	（vue.js 是采用数据劫持结合发布者-订阅者模式的方式）
	Vue 主要通过以下 4 个步骤来实现数据双向绑定的：

	实现一个监听器 Observer：对数据对象进行遍历，包括子属性对象的属性，利用 Object.defineProperty() 对属性都加上 setter 和 getter。这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化。

	实现一个解析器 Compile：解析 Vue 模板指令，将模板中的变量都替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数进行数据更新。

	实现一个订阅者 Watcher：Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁 ，主要的任务是订阅 Observer 中的属性值变化的消息，当收到属性值变化的消息时，触发解析器 Compile 中对应的更新函数。

	实现一个订阅器 Dep：订阅器采用 发布-订阅 设计模式，用来收集订阅者 Watcher，对监听器 Observer 和 订阅者 Watcher 进行统一管理。

42、Proxy 与 Object.defineProperty 优劣对比
		Proxy 的优势如下:
		Proxy 可以直接监听对象而非属性；
		Proxy 可以直接监听数组的变化；
		Proxy 有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的；
		Proxy 返回的是一个新对象,我们可以只操作新的对象达到目的,而 Object.defineProperty 只能遍历对象属性直接修改；
		Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；

		Object.defineProperty 的优势如下:
		兼容性好，支持 IE9，而 Proxy 的存在浏览器兼容性问题,而且无法用 polyfill 磨平

43、什么是 MVVM？
	Model–View–ViewModel （MVVM） 是一个软件架构设计模式
	（1）View 层
		View 是视图层，也就是用户界面。前端主要由 HTML 和 CSS 来构建 。

	（2）Model 层
		Model 是指数据模型，泛指后端进行的各种业务逻辑处理和数据操控，对于前端来说就是后端提供的 api 接口。

	（3）ViewModel 层
		（前端业务代码逻辑）
		由 ViewModel 负责与 Model 层交互，这就完全解耦了 View 层和 Model 层，这个解耦是至关重要的，它是前后端分离方案实施的重要一环。
		

		在 JQuery 时期，如果需要刷新 UI 时，需要先取到对应的 DOM 再更新 UI，这样数据和业务的逻辑就和页面有强耦合。

44、虚拟 DOM 实现原理？

		虚拟 DOM 的实现原理主要包括以下 3 部分：

		用 JavaScript 对象模拟真实 DOM 树，对真实 DOM 进行抽象；

		diff 算法 — 比较两棵虚拟 DOM 树的差异；

		pach 算法 — 将两个虚拟 DOM 对象的差异应用到真正的 DOM 树。

45、Vue 中的 key 有什么作用？
		key 是为 Vue 中 vnode 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速。

46、对 Vue 项目进行哪些优化？
	从 3 个大方面，22 个小方面详细讲解如何进行 Vue 项目的优化。
	（1）代码层面的优化
		v-if 和 v-show 区分使用场景
		computed 和 watch 区分使用场景
		v-for 遍历必须为 item 添加 key，且避免同时使用 v-if
		长列表性能优化
		事件的销毁
		图片资源懒加载
		路由懒加载
		第三方插件的按需引入
		优化无限列表性能
		服务端渲染 SSR or 预渲染

（2）Webpack 层面的优化

		Webpack 对图片进行压缩
		减少 ES6 转为 ES5 的冗余代码
		提取公共代码
		模板预编译
		提取组件的 CSS
		优化 SourceMap
		构建结果输出分析
		Vue 项目的编译优化
（3）基础的 Web 技术的优化

		开启 gzip 压缩
		浏览器缓存
		CDN 的使用
		使用 Chrome Performance 查找性能瓶颈

47、请简单实现双向数据绑定mvvm。
		<input id="input" />
		const data = {};
		const input = document.getElementById('input');
		Object.defineProperty(data, 'text', {
    	set(value) {
    		input.value = value;
    		this.value = value;
			}
		});
		input.onChange = function(e) {
  		data.text = e.target.value;
		}

48、基础语法
		　在ES5 中，变量声明有两种方式，分别是  var 和 function ，var 用于声明普通的变量，接收任意类型，function用于声明函数。另外，ES6 新增了 let、const、import 和 class 等四个命令，分别用以声明 普通变量、静态变量、模块 和 类 。

		JS中的函数存在着三种角色：普通函数、构造函数、对象方法。
		直接调用时就是普通函数，通过new创建对象时就是构造函数，通过对象调用时就是方法。
		对于普通函数，this 始终指向全局对象window；对于构造函数，this则指向新创建的对象；对于方法，this指向调用该方法的对象。另外，Function对象也提供了call、apply 和 bind 等方法来改变函数的 this 指向，其中，call 和 apply 主动执行函数，bind一般在事件回调中使用，而 call 和 apply 的区别只是参数的传递方式不同。

		avascript 是单线程语言。在浏览器中，当JS代码被加载时，浏览器会为其分配一个主线程来执行任务，主线程会在栈中创建一个全局执行环境 （全局作用域）。每当有一个函数进入执行流时，就会形成一个对应的执行环境（函数作用域），并将该执行环境压入栈中。每当一个函数执行完毕以后，对应的执行环境就会从栈中弹出，然后被销毁。这就是执行环境栈，执行环境栈的作用就是保证所有的函数能按照正确的顺序被执行。

49、XMLHttpRequest
		Ajax是浏览器专门用来和服务器进行交互的异步通讯技术，其核心对象是 XMLHttpRequest
		Ajax 提供了两个状态位来描述请求在不同阶段的状态，这两个状态位分别是 readyState 和 status 
		readyState 通过 5个状态码来描述一个请求的 5 个阶段：
			0 - 请求未发送，初始化阶段
			1 - 请求发送中，服务器还未收到请求
			2 - 请求发送成功，服务器已收到请求
			3 - 服务器处理完成，开始响应请求，传输数据
			4 - 客户端收到请求，并完成了数据下载，生成了响应对象

50、BOM
		BOM 是 Browser Object Model 的缩写，即浏览器对象模型，当一个浏览器页面初始化时，会在内存创建一个全局的对象，用以描述当前窗口的属性和状态，这个全局对象被称为浏览器对象模型，即BOM。BOM的核心对象就是window，window 对象也是BOM的顶级对象，其中包含了浏览器的 6个核心模块：

		document - 即文档对象，渲染引擎在解析HTML代码时，会为每一个元素生成对应的DOM对象，由于元素之间有层级关系，因此整个HTML代码解析完以后，会生成一个由不同节点组成的树形结构，俗称DOM树，document 用于描述DOM树的状态和属性，并提供了很多操作DOM的API。
		frames - HTML 子框架，即在浏览器里嵌入另一个窗口，父框架和子框架拥有独立的作用域和上下文。
		history - 以栈(FIFO)的形式保存着页面被访问的历史记录，页面前进即入栈，页面返回即出栈。
		location - 提供了当前窗口中加载的文档相关信息以及一些导航功能。
		navigator - 用来描述浏览器本身，包括浏览器的名称、版本、语言、系统平台、用户特性字符串等信息。
		screen - 提供了浏览器显示屏幕的相关属性，比如显示屏幕的宽度和高度，可用宽度和高度。

51、HTML解析过程
		浏览器加载 html 文件以后，渲染引擎会从上往下，一步步来解析HTML标签，大致过程如下：
		用户输入网址，浏览器向服务器发出请求，服务器返回html文件；
		渲染引擎开始解析 html 标签，并将标签转化为DOM节点，生成 DOM树；
		如果head 标签中引用了外部css文件，则发出css文件请求，服务器返回该文件，该过程会阻塞后面的解析；
		如果引用了外部 js 文件，则发出 js 文件请求，服务器返回后立即执行该脚本，这个过程也会阻塞html的解析；
		引擎开始解析 body 里面的内容，如果标签里引用了css 样式，就需要解析刚才下载好的css文件，然后用css来设置标签的样式属性，并生成渲染树；
		如果 body 中的 img 标签引用了图片资源，则立即向服务器发出请求，此时引擎不会等待图片下载完毕，而是继续解析后面的标签；
		服务器返回图片文件，由于图片需要占用一定的空间，会影响到后面元素的排版，因此引擎需要重新渲染这部分内容；
		如果此时 js 脚本中运行了 style.display="none"，布局被改变，引擎也需要重新渲染这部分代码；
		直到 html 结束标签为止，页面解析完毕。

52、浏览器缓存机制
	浏览器缓存机制是指通过 HTTP 协议头里的 Cache-Control (或 Expires) 和 Last-Modified (或 Etag) 等字段来控制文件缓存的机制。
	　　Cache-Control（强缓存） 用于控制文件在本地缓存有效时长。最常见的，比如服务器回包：Cache-Control:max-age=600 表示文件在本地应该缓存，且有效时长是600秒 (从发出请求算起)。在接下来600秒内，如果有请求这个资源，浏览器不会发出 HTTP 请求，而是直接使用本地缓存的文件。
	　　Last-Modified（协商缓存） 是标识文件在服务器上的最新更新时间。下次请求时，如果文件缓存过期，浏览器通过 If-Modified-Since 字段带上这个时间，发送给服务器，由服务器比较时间戳来判断文件是否有修改。如果没有修改，服务器返回304告诉浏览器继续使用缓存；如果有修改，则返回200，同时返回最新的文件。
	　　Cache-Control 通常与 Last-Modified 一起使用。一个用于控制缓存有效时间，一个在缓存失效后，向服务查询是否有更新。
	　　Cache-Control 还有一个同功能的字段：Expires。Expires 的值一个绝对的时间点，如：Expires: Thu, 10 Nov 2015 08:45:11 GMT，表示在这个时间点之前，缓存都是有效的。
	　　Expires 是 HTTP1.0 标准中的字段，Cache-Control 是 HTTP1.1 标准中新加的字段，功能一样，都是控制缓存的有效时间。当这两个字段同时出现时，Cache-Control 是高优化级的。
	　　Etag 也是和 Last-Modified 一样，对文件进行标识的字段。不同的是，Etag 的取值是一个对文件进行标识的特征字串。在向服务器查询文件是否有更新时，浏览器通过 If-None-Match 字段把特征字串发送给服务器，由服务器和文件最新特征字串进行匹配，来判断文件是否有更新。没有更新回包304，有更新回包200。Etag 和 Last-Modified 可根据需求使用一个或两个同时使用。两个同时使用时，只要满足基中一个条件，就认为文件没有更新。
	　　另外有两种特殊的情况：
	手动刷新页面(F5) - 浏览器会直接认为缓存已经过期(可能缓存还没有过期)，在请求中加上字段：Cache-Control:max-age=0，发包向服务器查询是否有文件是否有更新。
	强制刷新页面(Ctrl+F5) - 浏览器会直接忽略本地的缓存(有缓存也会认为本地没有缓存)，在请求中加上字段：Cache-Control:no-cache (或 Pragma:no-cache)，发包向服务重新拉取文件。

53、CORS是一个W3C标准，全称是”跨域资源共享”（Cross-origin resource sharing）
		设置请求头部，Access-Control-Allow-Origin（该属性表示哪些域名可以访问资源，如果设置通配符则表示所有网站都可以访问资源。） 等头部信息

54、XSS 与 CSRF 两种跨站攻击
	xss 跨站脚本攻击（英语：Cross-site Scripting），主要是前端层面的，用户在输入层面插入攻击脚本，改变页面的显示，或则窃取网站 cookie，
	预防方法：不相信用户的所有操作，对用户输入进行一个转义，不允许 js 对 cookie 的读写

	csrf 跨站请求伪造（英语：Cross-site request forgery），以你的名义，发送恶意请求，通过 cookie 加参数等形式过滤，简单点说，CSRF 就是利用用户的登录态发起恶意请求。
	跨站请求可以用各种方式：图片URL、超链接、CORS、Form提交等等。
	防范 CSRF 可以遵循以下几种规则
	1. 不让第三方网站访问到用户 Cookie
	2. 阻止第三方网站请求接口
	3. 请求时附带验证信息，比如验证码或者 token
	4. 将cookie设置为HttpOnly(不能通过 JS 访问 Cookie，减少 XSS 攻击)

55、Object.keys()  Object.values()  Object.entries()

56、深拷贝的方法：

		自己实现函数，递归实现；遍历对象的key，值是对象重新new对象赋值
		lodash里面的 _.cloneDeep()
		JSON.parse(JSON.stringify())

		浅拷贝的方法：

		ES6解构赋值 ... 和 slice(0)
		Object.assign
		lodash 里面 _.clone()

57、window.onload 和 DOMContentLoaded 区别
		 window.addEventListener('load', ()=>{
      //页面全部资源加载完才会执行，包括图片、视频等
      console.log("load");
  })

  window.addEventListener('DOMContentLoaded', ()=>{
      //DOM 渲染完即可执行，此时图片、视频还可能没有加载完
      console.log("DOMContentLoaded")
  })

58、浏览器缓存
		（1）强制缓存
			- expires: http1.0的产物；根据一个绝对时间来确定是否要利用缓存；
			- cache-control: http1.1的产物，根据一个相对时间来确定是否利用缓存。
			- 两者同时存在，cache-control生效；expires是兼容性写法。

			1. no-cache：需要进行协商缓存，发送请求到服务器确认是否使用缓存。
			2. no-store：禁止使用缓存，每一次都要重新请求数据。
			3. public：可以被所有的用户缓存，包括终端用户和 CDN 等中间代理服务器。
			4. private：只能被终端用户的浏览器缓存，不允许 CDN 等中继缓存服务器对其缓存
			5. max-age>0 时 直接从游览器缓存中 提取
			6. max-age<=0 时 向server 发送http 请求确认 ,该资源是否有修改; 有的话 返回200 ,无的话 返回304.

59、三次握手
		所谓三次握手（Three-Way Handshake）即建立TCP连接，就是指建立一个TCP连接时，需要客户端和服务端总共发送3个包以确认连接的建立。在socket编程中，这一过程由客户端执行connect来触发
		（1）Client将标志位SYN置为1，随机产生一个值seq=J，并将该数据包发送给Server，Client进入SYN_SENT状态，等待Server确认。
		（2）第二次握手：Server收到数据包后由标志位SYN=1知道Client请求建立连接，Server将标志位SYN和ACK都置为1，ack=J+1，随机产生一个值seq=K，并将该数据包发送给Client以确认连接请求，Server进入SYN_RCVD状态。
		（3）第三次握手：Client收到确认后，检查ack是否为J+1，ACK是否为1，如果正确则将标志位ACK置为1，ack=K+1，并将该数据包发送给Server，Server检查ack是否为K+1，ACK是否为1，如果正确则连接建立成功，Client和Server进入ESTABLISHED状态，完成三次握手，随后Client与Server之间可以开始传输数据了。

		简单来说，就是
		1、建立连接时，客户端发送SYN包（SYN=i）到服务器，并进入到SYN-SEND状态，等待服务器确认
		2、服务器收到SYN包，必须确认客户的SYN（ack=i+1）,同时自己也发送一个SYN包（SYN=k）,即SYN+ACK包，此时服务器进入SYN-RECV状态
		3、客户端收到服务器的SYN+ACK包，向服务器发送确认报ACK（ack=k+1）,此包发送完毕，客户端和服务器进入ESTABLISHED状态，完成三次握手，客户端与服务器开始传送数据。

		SYN （同步序列编号）ACK（确认字符）


		为什么不是两次？
		无法确认客户端的接收能力。



		（TCP 握手结束后会进行 TLS 握手，然后就开始正式的传输数据）
		HTTPS 握手
		HTTPS 还是通过了 HTTP 来传输信息，但是信息通过 TLS 协议进行了加密。

		TLS 协议位于传输层之上，应用层之下。首次进行 TLS 协议传输需要两个 RTT ，接下来可以通过 Session Resumption 减少到一个 RTT。
		在 TLS 中使用了两种加密技术，分别为：对称加密和非对称加密。

		对称加密：

		对称加密就是两边拥有相同的秘钥，两边都知道如何将密文加密解密。

		非对称加密：

		有公钥私钥之分，公钥所有人都可以知道，可以将数据用公钥加密，但是将数据解密必须使用私钥解密，私钥只有分发公钥的一方才知道。
		


60、四次挥手
		所谓四次挥手（Four-Way Wavehand）即终止TCP连接，就是指断开一个TCP连接时，需要客户端和服务端总共发送4个包以确认连接的断开。在socket编程中，这一过程由客户端或服务端任一方执行close来触发

		（1）第一次挥手：Client发送一个FIN，用来关闭Client到Server的数据传送，Client进入FIN_WAIT_1状态。
		（2）第二次挥手：Server收到FIN后，发送一个ACK给Client，确认序号为收到序号+1（与SYN相同，一个FIN占用一个序号），Server进入CLOSE_WAIT状态。
		（3）第三次挥手：Server发送一个FIN，用来关闭Server到Client的数据传送，Server进入LAST_ACK状态。
		（4）第四次挥手：Client收到FIN后，Client进入TIME_WAIT状态，接着发送一个ACK给Server，确认序号为收到序号+1，Server进入CLOSED状态，完成四次挥手。

61、关于横屏
		js识别
		window.addEventListener("resize", ()=>{
				if (window.orientation === 180 || window.orientation === 0) { 
					// 正常方向或屏幕旋转180度
						console.log('竖屏');
				};
				if (window.orientation === 90 || window.orientation === -90 ){ 
					// 屏幕顺时钟旋转90度或屏幕逆时针旋转90度
						console.log('横屏');
				}  
		});

		css识别
		@media screen and (orientation: portrait) {
			/*竖屏...*/
		} 
		@media screen and (orientation: landscape) {
			/*横屏...*/
		}

62、beforeCreate    在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。
		created   			在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，property 和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el property 目前尚不可用。

63、打印出当前网页使用了多少种HTML元素
		const fn = () => {
			return [...new Set([...document.querySelectorAll('*')].map(el => el.tagName))].length;
		}

64、预加载
		预先加载利用浏览器空闲时间请求将来要使用的资源，以便用户访问下一页面时更快地响应。

65、划分内容到不同域名
		浏览器一般会限制每个域的并行线程（一般为6个，甚至更少），使用不同的域名可以最大化下载线程，但注意保持在2-4个域名内，以避免DNS查询损耗。
		例如，动态内容放在csspod.com上，静态资源放在static.csspod.com上。这样还可以禁用静态资源域下的Cookie，减少数据传输

66、从HTTP/1.1开始，web客户端就有了支持压缩的Accept-Encoding HTTP请求头。
		Accept-Encoding: gzip, deflate

		如果web服务器看到这个请求头，它就会用客户端列出的一种方式来压缩响应。web服务器通过Content-Encoding响应头来通知客户端。
		Content-Encoding: gzip

67、cookie
		属性					作用

		value 				如果用于保存用户登录态，应该将该值加密，不能使用明文的用户标识
		http-only			不能通过 JS 访问 Cookie，减少 XSS 攻击
		secure				只能在协议为 HTTPS 的请求中携带
		same-site			规定浏览器不能在跨域请求中携带 Cookie，减少 CSRF 攻击

68、从输入 URL 到页面加载全过程
		1. 首先做 DNS 查询，如果这一步做了智能 DNS 解析的话，会提供访问速度最快的 IP 地址回来
		2. 接下来是 TCP 握手，应用层会下发数据给传输层，这里 TCP 协议会指明两端的端口号，然后下发给网络层。网络层中的 IP 协议会确定 IP 地址，并且指示了数据传输中如何跳转路由器。然后包会再被封装到数据链路层的数据帧结构中，最后就是物理层面的传输了
		3. TCP 握手结束后会进行 TLS 握手，然后就开始正式的传输数据
		4. 数据在进入服务端之前，可能还会先经过负责负载均衡的服务器，它的作用就是将请求合理的分发到多台服务器上，这时假设服务端会响应一个 HTML 文件
		5. 首先浏览器会判断状态码是什么，如果是 200 那就继续解析，如果 400 或 500 的话就会报错，如果 300 的话会进行重定向，这里会有个重定向计数器，避免过多次的重定向，超过次数也会报错
		6. 浏览器开始解析文件，如果是 gzip 格式的话会先解压一下，然后通过文件的编码格式知道该如何去解码文件
		7. 文件解码成功后会正式开始渲染流程，先会根据 HTML 构建 DOM 树，有 CSS 的话会去构建 CSSOM 树。如果遇到 script 标签的话，会判断是否存在 async 或者 defer ，前者会并行进行下载并执行 JS，后者会先下载文件，然后等待 HTML 解析完成后顺序执行，如果以上都没有，就会阻塞住渲染流程直到 JS 执行完毕。遇到文件下载的会去下载文件，这里如果使用 HTTP 2.0 协议的话会极大的提高多图的下载效率。
		8. 初始的 HTML 被完全加载和解析后会触发 DOMContentLoaded 事件
		9. CSSOM 树和 DOM 树构建完成后会开始生成 Render 树，这一步就是确定页面元素的布局、样式等等诸多方面的东西
		10. 在生成 Render 树的过程中，浏览器就开始调用 GPU 绘制，合成图层，将内容显示在屏幕上了

69、Nginx更擅长于底层服务器端资源的处理（静态资源处理转发、反向代理，负载均衡等），Node.js更擅长于上层具体业务逻辑的处			理。两者可以实现完美组合，助力前端开发。

		什么是反向代理？ 互联网应用基本都基于CS基本结构，即client端和server端。代理其实就是在client端和真正的server端之前增加一层提供特定服务的服务器，即代理服务器。

		解决跨域：现在前端成熟的做法，一般是把node proxy server集成进来。事实上，用Nginx同样可以解决问题

		负载均衡是反向代理的一种，后端多台服务器，nginx根据权重、压力、带宽的分配服务器，避免等待和拥塞
		
		动静分离是反向代理的一种，后端服务器分为动态资源服务器和静态资源服务器，nginx会根据请求分配服务器，区分处理逻辑，加快响应

70、为什么会首屏白屏
		浏览器渲染包含 HTML 解析、DOM 树构建、CSSOM 构建、JavaScript 解析、布局、绘制等等
		因为要等待文件加载、CSSOM 构建、JS 解析等过程，而这些过程比较耗时，导致用户会长时间出于不可交互的首屏灰白屏状态

71、浏览器在什么情况下会发起options预检请求？
		在非简单请求且跨域的情况下，浏览器会发起options预检请求。

		关于简单请求和复杂请求：
		1. 简单请求

			简单请求需满足以下两个条件

			请求方法是以下三种方法之一：
			HEAD
			GET
			POST
			HTTP 的头信息不超出以下几种字段
			Accept
			Accept-Language
			Content-Language
			Last-Event-ID
			Content-Type: 只限于 (application/x-www-form-urlencoded、multipart/form-data、text/plain)
		2. 复杂请求

			非简单请求即是复杂请求

			常见的复杂请求有：

			请求方法为 PUT 或 DELETE

			Content-Type 字段类型为 application/json

			添加额外的http header 比如access_token

			在跨域的情况下，非简单请求会先发起一次空body的OPTIONS请求，称为"预检"请求，用于向服务器请求权限信息，等预检请求被成功响应后，才发起真正的http请求。

72、渐进增强和优雅降级
		优雅降级一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。。
		
		渐进增强针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。

73、Virtual DOM 真的比操作原生 DOM 快吗？
		1. 原生 DOM 操作 vs. 通过框架封装操作。

			这是一个性能 vs. 可维护性的取舍。框架的意义在于为你掩盖底层的 DOM 操作，让你用更声明式的方式来描述你的目的，从而让你的代码更容易维护。没有任何框架可以比纯手动的优化 DOM 操作更快，因为框架的 DOM 操作层需要应对任何上层 API 可能产生的操作，它的实现必须是普适的。针对任何一个 benchmark，我都可以写出比任何框架更快的手动优化，但是那有什么意义呢？在构建一个实际应用的时候，你难道为每一个地方都去做手动优化吗？出于可维护性的考虑，这显然不可能。框架给你的保证是，你在不需要手动优化的情况下，我依然可以给你提供过得去的性能。

			我们可以比较一下 innerHTML vs. Virtual DOM 的重绘性能消耗：

			innerHTML: render html string O(template size) + 重新创建所有 DOM 元素 O(DOM size)
			Virtual DOM: render Virtual DOM + diff O(template size) + 必要的 DOM 更新 O(DOM change)

			Virtual DOM render + diff 显然比渲染 html 字符串要慢，但是！它依然是纯 js 层面的计算，比起后面的 DOM 操作来说，依然便宜了太多。可以看到，innerHTML 的总计算量不管是 js 计算还是 DOM 操作都是和整个界面的大小相关，但 Virtual DOM 的计算量里面，只有 js 计算和界面大小相关，DOM 操作是和数据的变动量相关的。前面说了，和 DOM 操作比起来，js 计算是极其便宜的。这才是为什么要有 Virtual DOM：它保证了 1）不管你的数据变化多少，每次重绘的性能都可以接受；2) 你依然可以用类似 innerHTML 的思路去写你的应用。


74、CDN的全称是 Content Delivery Network，即内容分发网络。
		CDN 是构建在网络之上的内容分发网络，依靠部署在各地的边缘服务器，通过中心平台的负载均衡、内容分发、调度等功能模块，使用户就近获取所需内容，降低网络拥塞，提高用户访问响应速度和命中率。CDN 的关键技术主要有内容存储和分发技术。

		CDN 的优势
		1. CDN 节点解决了跨运营商和跨地域访问的问题，访问延时大大降低；
		2. 大部分请求在 CDN 边缘节点完成，CDN 起到了分流作用，减轻了源站的负载；
		3. 降低“广播风暴”的影响，提高网络访问的稳定性；节省骨干网带宽，减少带宽需求量。


		CDN(Content Delivery Network)就是利用DNS的重定向技术，DNS服务器会返回一个跟 用户最接近的点的IP地址给用户，CDN节点的服务器负责响应用户的请求，提供所需的内容。

75、HTTPS 是什么？具体流程
		HTTPS 是在 HTTP 和 TCP 之间建立了一个安全层，HTTP 与 TCP 通信的时候，必须先进过一个安全层，对数据包进行加密，然后将加密后的数据包传送给 TCP，相应的 TCP 必须将数据包解密，才能传给上面的 HTTP。

		浏览器传输一个 client_random 和加密方法列表，服务器收到后，传给浏览器一个 server_random、加密方法列表和数字证书（包含了公钥），然后浏览器对数字证书进行合法验证，如果验证通过，则生成一个 pre_random，然后用公钥加密传给服务器，服务器用 client_random、server_random 和 pre_random ，使用公钥加密生成 secret，然后之后的传输使用这个 secret 作为秘钥来进行数据的加解密。


76、你对 TCP 滑动窗口有了解嘛？

		在 TCP 链接中，对于发送端和接收端而言，TCP 需要把发送的数据放到发送缓存区, 将接收的数据放到接收缓存区。而经常会存在发送端发送过多，而接收端无法消化的情况，所以就需要流量控制，就是在通过接收缓存区的大小，控制发送端的发送。如果对方的接收缓存区满了，就不能再继续发送了。而这种流量控制的过程就需要在发送端维护一个发送窗口，在接收端维持一个接收窗口。

		TCP 滑动窗口分为两种: 发送窗口和接收窗口。

77、TCP 如何保证有效传输及拥塞控制原理。
		tcp 是面向连接的、可靠的、传输层通信协议

		可靠体现在：有状态、可控制

		1. 有状态是指 TCP 会确认发送了哪些报文，接收方受到了哪些报文，哪些没有收到，保证数据包按序到达，不允许有差错
		2. 可控制的是指，如果出现丢包或者网络状况不佳，则会跳转自己的行为，减少发送的速度或者重发

78、谈一谈你对HTTP/2理解
		1. 头部压缩
				HTTP 2.0 使用 HPACK 算法进行压缩。
		2. 多路复用
				HTTP 1.x 中，如果想并发多个请求，必须使用多个 TCP 链接，且浏览器为了控制资源，还会对单个域名有 6-8个的TCP链接请求限制。
				HTTP2中：

				同域名下所有通信都在单个连接上完成。
				单个连接可以承载任意数量的双向数据流。
				数据流以消息的形式发送，而消息又由一个或多个帧组成，多个帧之间可以乱序发送，因为根据帧首部的流标识可以重新组装，也就是Stream ID，流标识符，有了它，接收方就能从乱序的二进制帧中选择ID相同的帧，按照顺序组装成请求/响应报文。

		3. 服务器推送（server push）

		4. 二进制分帧


		http1.1 改进:

			1. 长连接(默认 keep-alive)，复用
			2. host 字段指定对应的虚拟站点
			3. 新增功能:
					断点续传
					身份认证
					状态管理
					cache 缓存
						Cache-Control
						Expires
						Last-Modified
						Etag

79、DNS  (域名服务器)
		1. DNS域名系统，是应用层协议，运行UDP协议之上，使用端口43。
		2. 查询过程，本地查询是递归查询，依次通过浏览器缓存 —>> 本地hosts文件 —>> 本地DNS解析器 —>>本地DNS服务器 —>> 其他域名服务器请求。 接下来的过程就是迭代过程。
		3. 递归查询一般而言，发送一次请求就够，迭代过程需要用户发送多次请求。

		「DNS 使用 UDP 协议作为传输层协议的主要原因是为了避免使用 TCP 协议时造成的连接时延。」

80、介绍一下Connection:keep-alive
		我们知道HTTP协议采用“请求-应答”模式，当使用普通模式，即非KeepAlive模式时，每个请求/应答客户和服务器都要新建一个连接，完成 之后立即断开连接（HTTP协议为无连接的协议）；
		
		当使用Keep-Alive模式（又称持久连接、连接重用）时，Keep-Alive功能使客户端到服 务器端的连接持续有效，当出现对服务器的后继请求时，Keep-Alive功能避免了建立或者重新建立连接。

		keep-alive技术的创建目的，能在多次HTTP之前重用同一个TCP连接，从而减少创建/关闭多个 TCP 连接的开销（包括响应时间、CPU 资源、减少拥堵等）

		客户端如何开启
		在HTTP/1.0协议中，默认是关闭的，需要在http头加入"Connection: Keep-Alive”，才能启用Keep-Alive；
		http 1.1中默认启用Keep-Alive，如果加入"Connection: close “，才关闭。

81、Last-Modified
		这个字段表示的是「最后修改时间」。在浏览器第一次给服务器发送请求后，服务器会在响应头中加上这个字段。
		浏览器接收到后，「如果再次请求」，会在请求头中携带If-Modified-Since字段，这个字段的值也就是服务器传来的最后修改时间。
		服务器拿到请求头中的If-Modified-Since的字段后，其实会和这个服务器中该资源的最后修改时间对比:

			1. 如果请求头中的这个值小于最后修改时间，说明是时候更新了。返回新的资源，跟常规的HTTP请求响应的流程一样。
			2. 否则返回304，告诉浏览器直接使用缓存。

82、浏览器缓存的位置的话，可以分为四种,优先级从高到低排列分别

		1. Service Worker
		2. Memory Cache
		3. Disk Cache
		4. Push Cache

84、谈一谈你对URL理解
		统一资源定位符的简称，Uniform Resource Locator

		URL 编码
		URL 只能使用 ASCII 字符集来通过因特网进行发送。
		由于 URL 常常会包含 ASCII 集合之外的字符，URL 必须转换为有效的 ASCII 格式。
		URL 编码使用 "%" 其后跟随两位的十六进制数来替换非 ASCII 字符。
		URL 不能包含空格。URL 编码通常使用 + 来替换空格。

85、正向代理和反向代理

		正向代理
			我们常说的代理也就是指正向代理，正向代理的过程，它隐藏了真实的请求客户端，服务端不知道真实的客户端是谁，客户端请求的服务都被代理服务器代替来请求。
		反向代理
			这种代理模式下，它隐藏了真实的服务端，当我们向一个网站发起请求的时候，背后可能有成千上万台服务器为我们服务，具体是哪一台，我们不清楚，我们只需要知道反向代理服务器是谁就行，而且反向代理服务器会帮我们把请求转发到真实的服务器那里去，一般而言反向代理服务器一般用来实现负载平衡。

86、负载平衡的两种实现方式？
		1. 一种是使用反向代理的方式，用户的请求都发送到反向代理服务上，然后由反向代理服务器来转发请求到真实的服务器上，以此来实现集群的负载平衡。
		2. 另一种是 DNS 的方式，DNS 可以用于在冗余的服务器上实现负载平衡。因为现在一般的大型网站使用多台服务器提供服务，因此一个域名可能会对应多个服务器地址。当用户向网站域名请求的时候，DNS 服务器返回这个域名所对应的服务器 IP 地址的集合，但在每个回答中，会循环这些 IP 地址的顺序，用户一般会选择排在前面的地址发送请求。以此将用户的请求均衡的分配到各个不同的服务器上，这样来实现负载均衡。这种方式有一个缺点就是，由于 DNS 服务器中存在缓存，所以有可能一个服务器出现故障后，域名解析仍然返回的是那个 IP 地址，就会造成访问的问题。

		DNS负载均衡(DNS重定向) DNS负载均衡技术的实现原理是在DNS服务器中为同一个主机名配置多个IP地址，在应答DNS查询时， DNS服务器对每个查询将以DNS文件中主机记录的IP地址按顺序返回不同的解析结果，将客户端的访问 引导到不同的机器上去，使得不同的客户端访问不同的服务器，从而达到负载均衡的目的。

86、简述下对 webWorker 的理解？
	HTML5则提出了 Web Worker 标准，表示js允许多线程，但是子线程完全受主线程控制并且不能操作dom，只有主线程可以操作dom，所以js本质上依然是单线程语言。

