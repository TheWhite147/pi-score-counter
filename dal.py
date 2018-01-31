import sqlite3
import time

def set_game_state(state):
    update_ui_control('STATE', state)

def update_ui_control(key, value):
    conn = sqlite3.connect('pi-score-counter.db')
    c = conn.cursor()
    c.execute('UPDATE ui_controls SET value = ?, modified_date = ? WHERE key = ?', [key, time.time(), value])
    conn.commit()
    conn.close()