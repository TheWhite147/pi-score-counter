########################
#######  Tests  ########
########################

reset_all()

print("Tests will start in 1 sec...")
time.sleep(1)

##################################################################################################

print("TEST 1: Change player 1 two times")
handle_button(GPIO_INPUT_P1BA)
time.sleep(1)
handle_button(GPIO_INPUT_P1BA)
time.sleep(1)

##################################################################################################

print("TEST 2: Changle player 2 four times, then set him ready")
handle_button(GPIO_INPUT_P2BA)
time.sleep(0.5)
handle_button(GPIO_INPUT_P2BA)
time.sleep(0.5)
handle_button(GPIO_INPUT_P2BA)
time.sleep(0.5)
handle_button(GPIO_INPUT_P2BA)
time.sleep(0.5)

handle_button(GPIO_INPUT_P2BB) # Player 2 ready
time.sleep(1)

print("TEST 2A: Finally, player 2 is not ready")
handle_button(GPIO_INPUT_P2BB) # Player 2 not ready
time.sleep(2)

handle_button(GPIO_INPUT_P2BA) # Changes 3 times, then ready
time.sleep(4)
handle_button(GPIO_INPUT_P2BA)
time.sleep(4)
handle_button(GPIO_INPUT_P2BA)
time.sleep(4)

handle_button(GPIO_INPUT_P2BB) # Player 2 ready
time.sleep(4)

##################################################################################################

print("TEST 3: Set player 1 ready")
handle_button(GPIO_INPUT_P1BB)
time.sleep(1)

##################################################################################################

print("TEST 3A: Test service toggle")
handle_button(GPIO_INPUT_P1BA) # 1-0 A
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 1-1 B
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 2-1 B
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 2-2 A
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 3-2 A
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 3-3 B
time.sleep(5)

print("Oups, player 2 has made a mistake... -1 his score")
handle_button(GPIO_INPUT_P2BB) # 3-2 A
time.sleep(5)

print("Finally makes his score")
handle_button(GPIO_INPUT_P2BA) # 3-3 B
time.sleep(5)

handle_button(GPIO_INPUT_P1BA) # 4-3 B
time.sleep(5)
handle_button(GPIO_INPUT_P2BA) # 4-4 A
time.sleep(5)
handle_button(GPIO_INPUT_P1BA) # 5-4 A
time.sleep(5)

print("Oups, player 1 has made a mistake... -1 his score")
handle_button(GPIO_INPUT_P1BB) # 4-4 A
time.sleep(5)

print("Oups, player 1 has made a mistake agin... -1 his score")
handle_button(GPIO_INPUT_P1BB) # 3-4 B
time.sleep(5)

print("Finally makes his score")
handle_button(GPIO_INPUT_P1BA) # 4-4 A
time.sleep(5)

##################################################################################################

print("TEST 4: Normal match")
handle_button(GPIO_INPUT_P1BA) # 1-0
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 1-1
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 2-1
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 2-2
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 3-2
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 3-3
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 4-3
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 4-4
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 5-4
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 5-5
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 6-5
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 7-5
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 8-5
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 9-5
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 10-5
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 11-5 -> Game over!

##################################################################################################

print("TEST 5: Wait 5 seconds then press any button to go back to main menu")
time.sleep(5)
handle_button(GPIO_INPUT_P1BA)

##################################################################################################

print("TEST 6: Player 1 won, so he's ready now! So player 2 will be another player. We will test if we can go back to index 0 when the selector comes at the end of the list")
time.sleep(1)
handle_button(GPIO_INPUT_P1BB) # Player 1 ready

time.sleep(1)
handle_button(GPIO_INPUT_P2BA)
time.sleep(1)
handle_button(GPIO_INPUT_P2BA)
time.sleep(1)
handle_button(GPIO_INPUT_P2BA)
time.sleep(1)
handle_button(GPIO_INPUT_P2BA)
time.sleep(1)
handle_button(GPIO_INPUT_P2BA)
time.sleep(1)
handle_button(GPIO_INPUT_P2BA)
time.sleep(1)
handle_button(GPIO_INPUT_P2BA)
time.sleep(1)
handle_button(GPIO_INPUT_P2BA)
time.sleep(1)
handle_button(GPIO_INPUT_P2BA)
time.sleep(1)
handle_button(GPIO_INPUT_P2BA)
time.sleep(1)
handle_button(GPIO_INPUT_P2BA)

time.sleep(2)
handle_button(GPIO_INPUT_P2BB) # Player 2 ready, let's start again!

##################################################################################################

print("TEST 7: We will play a normal game, but we will decrease score sometime to test that feature")
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 1-0
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 2-0
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 3-0
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 4-0
time.sleep(1)
handle_button(GPIO_INPUT_P1BB) # 3-0 -> Let's decrease!
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 4-0
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 5-0
time.sleep(1)
handle_button(GPIO_INPUT_P1BB) # 4-0 -> Let's decrease!
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 4-1
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 4-2
time.sleep(1)
handle_button(GPIO_INPUT_P2BB) # 4-1 -> Let's decrease!
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 4-2
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 4-3
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 4-4
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 4-5
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 4-6
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 4-7
time.sleep(1)
handle_button(GPIO_INPUT_P2BB) # 4-6 -> Let's decrease!
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 4-7
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 4-8
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 4-9
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 4-10
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 4-11 -> Game over!

##################################################################################################

print("TEST 8: Wait 5 seconds then press any button to go back to main menu")
time.sleep(5)
handle_button(GPIO_INPUT_P1BA)

##################################################################################################

print("TEST 9: Overtime game")
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 1-0
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 2-0
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 3-0
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 4-0
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 5-0
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 6-0
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 7-0
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 8-0
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 9-0
time.sleep(1)

time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 9-1
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 9-2
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 9-3
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 9-4
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 9-5
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 9-6
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 9-7
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 9-8
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 9-9
time.sleep(1)

time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 10-9
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 10-10 -> Now in overtime

time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 11-10
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 11-11

time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 12-11
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 12-12

time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 13-12
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 14-12 -> Game over!

##################################################################################################

print("TEST 10: Wait 5 seconds then press any button to go back to main menu")
time.sleep(5)
handle_button(GPIO_INPUT_P2BB)

##################################################################################################

print("TEST 11: Overtime with decreasing score")
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 1-0
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 2-0
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 3-0
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 4-0
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 5-0
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 6-0
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 7-0
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 8-0
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 9-0
time.sleep(1)

time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 9-1
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 9-2
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 9-3
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 9-4
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 9-5
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 9-6
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 9-7
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 9-8
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 9-9
time.sleep(1)

time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 10-9
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 10-10 -> Now in overtime

time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 11-10
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 11-11

time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 12-11
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 12-12
time.sleep(1)
handle_button(GPIO_INPUT_P2BB) # 12-11 -> Let's decrease!
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 12-12

time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 13-12
time.sleep(1)
handle_button(GPIO_INPUT_P1BB) # 12-12 -> Let's decrease!
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 13-12
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 14-12 -> Game over!

#################################################################################################

print("TEST 12: Wait 5 seconds then press any button to go back to main menu")
time.sleep(5)
handle_button(GPIO_INPUT_P1BB)

#################################################################################################

print("TEST 13: Start a game then reset, then start another game")
handle_button(GPIO_INPUT_P1BA) # 1-0
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 1-1
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 2-1
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 2-2
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 3-2
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 3-3
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 4-3
time.sleep(1)

handle_button(GPIO_INPUT_RESET) # -> Reset!

handle_button(GPIO_INPUT_P1BA) # Select new player 1
time.sleep(1)
handle_button(GPIO_INPUT_P1BA)
time.sleep(1)

handle_button(GPIO_INPUT_P2BA) # Select new player 2
time.sleep(0.5)
handle_button(GPIO_INPUT_P2BA)
time.sleep(0.5)
handle_button(GPIO_INPUT_P2BA)
time.sleep(0.5)
handle_button(GPIO_INPUT_P2BA)
time.sleep(0.5)

handle_button(GPIO_INPUT_P2BB) # Player 2 ready
time.sleep(1)

handle_button(GPIO_INPUT_P1BB) # Player 1 ready
time.sleep(1)

# Start new match
handle_button(GPIO_INPUT_P1BA) # 1-0
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 1-1
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 2-1
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 2-2
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 3-2
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 3-3
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 4-3
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 4-4
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 5-4
time.sleep(1)
handle_button(GPIO_INPUT_P2BA) # 5-5
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 6-5
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 7-5
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 8-5
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 9-5
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 10-5
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 11-5 -> Game over!

#################################################################################################

print("TEST 14: Wait 5 seconds then press any button to go back to main menu")
time.sleep(5)
handle_button(GPIO_INPUT_P1BB)

#################################################################################################

print("TEST 15: Shutout")
handle_button(GPIO_INPUT_P1BA) # 1-0
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 2-0
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 3-0
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 4-0
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 5-0
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 6-0
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 7-0
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 8-0
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 9-0
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 10-0
time.sleep(1)
handle_button(GPIO_INPUT_P1BA) # 11-0 -> Game over!
time.sleep(5)

handle_button(GPIO_INPUT_P2BA) # Return to main menu
