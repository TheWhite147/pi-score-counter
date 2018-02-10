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




#########################
###  State of system  ###
#########################

# Variables
system_state = STATE_MAIN_MENU

# Functions
def set_game_state(state):
    global system_state

    system_state = state
    dal.set_game_state(state)

# Initial set
set_game_state(STATE_MAIN_MENU)




######################
###  Players info  ###
######################

# Variables
id_player_1 = 0
id_player_2 = 0
id_serving_player = 0
score_player_1 = 0
score_player_2  = 0
ids_players = dal.get_all_player_ids()
index_player_1 = 0
index_player_2 = 0

# Functions
def set_player_1(id_player):
    global id_player_1

    id_player_1 = id_player
    dal.set_player_1(id_player)

def set_player_2(id_player):
    global id_player_2

    id_player_2 = id_player
    dal.set_player_2(id_player)

def set_serving_player(id_player):
    global id_serving_player

    id_serving_player = id_player
    dal.set_serving_player(id_player)


def select_next_player_1():
    global index_player_1

    if (index_player_1 == len(ids_players) - 1):
        index_player_1 = 0
    else:
        index_player_1 = index_player_1 + 1

    set_player_1(ids_players[index_player_1])


def select_next_player_2():
    global index_player_2

    if (index_player_2 == len(ids_players) - 1):
        index_player_2 = 0
    else:
        index_player_2 = index_player_2 + 1

    set_player_2(ids_players[index_player_2])

# Initial set
if len(ids_players) >= 2:
    set_player_1(ids_players[0])
    set_player_2(ids_players[0])



#######################
###  State of game  ###
#######################

# Variables
id_game = 0
ready_player_1 = False
ready_player_2 = False
is_overtime = False

# Functions
def set_ready_player_1(ready):
    global ready_player_1

    if ready and id_player_1 == id_player_2:
        print("WARNING: CAN'T PLAY WITH SAME PLAYERS")
        return

    ready_player_1 = ready
    dal.set_ready_player_1(ready)

def set_ready_player_2(ready):
    global ready_player_2

    if ready and id_player_1 == id_player_2:
        print("WARNING: CAN'T PLAY WITH SAME PLAYERS")
        return

    ready_player_2 = ready
    dal.set_ready_player_2(ready)

def set_score_player_1(score):
    global score_player_1

    score_player_1 = score
    dal.set_score_player_1(score)

def set_score_player_2(score):
    global score_player_2
    
    score_player_2 = score
    dal.set_score_player_2(score)

def reset_all():
    global id_game, is_overtime
    
    id_game = 0
    set_ready_player_1(False)
    set_ready_player_2(False)    
    set_score_player_1(0)
    set_score_player_2(0)
    is_overtime = False
    

# Initial set
set_ready_player_1(False)
set_ready_player_2(False)



##############
###  GPIO  ###
##############

# GPIO inputs configuration
GPIO.setmode(GPIO.BCM)  
GPIO.setup(GPIO_INPUT_P1BA, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(GPIO_INPUT_P1BB, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(GPIO_INPUT_P2BA, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(GPIO_INPUT_P2BB, GPIO.IN, pull_up_down=GPIO.PUD_UP) 
GPIO.setup(GPIO_INPUT_RESET, GPIO.IN, pull_up_down=GPIO.PUD_UP)

########################
###  Game functions  ###
########################

def start_game():
    global serving_player_number, score_player_1, score_player_2, id_game

    set_game_state(STATE_IN_GAME)
    serving_player_number = randint(1, 2)
    score_player_1 = 0
    score_player_2 = 0

    set_serving_player(id_player_1 if serving_player_number == 1 else id_player_2)

    id_game = dal.start_new_game(id_player_1, id_player_2)

def change_score(player, score):
    global score_player_1, score_player_2, is_overtime

    if player == 1:
        set_score_player_1(score_player_1 + score)
        dal.add_score_player_1(id_game, id_serving_player, score)
    elif player == 2:
        set_score_player_2(score_player_2 + score)
        dal.add_score_player_2(id_game, id_serving_player, score)

    is_overtime = score_player_1 >= 10 and score_player_2 >= 10 # Overtime handling     
    
    if is_overtime:
        if math.fabs(score_player_1 - score_player_2) == 2:
            end_game()
            return
    elif score_player_1 == 11 or score_player_2 == 11: # End of the game
        end_game()
        return
    
    # Toggle serving player
    if is_overtime:
        toggle_serving_player()
    elif (score_player_1 + score_player_2) % 2 == 0:
        toggle_serving_player()
            
    
def toggle_serving_player():
    if id_serving_player == id_player_1:
        set_serving_player(id_player_2)
    else:
        set_serving_player(id_player_1)

def end_game():
    set_game_state(STATE_GAME_OVER)
    
def main_menu():
    set_game_state(STATE_MAIN_MENU)
    reset_all()



##########################
###  SCRIPT EXECUTION  ###
##########################

# Main handle
def handle_button(button):

    if system_state == STATE_MAIN_MENU: # In main menu
        if button == GPIO_INPUT_P1BA:
            print("Player 1 - Next player")
            select_next_player_1()
        elif button == GPIO_INPUT_P1BB:
            print("Player 1 - Player ready")
            set_ready_player_1(True)
        elif button == GPIO_INPUT_P2BA:
            print("Player 2 - Next player")
            select_next_player_2()
        elif button == GPIO_INPUT_P2BB:
            print("Player 2 - Player ready")
            set_ready_player_2(True)

        if ready_player_1 and ready_player_2: # Both players are ready, let's start!
            print("--> Game started!")
            start_game()

    elif system_state == STATE_IN_GAME: # In game
        if button == GPIO_INPUT_P1BA:
            print("Player 1 - Set score +1")
            change_score(1, 1)
        elif button == GPIO_INPUT_P1BB:
            print("Player 1 - Set score -1")
            change_score(1, -1)
        elif button == GPIO_INPUT_P2BA:
            print("Player 2 - Set score +1")
            change_score(2, 1)
        elif button == GPIO_INPUT_P2BB:
            print("Player 2 - Set score -1")
            change_score(2, -1)
        else:
            print("Reset button pressed")
            main_menu() # Reset button

    elif system_state == STATE_GAME_OVER: # After a game
        print("Any button pressed after game -> Go to main menu")
        main_menu()

    else:
        pass


print("Waiting for GPIO input...")
while True:
    input_state_P1BA = GPIO.input(GPIO_INPUT_P1BA)
    input_state_P1BB = GPIO.input(GPIO_INPUT_P1BB)
    input_state_P2BA = GPIO.input(GPIO_INPUT_P2BA)
    input_state_P2BB = GPIO.input(GPIO_INPUT_P2BB)
    input_state_RESET = GPIO.input(GPIO_INPUT_RESET)

    if input_state_P1BA == False:
        handle_button(GPIO_INPUT_P1BA)
        time.sleep(BUTTON_PRESS_DELAY)

    if input_state_P1BB == False:
        handle_button(GPIO_INPUT_P1BB)
        time.sleep(BUTTON_PRESS_DELAY)

    if input_state_P2BA == False:
        handle_button(GPIO_INPUT_P2BA)
        time.sleep(BUTTON_PRESS_DELAY)

    if input_state_P2BB == False:
        handle_button(GPIO_INPUT_P2BB)
        time.sleep(BUTTON_PRESS_DELAY)

    if input_state_RESET == False:
        handle_button(GPIO_INPUT_RESET)
        time.sleep(BUTTON_PRESS_DELAY)