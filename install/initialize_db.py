import sqlite3

conn = sqlite3.connect('pi-score-counter.db')
c = conn.cursor()

c.execute('CREATE TABLE players (id INTEGER PRIMARY KEY ASC, name TEXT, created_date INTEGER)')
c.execute('CREATE TABLE games (id PRIMARY KEY ASC, id_player_1 INTEGER, id_player_2 INTEGER , created_date INTEGER, FOREIGN KEY(id_player_1) REFERENCES players(id), FOREIGN KEY(id_player_2) REFERENCES players(id))')
c.execute('CREATE TABLE scores (id INTEGER PRIMARY KEY ASC, id_game INTEGER, score_player_1 INTEGER, score_player_2 INTEGER, created_date INTEGER, FOREIGN KEY(id_game) REFERENCES games(id))')
c.execute('CREATE TABLE ui_controls (id INTEGER PRIMARY KEY ASC, key TEXT, value TEXT, created_date INTEGER, modified_date INTEGER)')

conn.commit()
conn.close()