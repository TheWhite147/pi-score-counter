#!/bin/bash
clear

echo -e "\e[92m** Installation started **\e[0m"

echo -e "\e[93mMaking sure the Pi is updated...\e[0m"
sudo apt-get update -y
sudo apt-get upgrade -y

echo -e "\e[93mInstalling Apache Web Server...\e[0m"
sudo apt-get install apache2 -y

echo -e "\e[93mInstalling PHP...\e[0m"
sudo apt-get install php -y

echo -e "\e[93mInstalling php-sqlite...\e[0m"
sudo apt-get install php-sqlite3 -y

echo -e "\e[93mDownloading pi-score-counter from GitHub...\e[0m"
rm -rf ~/pi-score-counter-download
mkdir ~/pi-score-counter-download
cd ~/pi-score-counter-download
wget "https://github.com/TheWhite147/pi-score-counter/archive/master.zip"

echo -e "\e[93mUncompressing zip file...\e[0m"
unzip master.zip -d .

echo -e "\e[93mInstalling Python part (GPIO and game logic)...\e[0m"
rm -rf ~/pi-score-counter
mkdir ~/pi-score-counter
cp ~/pi-score-counter-download/pi-score-counter-master/game/* ~/pi-score-counter

echo -e "\e[93mCreating and initializing database...\e[0m"
cd ~/pi-score-counter
rm -f pi-score-counter.db
touch pi-score-counter.db
cp ~/pi-score-counter-download/pi-score-counter-master/install/initialize_db.py ~/pi-score-counter
sudo python3 ~/pi-score-counter/initialize_db.py

echo -e "\e[93mSeeding players...\e[0m"
cp ~/pi-score-counter-download/pi-score-counter-master/install/seed_players.py ~/pi-score-counter
sudo python3 ~/pi-score-counter/seed_players.py

echo -e "\e[93mInstalling PHP API...\e[0m"
sudo rm -rf /var/www/html/api
sudo mkdir /var/www/html/api
sudo cp ~/pi-score-counter-download/pi-score-counter-master/api/* /var/www/html/api

echo -e "\e[93mCreating shortcut on desktop\e[0m"
cp -f ~/pi-score-counter/start.sh /home/pi/Desktop

echo -e "\e[93mPreparing web interface...\e[0m"
mkdir ~/pi-score-counter/web
cp -rf ~/pi-score-counter-download/pi-score-counter-master/web/* ~/pi-score-counter/web

echo -e "\e[101mYOU MUST REBOOT YOUR RASPBERRY PI NOW!\e[0m"

echo -e "\e[92m** Installation finished! **\e[0m"