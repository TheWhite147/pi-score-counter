#!/bin/bash
clear

echo -e "\e[92m** Game started! **\e[0m"

chromium-browser file:///home/pi/pi-score-counter/web/index.html --start-fullscreen &
sudo python3 ~/pi-score-counter/game_logic.py