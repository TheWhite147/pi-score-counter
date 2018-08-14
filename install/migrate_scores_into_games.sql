ALTER TABLE games ADD COLUMN score_player_1 INTEGER DEFAULT 0
ALTER TABLE games ADD COLUMN score_player_2 INTEGER DEFAULT 0
ALTER TABLE games ADD COLUMN last_score_date INTEGER DEFAULT 0

UPDATE games
SET score_player_1 = (SELECT SUM(s.score_player_1) 
                        FROM scores s  
                        WHERE s.id_game = games.id), 
    score_player_2 = (SELECT SUM(s.score_player_2)
                        FROM scores s
                        WHERE s.id_game = games.id),
    last_score_date = (SELECT MAX(s.created_date)
                        FROM scores s
                        WHERE s.id_game = games.id)