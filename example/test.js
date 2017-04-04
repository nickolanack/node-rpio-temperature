

var Temperature = require('../');
(new Temperature()).on('update', function(temp){
	console.log(temp.value+' '+temp.units);
});