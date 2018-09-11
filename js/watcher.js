// watcher.js
// date: 2018/9/9
// maxiaodong

class Watcher {
    constructor(vm, exp, cb) {
        this.vm = vm;
        this.exp = exp;
        this.cb = cb;
        this.value = this.get(); //将自己添加到订阅器
    }

    update() {
        this.run();
    }
    run() {
        const value = this.vm.data[this.exp];
        const oldVal = this.value;
        if(value !== oldVal){
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    }
    get() {
        Dep.target = this; //缓存自己
        const value = this.vm.data[this.exp]; // 强制执行监听器里面的get函数
        Dep.target = null; //释放
        return value;
    }
}
