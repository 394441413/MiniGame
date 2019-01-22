(() => {
    let net = () => { };
    
    if (typeof (window) != "undefined") {
        window.Net = Object.create(net.prototype);
    }
})();