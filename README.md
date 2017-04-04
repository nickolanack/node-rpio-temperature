# node-rpio-temperature
Nodejs temperature sensor for rasberry pi

Assumes you have preconfigured your rpi for 1-WIRE temperature sensor on GPIO4 (using DS18B20)

here is another guide (for python but the setup is the same)
https://www.modmypi.com/blog/ds18b20-one-wire-digital-temperature-sensor-and-the-raspberry-pi

```
echo "dtoverlay=w1-gpio" >> /boot/config.txt 
#reboot

sudo modprobe w1-gpio
sudo modprobe w1-therm
```
