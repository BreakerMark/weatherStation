import Adafruit_BMP.BMP085 as BMP085
import Adafruit_DHT
import sqlite3
import time


sensor = Adafruit_DHT.DHT22
bmp = BMP085.BMP085()

# database connection
conn = sqlite3.connect('../db/thermal.db')
cursor = conn.cursor()

# sensor pin no.
pin = 23

duration = 5

while True:
    humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)
    pressure = bmp.read_pressure()
    altitude = bmp.read_altitude()
    sealevel = bmp.read_sealevel_pressure()
    if humidity is not None and temperature is not None:
        print('Temp={0:0.1f}*C Humidity={1:0.1f}%'.format(temperature, humidity))
        print('Pressure={0:0.2f} Pa Altitude={1:0.1f} m sealevel Pressure={2:0.1f} Pa'.format(pressure, altitude, sealevel))
        sql = 'insert into thermal(temperature, humidity, pressure, altitude, sealevel, create_date) values (' + str(temperature) + ',' + str(humidity) + ',' + str(pressure) + ',' + str(altitude) + ',' + str(sealevel) + ',' + str(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())) + ')'
        cursor.execute(sql)
        conn.commit()
    else:
        print('Failed to get reading, Try again')
    time.sleep(duration)
