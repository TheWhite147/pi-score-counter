import sqlite3
import time

conn = sqlite3.connect('pi-score-counter.db')
c = conn.cursor()

# Tables creation
c.execute('CREATE TABLE players (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, created_date INTEGER)')
c.execute('CREATE TABLE games (id INTEGER PRIMARY KEY AUTOINCREMENT, id_player_1 INTEGER, id_player_2 INTEGER , created_date INTEGER, FOREIGN KEY(id_player_1) REFERENCES players(id), FOREIGN KEY(id_player_2) REFERENCES players(id))')
c.execute('CREATE TABLE scores (id INTEGER PRIMARY KEY AUTOINCREMENT, id_game INTEGER, id_serving_player INTEGER, score_player_1 INTEGER, score_player_2 INTEGER, created_date INTEGER, FOREIGN KEY(id_game) REFERENCES games(id), FOREIGN KEY(id_serving_player) REFERENCES player(id))')
c.execute('CREATE TABLE ui_controls (id INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT, value TEXT, created_date INTEGER, modified_date INTEGER)')

conn.commit()

# Minimum data requirement
c.execute('INSERT INTO ui_controls (key, value, created_date, modified_date) VALUES (?, ?, ?, ?)', ['STATE', '0', time.time(), time.time()]) # Game state
c.execute('INSERT INTO ui_controls (key, value, created_date, modified_date) VALUES (?, ?, ?, ?)', ['ACTIVE_PLAYER_1', '1', time.time(), time.time()]) # Active player 1
c.execute('INSERT INTO ui_controls (key, value, created_date, modified_date) VALUES (?, ?, ?, ?)', ['ACTIVE_PLAYER_2', '1', time.time(), time.time()]) # Active player 2
c.execute('INSERT INTO ui_controls (key, value, created_date, modified_date) VALUES (?, ?, ?, ?)', ['SERVING_PLAYER', '0', time.time(), time.time()]) # Serving player
c.execute('INSERT INTO ui_controls (key, value, created_date, modified_date) VALUES (?, ?, ?, ?)', ['READY_PLAYER_1', '0', time.time(), time.time()]) # Player 1 is ready
c.execute('INSERT INTO ui_controls (key, value, created_date, modified_date) VALUES (?, ?, ?, ?)', ['READY_PLAYER_2', '0', time.time(), time.time()]) # Player 2 is ready
c.execute('INSERT INTO ui_controls (key, value, created_date, modified_date) VALUES (?, ?, ?, ?)', ['SCORE_PLAYER_1', '0', time.time(), time.time()]) # Score player 1
c.execute('INSERT INTO ui_controls (key, value, created_date, modified_date) VALUES (?, ?, ?, ?)', ['SCORE_PLAYER_2', '0', time.time(), time.time()]) # Score player 2

conn.commit()

conn.close()