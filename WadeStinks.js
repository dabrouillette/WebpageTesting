


var WadeStinks = (function(){
    var iSwear;
    var testWindow;
    var currentUrl;
    var urlList = ['http://dev.store.graphicproducts.com/en-us/spill-control-and-containment/absorbents/hazmat-socks-booms/haz-socks?variation=HS8304-30','http://dev.store.graphicproducts.com/en-us/spill-control-and-containment/absorbents/hazmat-socks-booms/haz-socks?variation=HS8304-10'];

    function newWindow(url) {
        testWindow = window.open(url);
    };

    function runTest() {

    };

    function checkSku(){
        var sku  =  testWindow.document.getElementById('sku');
        currentUrl = testWindow.window.location.href;
        if(!sku.style["display"] === true){
            localStorage.setItem(testWindow.window.location.href, ':passed');
        } else if(!sku.style["display"] === false){
            localStorage.setItem(testWindow.window.location.href, ':failed');
        }
    };


    function getResults(){
        var test = localStorage.getItem(urlList[i]);
        console.log('%c' + urlList[i] + test, "color: white; background-color:green;");
    };

    function makePromise(url) {
        iSwear = new Promise(function(resolve,reject){
            if(localStorage.getItem(currentUrl)){
                resolve();
            } else {
                reject(console.log("It didn't work. Lame"));
            }
        })
    };

    for(var i = 0; i < urlList.length; i++){
        testWindow.window.location.href = urlList[i];
        testWindow.window.onload = function() {
            runTest();
            testWindow.setTimeout(getResults, 15000);
        }
    }


    wadestinks = {

    };

    return wadestinks;

})();



    testWindow =
    var urlList =

    function runTest() {

        }
    };
