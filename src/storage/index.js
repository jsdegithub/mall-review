
const STORAGE_KEY = 'mimall';
export default {
    setItem(key, value, module) {
        if (module) {
            let val = this.getItem(module) || {};
            val[key] = value;
            this.setItem(module, val);
        }
        else {
            let val = this.getStorage();
            val[key] = value;
            window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
        }
    },
    getItem(key, module) {
        if (module) {
            let val = this.getItem(module) || {};
            //此处若不设置默认值{}，那么当val为undefined时，val[key]会报错
            return val[key];
        }
        return this.getStorage()[key];  //不应该在此处设置默认值{}
    },
    getStorage() {
        return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}');
    },
    clear(key, module) {
        let val = this.getStorage();
        if (module) {
            delete val[module][key];
        }
        else {
            delete val[key];
        }
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    }
}