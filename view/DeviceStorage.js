import React, {  AsyncStorage } from 'react-native';

class DeviceStorage {
    static get(key) {
        return AsyncStorage.getItem(key).then((value) => {
            const jsonValue = JSON.parse(value)
            return jsonValue;
        })
    }

    static save(key,value) {
        return AsyncStorage.setItem(key, JSON.stringify(value),
        (error)=>{
            if (error) {
                alert("存值失败");
            } else {
                alert("存值成功");
            }
        });
    }

    static update(key, value) {
        return DeviceStorage.get(key).then((item) => {
            value = typeof value === 'string' ? value : Object.assign({}, item, value);
            return AsyncStorage.setItem(key, JSON.stringify(value));
        });
    }

    static delete(key) {
        return AsyncStorage.removeItem(key);
    }

    static clear() {
        AsyncStorage.clear(function(err){
          if(!err){
            alert('存储的数据已清除完毕!');
          }
        });
    }
}

export default DeviceStorage;