import RPi.GPIO as GPIO
import time

# GPIO Constants
GPIO_INPUT_P1BA = 18 # Player 1 - Button A
GPIO_INPUT_P1BB = 24 # Player 1 - Button B
GPIO_INPUT_P2BA = 22 # Player 2 - Button A
GPIO_INPUT_P2BB = 17 # Player 2 - Button B
GPIO_INPUT_RESET = 25 # Reset button

# Time Constants
BUTTON_PRESS_DELAY = 0.2 # Delay between each button press

# Game flow
STATE_MAIN_MENU = 0
STATE_IN_GAME = 10
STATE_GAME_OVER = 20

# GPIO inputs configuration
GPIO.setmode(GPIO.BCM)  
GPIO.setup(GPIO_INPUT_P1BA, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(GPIO_INPUT_P1BB, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(GPIO_INPUT_P2BA, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(GPIO_INPUT_P2BB, GPIO.IN, pull_up_down=GPIO.PUD_UP) 
GPIO.setup(GPIO_INPUT_RESET, GPIO.IN, pull_up_down=GPIO.PUD_UP)