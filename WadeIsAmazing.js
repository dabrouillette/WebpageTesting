
var urlList = ['http://dev.store.graphicproducts.com/en-us/spill-control-and-containment/absorbents/hazmat-absorbents/haz-weave-rolls',
             'http://dev.store.graphicproducts.com/en-us/spill-control-and-containment/absorbents/hazmat-socks-booms/haz-socks?variation=HS8304-30',
             'http://dev.store.graphicproducts.com/en-us/spill-control-and-containment/absorbents/hazmat-socks-booms/haz-socks?variation=HS8304-10'];
var urlLength = urlList.length;
var count = 0;
var newwindow;

function outputResult(text){
    var elm = document.createElement('p');
    var content = document.createTextNode(text);
    elm.appendChild(content);
    document.body.appendChild(elm);
}

function scraper(){
    if( count < urlLength ){
        newwindow = window.open(urlList[count]);
        newwindow.window.addEventListener('load', function(){
            outputResult(urlList[count]);
            outputResult('Element: ' + newwindow.document.getElementById('sku'));
            outputResult('Display: ' + !newwindow.document.getElementById('sku').style["display"]);
            outputResult('Sku: ' + newwindow.document.getElementById('sku').textContent);
            count++;
            scraper();
        });
    }
};

function runTest(){
    newwindow = window.open('http://dev.store.graphicproducts.com');
    newwindow.window.addEventListener('load',function(){
        scraper();
    });
}

var button = document.getElementById('startTestBtn');
button.addEventListener('click',function(){
    runTest();
});
