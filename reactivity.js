let activeEffect;

const watchEffect = fn => {
    activeEffect = fn;
    fn();
    activeEffect = null;
}

class Dependency {
    constructor() {
        this.subscribes = new Set();
    }

    depend() {
        activeEffect && this.subscribes.add(activeEffect);
    }

    notify() {
        this.subscribes.forEach(sub => sub());
    }
}
const reactive = obj => {
    Object.keys(obj).forEach(key => {
        const dep = new Dependency();
        let value = obj[key];

        Object.defineProperty(obj, key, {
            get() {
                dep.depend(); return value;
            },
            set(newValue) {
                if (newValue !== value) { value = newValue; dep.notify(); }
            }
        });
    });
    return obj;
};
