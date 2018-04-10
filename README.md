# node-rpio-temperature
Nodejs temperature sensor for rasberry pi

Assumes you have preconfigured your rpi for 1-WIRE temperature sensor on GPIO4 (using DS18B20)



EDIT: you can enable 1-Wire by using raspi-config:

```
sudo raspi-config

 	# 5 Interfacing Options 
	# P7 1-Wire 
	# (Enable)

```

here is another guide (for python but the setup is the same)
https://www.modmypi.com/blog/ds18b20-one-wire-digital-temperature-sensor-and-the-raspberry-pi

```
echo "dtoverlay=w1-gpio" >> /boot/config.txt 
#reboot

sudo modprobe w1-gpio
sudo modprobe w1-therm
```
Example
```
git clone https://github.com/nickolanack/node-rpio-temperature.git
cd node-rpio-temperature
nodejs example/test.js 

#output example
# Found Device: 10-0008002e03b9
# 11.1 °C
# 11.0 °C
# 11.1 °C
# 11.0 °C
# 10.9 °C
# 11.0 °C

```

Library Usage
```js

var Temperature = require('node-rpio-temperature');
(new Temperature()).on('update', function(temp){
	console.log(temp.value+' '+temp.units);
});

```


Test/Mock Usage
```js

var Temperature = require('node-rpio-temperature');
(new Temperature.Mock([{device:"device-1"}, {device:"device-1"}/*, ... more */])).on('update', function(temp){
	console.log(temp.value+' '+temp.units);
});

```
