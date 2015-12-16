// List of URLs to check
// will need to replace with scalable method supporting ~90,000 rows

//## Resources #####################################################################################
// http://www.html5rocks.com/en/tutorials/file/dndfiles/
// http://stackoverflow.com/questions/13090754/how-do-i-create-an-element-in-the-chrome-dev-tools
// http://www.aspsnippets.com/Articles/Read-Parse-and-display-CSV-Text-file-using-JavaScript-jQuery-and-HTML5.aspx
//##################################################################################################

/*
// Creating a file loading element
// http://www.html5rocks.com/en/tutorials/file/dndfiles/
<div class="example">
  <input type="file" id="files1" name="files1[]" multiple>
  <output id="file_list"></output>
  <script>
	  function handleFileSelect(evt) {
	  var files = evt.target.files; // FileList object
	  // files is a FileList of File objects. List some properties.
	  var output = [];
	  for (var i = 0, f; f = files[i]; i++) {
	      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
	                  f.size, ' bytes, last modified: ',
	                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
	                  '</li>');
	  }
	  document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
	}
	document.getElementById('files').addEventListener('change', handleFileSelect, false);
  </script>
</div>
*/

/*
// Creating a new element with javascript
// http://stackoverflow.com/questions/13090754/how-do-i-create-an-element-in-the-chrome-dev-tools
var child = document.createElement('div');
var parent = document.getElementByClassName('parent');
parent.appendChild(child);
*/


var url = ['http://stage.store.graphicproducts.com/en-us/spill/spill-kits/spill-kits-portable-kits/Trucker-Spill-Kit?variation=SKH-TRK',
'http://stage.store.graphicproducts.com/en-us/spill/spill-kits/spill-kits-portable-kits/Trucker-Spill-Kit?variation=SKO-TRK',
'http://stage.store.graphicproducts.com/en-us/spill/spill-kits/spill-kits-portable-kits/Trucker-Spill-Kit?variation=SKU-TRK'];

var urlLength = url.length; 		// could be from 1 to 100,000
var count = 0; 
SafeBox = window.localStorage; 		// Saves results to local storage of the main window. MUST BE RUN from a GP page!

EvenWindow = window.open(url[0]); 	// initialize and close windows
OddWindow = window.open(url[1]);
EvenWindow.close();
OddWindow.close();

// Not all elements are finished loading by the time the 'load' eventListener fires
// To get around this, the first window is checked after the second window's 'load' event is triggered
// WHen the last url is opened, it is opened once more in a second window to get the final result

// Create a linked recursive function to open a window and check the results of the previous window
// Could be accomplished with one function and if statements, but this felt more 'readable' 
function EvenWindowScraper() { // Even count, post current results and last results
	if( count < urlLength ){
		EvenWindow = window.open(url[count]);
		EvenWindow.window.addEventListener('load', function(){
			//console.log(count + ' Display: ' + !EvenWindow.document.getElementById('sku').style["display"] + ',' + url[count]);
			//SafeBox.setItem(url[count],'Display: ' + !EvenWindow.document.getElementById('sku').style["display"] );
			if (count != 0){
				console.log(count-1 + ' Display: ' + !OddWindow.document.getElementById('sku').style["display"] + ',' + url[count-1]);
				SafeBox.setItem(url[count-1],'Display: ' + !OddWindow.document.getElementById('sku').style["display"] );
				OddWindow.close();
			}
			count++;
			// scraper();  // Recursion to 'force' eventlistener to resolve before the next cycle
			OddWindowScraper(); // Links recursivly to OddWindowScraper
		});
	} else if (count = urlLength){LastCall();} // Runs the last page again, but only checks the status of it once
}
function OddWindowScraper() {// Odd count
	if( count < urlLength ){
		OddWindow = window.open(url[count]);
		OddWindow.window.addEventListener('load', function(){
			//console.log(count + ' Display: ' + !OddWindow.document.getElementById('sku').style["display"] + ',' + url[count]);
			//SafeBox.setItem(url[count],'Display: ' + !OddWindow.document.getElementById('sku').style["display"] );
			console.log(count-1 + ' Display: ' + !EvenWindow.document.getElementById('sku').style["display"] + ',' + url[count-1]);
			SafeBox.setItem(url[count-1],'Display: ' + !EvenWindow.document.getElementById('sku').style["display"] );
			EvenWindow.close();
			count++;
			// scraper();  // Recursion to 'force' eventlistener to resolve before the next cycle
			EvenWindowScraper();  // Links recursivly to EvenWindowScraper
		});
	} else if (count = urlLength){LastCall();}
}
// Open the last window again, and check the final result from the first
function LastCall() {
	if (urlLength % 2 == 1){
		OddWindow = window.open(url[count-1]);
		OddWindow.window.addEventListener('load', function(){
			console.log(count-1 + ' Display: ' + !EvenWindow.document.getElementById('sku').style["display"] + ',' + url[count-1]);
			SafeBox.setItem(url[count-1],'Display: ' + !EvenWindow.document.getElementById('sku').style["display"] );
			EvenWindow.close();
			OddWindow.close();
		});
	} else {
		EvenWindow = window.open(url[count-1]);
		EvenWindow.window.addEventListener('load', function(){
			console.log(count + ' Display: ' + !OddWindow.document.getElementById('sku').style["display"] + ',' + url[count]);
			SafeBox.setItem(url[count],'Display: ' + !OddWindow.document.getElementById('sku').style["display"] );
			OddWindow.close();
			EvenWindow.close();
		});
	}
}

// Must start with EvenWindow Scraper. 
EvenWindowScraper(); // Does not support length of zero!


/// Add function for closing!!!!!!!!!!!!!!!!!!!!!!


