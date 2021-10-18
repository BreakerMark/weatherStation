cd backend
echo "start install backend node modules"
npm i
echo "backend node modules install finished"
cd ../frontend/weatherStation
echo "start install frontend node modules"
npm i
echo "frontend node modules install finished"
cd ../..
echo "start install pm2"
npm i 
echo "pm2 install finished"