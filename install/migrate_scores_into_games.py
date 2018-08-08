import sqlite3

conn = sqlite3.connect('pi-score-counter.db')
c = conn.cursor()

# Tables creation
c.execute('ALTER TABLE games ADD COLUMN score_player_1 INTEGER')
c.execute('ALTER TABLE games ADD COLUMN score_player_2 INTEGER')

conn.commit()

conn.close()



# UPDATE games
# SET score_player_1 = (SELECT SUM(s.score_player_1) FROM scores s WHERE s.id_game = id),
# score_player_2 = (SELECT SUM(s.score_player_2) FROM scores s WHERE s.id_game = id)

# commit;
