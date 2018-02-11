#!/bin/bash
clear

echo -e "\e[92m** Game started! **\e[0m"

chromium-browser file:///home/pi/pi-score-counter/web/index.html --start-fullscreen &

cd ~/pi-score-counter
sudo python3 game_logic.py