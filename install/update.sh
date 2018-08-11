#!/bin/bash
clear

echo -e "\e[92m** Update started **\e[0m"

echo -e "\e[93mDownloading pi-score-counter from GitHub...\e[0m"
rm -rf ~/pi-score-counter-download
mkdir ~/pi-score-counter-download
cd ~/pi-score-counter-download
wget "https://github.com/TheWhite147/pi-score-counter/archive/master.zip"

echo -e "\e[93mUncompressing zip file...\e[0m"
unzip master.zip -d .

echo -e "\e[93mInstalling Python part (GPIO and game logic)...\e[0m"
cp -f ~/pi-score-counter-download/pi-score-counter-master/game/*.py ~/pi-score-counter

echo -e "\e[93mInstalling PHP API...\e[0m"
sudo rm -rf /var/www/html/api
sudo mkdir /var/www/html/api
sudo cp ~/pi-score-counter-download/pi-score-counter-master/api/* /var/www/html/api

echo -e "\e[93mCreating shortcut on desktop\e[0m"
cp -f ~/pi-score-counter/start.sh /home/pi/Desktop

echo -e "\e[93mPreparing web interface...\e[0m"
rm -rf ~/pi-score-counter/web/*.*
cp -rf ~/pi-score-counter-download/pi-score-counter-master/web/* ~/pi-score-counter/web

echo -e "\e[93mCreating migration file --> Please run it if you have not!\e[0m"
cp -rf ~/pi-score-counter-download/pi-score-counter-master/install/migrate_scores_into_games.py ~/pi-score-counter

echo -e "\e[92m** Update finished! **\e[0m"