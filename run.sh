cd sensor
nohup python3 readSensor.py &
echo "sensor reader start success"
cd ../backend
pm2 start app.js
echo "backend server start success"
cd ../frontend/weatherStation
pm2 start "npm run dev"
echo "frontend server start success"