import time
import requests
from w1thermsensor import W1ThermSensor
from datetime import datetime
sensor= W1ThermSensor()
time.sleep(120)


while True:
    now = datetime.now().isoformat()
    temperature = sensor.get_temperature()
    #current_time = now.strftime("%Y-%M %H:%M:%S")
    #data= { 'sensorId': sensor.id, 'timestamp': now , 'temp': temperature}
    try:
        response = requests.post('http://192.168.2.34:3000/',json={'metadata':{'sensorId': sensor.id}, 'timestamp': now , 'temperature': temperature})
    except:
        print('error')
    print("The Temperature is " , temperature, "at ",now, "sensor id:",sensor.id)
    time.sleep(60)