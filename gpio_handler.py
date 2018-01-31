import RPi.GPIO as GPIO
import time
from random import randint
import math
import dal

#######################
###  Configuration  ###
#######################

# GPIO Constants
GPIO_INPUT_P1BA = 18 # Player 1 - Button A
GPIO_INPUT_P1BB = 24 # Player 1 - Button B
GPIO_INPUT_P2BA = 22 # Player 2 - Button A
GPIO_INPUT_P2BB = 17 # Player 2 - Button B
GPIO_INPUT_RESET = 25 # Reset button

# Time Constants
BUTTON_PRESS_DELAY = 0.2 # Delay between each button press

# Game Flow
STATE_MAIN_MENU = 0
STATE_IN_GAME = 10
STATE_GAME_OVER = 20

# State of system
set_game_state(STATE_MAIN_MENU)
serving_player = 0

# Player's score
score_player_1 = 0
score_player_2  = 0

# GPIO inputs configuration
GPIO.setmode(GPIO.BCM)  
GPIO.setup(GPIO_INPUT_P1BA, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(GPIO_INPUT_P1BB, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(GPIO_INPUT_P2BA, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(GPIO_INPUT_P2BB, GPIO.IN, pull_up_down=GPIO.PUD_UP) 
GPIO.setup(GPIO_INPUT_RESET, GPIO.IN, pull_up_down=GPIO.PUD_UP)

# Main handle
def handle_button(button):
    if system_state == STATE_MAIN_MENU: # In main menu
        if button == GPIO_INPUT_P1BA:
            change_player(1)
        elif button == GPIO_INPUT_P1BB:
            select_player(1)
        elif button == GPIO_INPUT_P2BA:
            change_player(2)
        elif button == GPIO_INPUT_P2BB:
            select_player(2)

    elif system_state == STATE_IN_GAME: # In game
        if button == GPIO_INPUT_P1BA:
            change_score(1, 1)
        elif button == GPIO_INPUT_P1BB:
            change_score(1, -1)
        elif button == GPIO_INPUT_P2BA:
            change_score(2, 1)
        elif button == GPIO_INPUT_P2BB:
            change_score(2, -1)
        else
            main_menu() # Reset button

    elif system_state == STATE_GAME_OVER: # After a game
        main_menu()

    else:
        pass

########################
###  Game functions  ###
########################

def change_player(player):
    #TODO Change player

def select_player(player):
    #TODO Select player

def start_game():
    set_game_state(STATE_IN_GAME)
    serving_player = randint(1, 2)
    score_player_1 = 0
    score_player_2 = 0
    #TODO Send game to DB

def change_score(player, diff):
    if player == 1:
        score_player_1 = score_player_1 + diff
    elif player == 2:
        score_player_2 = score_player_2 + diff

    #TODO Change players score in DB

    if score_player_1 >= 10 and score_player_2 >= 10: # Overtime handling
        if math.fabs(score_player_1 - score_player_2) == 2
            end_game()
    elif score_player_1 == 11 or score_player_2 == 11: # End of the game
        end_game()
    

def end_game():
    set_game_state(STATE_GAME_OVER)
    #TODO End game in DB

def main_menu():
    set_game_state(STATE_MAIN_MENU)
    #TODO Set main menu in DB


##########################
###  Helper functions  ###
##########################

def set_game_state(state):
    system_state = state
    dal.set_game_state(state)


