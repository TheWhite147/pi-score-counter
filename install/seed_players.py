import sqlite3
import time

conn = sqlite3.connect('pi-score-counter.db')
c = conn.cursor()

conn.commit()

# Minimum data requirement
c.execute('INSERT INTO players (name, created_date) VALUES (?, ?)', ['Marc LeBlanc', time.time()])
c.execute('INSERT INTO players (name, created_date) VALUES (?, ?)', ['Marc Laplante', time.time()])
c.execute('INSERT INTO players (name, created_date) VALUES (?, ?)', ['Jeff', time.time()])
c.execute('INSERT INTO players (name, created_date) VALUES (?, ?)', ['Olivier', time.time()])
c.execute('INSERT INTO players (name, created_date) VALUES (?, ?)', ['Nic Longtin', time.time()])
c.execute('INSERT INTO players (name, created_date) VALUES (?, ?)', ['Fred Bouchard', time.time()])
c.execute('INSERT INTO players (name, created_date) VALUES (?, ?)', ['Martin', time.time()])
c.execute('INSERT INTO players (name, created_date) VALUES (?, ?)', ['Mathieu Tremblay', time.time()])
c.execute('INSERT INTO players (name, created_date) VALUES (?, ?)', ['Max Croisetière', time.time()])
c.execute('INSERT INTO players (name, created_date) VALUES (?, ?)', ['Alex', time.time()])
c.execute('INSERT INTO players (name, created_date) VALUES (?, ?)', ['Joe1', time.time()])
c.execute('INSERT INTO players (name, created_date) VALUES (?, ?)', ['Joe4', time.time()])

conn.commit()

conn.close()