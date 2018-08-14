import sqlite3
import time

##########################
###  Public functions  ###
##########################

def start_new_game(id_player_1, id_player_2):
    game_id = __db_create_new_game(id_player_1, id_player_2)
    return game_id

def get_player_1():
    return __db_get_ui_control('ACTIVE_PLAYER_1')

def set_player_1(id_player):
    __db_update_ui_control('ACTIVE_PLAYER_1', id_player)

def get_player_2():
    return __db_get_ui_control('ACTIVE_PLAYER_2')

def set_player_2(id_player): 
    __db_update_ui_control('ACTIVE_PLAYER_2', id_player)

def set_game_state(state):
    __db_update_ui_control('STATE', state)

def set_serving_player(id_player):
    __db_update_ui_control('SERVING_PLAYER', id_player)

def add_score_player_1(id_game, id_serving_player, score):
    __db_add_score(id_game, id_serving_player, score, 0)

def add_score_player_2(id_game, id_serving_player, score):
    __db_add_score(id_game, id_serving_player, 0, score)

def set_score_player_1(score):
    __db_update_ui_control('SCORE_PLAYER_1', score);

def set_score_player_2(score):
    __db_update_ui_control('SCORE_PLAYER_2', score);

def set_ready_player_1(ready):
    __db_update_ui_control('READY_PLAYER_1', '1' if ready == True else '0')

def set_ready_player_2(ready):
    __db_update_ui_control('READY_PLAYER_2', '1' if ready == True else '0')

def get_all_player_ids():
    ids = __db_get_all_player_ids()
    return ids





####################################
###  Private database functions  ###
####################################

DATABASE_NAME = 'pi-score-counter.db'

def __db_create_new_game(id_player_1, id_player_2):
    conn = sqlite3.connect(DATABASE_NAME)
    c = conn.cursor()
    c.execute('INSERT INTO games (id_player_1, id_player_2, created_date) VALUES (?, ?, ?)', [id_player_1, id_player_2, time.time()])
    conn.commit()
    conn.close() 
    return c.lastrowid

def __db_get_ui_control(key):
    conn = sqlite3.connect(DATABASE_NAME)
    c = conn.cursor()
    c.execute('SELECT value FROM ui_controls WHERE key = ?', key)
    conn.commit()
    conn.close()
    return c.fetchone()

def __db_update_ui_control(key, value):
    conn = sqlite3.connect(DATABASE_NAME)
    c = conn.cursor()
    c.execute('UPDATE ui_controls SET value = ?, modified_date = ? WHERE key = ?', [str(value), time.time(), key])
    conn.commit()
    conn.close()

def __db_add_score(id_game, id_serving_player, score_player_1, score_player_2):
    conn = sqlite3.connect(DATABASE_NAME)
    c = conn.cursor()

    now = time.time()
    c.execute('UPDATE games SET score_player_1 = score_player_1 + ?, score_player_2 = score_player_2 + ?, last_score_date = ? WHERE id = ?', [score_player_1, score_player_2, now, id_game])
    c.execute('INSERT INTO scores (id_game, id_serving_player, score_player_1, score_player_2, created_date) VALUES (?, ?, ?, ?, ?)', [id_game, id_serving_player, score_player_1, score_player_2, now])
    conn.commit()
    conn.close()

def __db_get_all_player_ids():
    ids = []

    conn = sqlite3.connect(DATABASE_NAME)
    c = conn.cursor()
    for row in c.execute('SELECT id FROM players ORDER BY name'):
        ids.append(row[0])

    conn.commit()
    conn.close()
    return ids
