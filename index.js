



var events=require('events');
var exec=require('child_process').exec;
function TemperatureSensor(){
   var me=this;
   events.EventEmitter.call(me);
   me._getDevices();

};

TemperatureSensor.prototype.__proto__=events.EventEmitter.prototype;

TemperatureSensor.prototype._getDevices=function(){
	
	var me=this;
	exec('ls /sys/bus/w1/devices/', function (error, stdout, stderr) {
 	
		if(error){
			throw error;
		}

		(stdout.split("\n")).forEach(function(name){

			if(!isNaN(parseInt(name))){
				console.log('Found Device: '+name);
				setInterval(function(){

					me._checkTemperature(name);

				}, 5000);


				setTimeout(function(){ me._checkTemperature(name); }, 100);

			}

			

		});


	});

};

TemperatureSensor.prototype._checkTemperature=function(name){
	var me=this;
	
	exec('cat /sys/bus/w1/devices/'+name+'/w1_slave', function (error, stdout, stderr) {

		if(error){
			throw error;
		}

		var value=(Math.round(parseInt(stdout.split('t=')[1])/100.0)/10.0)+"";
		if(value.indexOf('.')<0){
			value+='.0';
		}

		if(me["_"+name]!==value){
			me.emit('update', {value:value, units:'°C', device:name});
			me["_"+name]=value;
		}

	});

}





TemperatureSensor.Mock=function(devices){

	 var me=this;
   	 events.EventEmitter.call(me);
   	 me._devices=devices;
   	 me._getDevices();
}

TemperatureSensor.Mock.prototype.__proto__=events.EventEmitter.prototype;

TemperatureSensor.Mock.prototype._getDevices=function(){
	
	var me=this;


	me._devices.forEach(function(device){

	
		console.log('Mock Device: '+device.device);
		setInterval(function(){
			me._checkTemperature(device.device);
		}, 5000);

		setTimeout(function(){ me._checkTemperature(device.device); }, 100);

		

	});


	

};

TemperatureSensor.Mock.prototype._checkTemperature=function(name){
	var me=this;
	
	var fluctuate=[0,0,0,0,0,0.1,0.2,0.3,-0.1,-0.2,-0.3]
	var value=(25.0+fluctuate[Math.floor(Math.random()*fluctuate.length)])+"";
	if(value.indexOf('.')<0){
		value+='.0';
	}

	if(me["_"+name]!==value){
		me.emit('update', {value:value, units:'°C', device:name});
		me["_"+name]=value;
	}


}




module.exports=TemperatureSensor;

// (new TemperatureSensor()).on('update', function(temp){
// 	console.log(temp.value+' '+temp.units);
// });