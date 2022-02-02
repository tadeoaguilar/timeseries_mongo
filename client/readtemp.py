import time
import requests
from w1thermsensor import W1ThermSensor
from datetime import datetime
sensor= W1ThermSensor()
time.sleep(120)

# to change with API server address
url = 'http://192.168.2.34:3000/measures'
while True:
    now = datetime.now().isoformat()
    temperature = sensor.get_temperature()

    try:
        response = requests.post(url,json={'metadata':{'sensorId': sensor.id}, 'timestamp': now , 'temperature': temperature})
    except:
        print('error')
    print("The Temperature is " , temperature, "at ",now, "sensor id:",sensor.id)
    time.sleep(60)