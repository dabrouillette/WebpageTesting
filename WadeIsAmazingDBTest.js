

var Testing = (function(){
    var urlLength;
    var count = 0;

    return {
        scraper: function(){
            if( count < urlLength ){
                newwindow = window.open(url[count]);
                newwindow.window.addEventListener('load', function(){
                    console.log(url[count]);
                    console.log('Element: ' + newwindow.document.getElementById('sku'));
                    console.log('Display: ' + !newwindow.document.getElementById('sku').style["display"]);
                    console.log('Sku: ' + newwindow.document.getElementById('sku').textContent);
                    count++;
                    scraper();
                });
            }
        }
        setupTest: function(urlList){
            url = urlList;
            ulrLength = urlList.length;
        },
        runTest: function(){
            scraper();
        }
    };
})();


var list = ['http://dev.store.graphicproducts.com/en-us/spill-control-and-containment/absorbents/hazmat-absorbents/haz-weave-rolls',
             'http://dev.store.graphicproducts.com/en-us/spill-control-and-containment/absorbents/hazmat-socks-booms/haz-socks?variation=HS8304-30',
             'http://dev.store.graphicproducts.com/en-us/spill-control-and-containment/absorbents/hazmat-socks-booms/haz-socks?variation=HS8304-10'];

Testing.setupTest(list);
Testing.scraper();
