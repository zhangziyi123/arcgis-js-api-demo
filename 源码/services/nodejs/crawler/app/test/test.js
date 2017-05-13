/**
 * @author: zhangziyi@glondon.com
 * @description:
 * @Date: 2017/5/13 14:36
 */
// mod.js
console.log("add");
function C() {
    this.sum = 0;
    this.add = function () {
        this.sum += 1;
    };
    this.show = function () {
        console.log(this.sum);
    };
}

export let c = new C();