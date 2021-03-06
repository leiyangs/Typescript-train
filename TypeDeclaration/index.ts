export = {};

/* 类型声明 */
/**
 * 声明文件可以让我们不需要将JS重构为TS，只需要加上声明文件就可以使用系统
 * 类型声明在编译的时候都会被删除，不会影响真正的代码
 */

// 1.普通类型声明
declare const $: (
  selector: string
) => {
  // 函数声明，不是剪头函数
  // 变量
  click(): void;
  width(length: number): void;
};
$("#root").click();
console.log($("#root").width);
declare let name: string; // 变量
declare let age: number; // 变量
declare function getName(): string; // 方法
declare class Animal {
  name: string;
} // 类
console.log(name, age);
getName();
new Animal();

// 2.外部枚举
/**
 * 外部枚举是使用declare enum定义的枚举类型
 * 外部枚举用来描述已经存在的枚举类型的形状
 */
declare enum Seasons {
  Spring,
  Summer,
  Autumn,
  Winter
}

let seasons = [Seasons.Spring, Seasons.Summer, Seasons.Autumn, Seasons.Winter];
console.log(seasons);

// declare 定义的类型只会用于编译时的检查，编译结果中会被删除。上例的编译结果如下
/* var seasons = [
  Seasons.Spring,
  Seasons.Summer,
  Seasons.Autumn,
  Seasons.Winter
]; */

// 也可以同时使用declare 和 const 常量枚举
declare const enum Seasons1 {
  Spring,
  Summer,
  Autumn,
  Winter
}

let seasons1 = [
  Seasons1.Spring,
  Seasons1.Summer,
  Seasons1.Autumn,
  Seasons1.Winter
];

// 3.namespace
/**
 * 如果一个全局变量包括了很多子属性，可能使用namespace
 * 在声明文件中的namespace表示一个全局变量包含很多子属性
 * 在命名空间内部不需要使用 declare 声明属性或方法
 */
declare namespace $1 {
  function ajax(url: string, setting: any): void;
  let name: string;
  namespace fn {
    function extend(object: any): void;
  }
}
$1.ajax("/api/users", {});
$1.fn.extend({
  log: function(message: any) {
    console.log(message);
  }
});

// 4.类型声明文件
/**
 * 我们可以把类型声明放在一个单独的类型声明文件中
 * 可以在类型声明文件中使用类型声明
 * 文件命名规范为*.d.ts
 * 观看类型声明文件有助于了解库的使用方式
 */

// typeings/jquery.d.ts  // 在tsconfig文件中设置include
// 重点看src中的文件和types和typings的声明文件

// 5.npm声明文件可能的位置
/* node_modules/jquery/package.json
"types":"types/xxx.d.ts"
node_modules/jquery/index.d.ts
node_modules/@types/jquery/index.d.ts */

// 6.扩展全局变量的类型
interface String {
  // 1、扩展局部变量类型
  double(): string;
}
declare global {
  interface Window {
    // 2、如何扩展全局变量window的类型  有export= {} 就代表声明的是局部的,要放到global内
    myname: string;
  }
}
String.prototype.double = function() {
  return this + this;
};
console.log("hello".double());
console.log(window.myname);

// 7.合并声明 
/* 同一名称的两个独立声明会被合并成一个单一声明
合并后的声明拥有原先两个声明的特性
类既可以作为类型使用，也可以作为值使用，接口只能作为类型使用 */

// 可以通过接口合并的特性给一个第三方为扩展类型声明
// useJquery.ts 文件


// 使用命名空间扩展类
// 我们可以使用 namespace 来扩展类，用于表示内部类
class Form {
  username: Form.Item='';
  password: Form.Item='';
}
//Item为Form的内部类
namespace Form {
  export class Item {}
}
let item:Form.Item = new Form.Item();
console.log(item);


// 使用命名空间扩展函数
// 我们也可以使用 namespace 来扩展函数
function greeting(name: string): string {
  return greeting.words+name;
}

namespace greeting {
  export let words = "Hello,";
}
console.log(greeting('hehe'))

// 使用命名空间扩展枚举类型
enum Color {
  red = 1,
  yellow = 2,
  blue = 3
}

namespace Color {
  export const green=4;
  export const purple=5;
}
console.log(Color.green)


// 扩展Store
import { createStore, Store } from 'redux';
type StoreExt = Store & {
    ext: string
}
let store: StoreExt = createStore(state => state);
store.ext = 'hello';

// 生成声明文件
// 把TS编译成JS后丢失类型声明，我们可以在编译的时候自动生成一份JS文件
{
  "compilerOptions": {
     "declaration": true, /* Generates corresponding '.d.ts' file.*/
  }
}
