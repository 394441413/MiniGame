(() => {
    let eventList = {};
    let evmID = 0;
    let evm = () => {};

    evm.prototype.on = (name, func) => {
        if (typeof name !== "string" || typeof func !== "function") {
            cc.error("EventManager.js method on param error!");
            return;
        }
        eventList[++evmID] = [name, func, true];
        return evmID;
    };

    evm.prototype.once = (name, func) => {
        if (typeof name !== "string" || typeof func !== "function") {
            cc.error("EventManager.js method once param error!");
            return;
        }
        eventList[++evmID] = [name, func, false];
        return evmID;
    };

    //args 可以是evmID也可以是事件名
    evm.prototype.remove = (args) => {
        if (typeof args == 'string') {
            for (let i in eventList) {
                if (eventList[i][0] == args) {
                    delete(eventList[i]);
                }
            }
        } else if (typeof args == 'number') {
            if (!!eventList[args]) {
                delete(eventList[args]);
            }
        } else {
            cc.error("EventManager.js method remove param error!");
            return;
        }
    };

    evm.prototype.emit = (name, ...param) => {
        if (typeof name !== "string") {
            cc.error("EventManager.js method emit param error!");
            return;
        }

        let excuteTimes = 0;
        for (let i in eventList) {
            if (eventList[i][0] == name) {
                eventList[i][1](...param);
                if (!eventList[i][2]) {
                    delete(eventList[i]);
                }
                excuteTimes++;
            }
        }
        // cc.log("EventManager.js method emit function excute " + excuteTimes + " times!");
    }

    evm.prototype.clear = () => {
        eventList = {};
        evmID = 0;
    };

    if (typeof (window) != "undefined") {
        window.EMgr = Object.create(evm.prototype);
    }
})();