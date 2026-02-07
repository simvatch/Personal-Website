import requests
import os
from dotenv import load_dotenv

load_dotenv()

def _get_api():
    return os.getenv("football_api").strip()

def premier_results():
    url = "https://api.football-data.org/v4/competitions/PL/matches"
    headers = {'X-Auth-Token': _get_api()}
    response = requests.get(url, headers=headers)
    matches = response.json().get('matches', [])

    results = []
    for match in matches:
        home = match['homeTeam']['name']
        away = match['awayTeam']['name']
        score_home = match['score']['fullTime']['home']
        score_away = match['score']['fullTime']['away']
        results.append(f"{home} {score_home} - {score_away} {away}")

    return "\n".join(results)

def premier_table():
    url = "https://api.football-data.org/v4/competitions/PL/standings"
    headers = {'X-Auth-Token': _get_api()}
    standings = requests.get(url, headers=headers).json()['standings'][0]['table']

    table = []
    for team in standings:
        table.append(
            f"{team['position']}. {team['team']['name']} - {team['points']} points"
        )

    return "\n".join(table)

def champions_results():
    url = "https://api.football-data.org/v4/competitions/CL/matches"
    headers = {'X-Auth-Token': _get_api()}
    matches = requests.get(url, headers=headers).json().get('matches', [])

    results = []
    for match in matches:
        home = match['homeTeam']['name']
        away = match['awayTeam']['name']
        score_home = match['score']['fullTime']['home']
        score_away = match['score']['fullTime']['away']

        if score_home is None or score_away is None:
            continue

        results.append(f"{home} {score_home} - {score_away} {away}")

    return "\n".join(results)

def champions_table():
    url = "https://api.football-data.org/v4/competitions/CL/matches"
    headers = {'X-Auth-Token': _get_api()}
    matches = requests.get(url, headers=headers).json().get('matches', [])

    teams = {}

    for match in matches:
        home = match['homeTeam']['name']
        away = match['awayTeam']['name']

        teams.setdefault(home, {'points': 0, 'matches': 0})
        teams.setdefault(away, {'points': 0, 'matches': 0})

        score_home = match['score']['fullTime']['home']
        score_away = match['score']['fullTime']['away']

        if score_home is None or score_away is None:
            continue

        teams[home]['matches'] += 1
        teams[away]['matches'] += 1

        if score_home > score_away:
            teams[home]['points'] += 3
        elif score_home < score_away:
            teams[away]['points'] += 3
        else:
            teams[home]['points'] += 1
            teams[away]['points'] += 1

    sorted_teams = sorted(
        teams.items(),
        key=lambda x: x[1]['points'],
        reverse=True
    )

    table = []
    for i, (team, stats) in enumerate(sorted_teams):
        table.append(f"{i+1}. {team} - {stats['points']} points")

    return "\n".join(table)

def serie_results():
    url = "https://api.football-data.org/v4/competitions/SA/matches"
    headers = {'X-Auth-Token': _get_api()}
    matches = requests.get(url, headers=headers).json().get('matches', [])

    results = []
    for match in matches:
        home = match['homeTeam']['name']
        away = match['awayTeam']['name']
        score_home = match['score']['fullTime']['home']
        score_away = match['score']['fullTime']['away']

        if score_home is None or score_away is None:
            continue

        results.append(f"{home} {score_home} - {score_away} {away}")

    return "\n".join(results)

def serie_table():
    url = "https://api.football-data.org/v4/competitions/SA/standings"
    headers = {'X-Auth-Token': _get_api()}
    standings = requests.get(url, headers=headers).json()['standings'][0]['table']

    table = []
    for team in standings:
        table.append(
            f"{team['position']}. {team['team']['name']} - {team['points']} points"
        )

    return "\n".join(table)

def bundesliga_results():
    url = "https://api.football-data.org/v4/competitions/BL1/matches"
    headers = {'X-Auth-Token': _get_api()}
    matches = requests.get(url, headers=headers).json().get('matches', [])

    results = []
    for match in matches:
        home = match['homeTeam']['name']
        away = match['awayTeam']['name']
        score_home = match['score']['fullTime']['home']
        score_away = match['score']['fullTime']['away']

        if score_home is None or score_away is None:
            continue

        results.append(f"{home} {score_home} - {score_away} {away}")

    return "\n".join(results)

def bundesliga_table():
    url = "https://api.football-data.org/v4/competitions/BL1/standings"
    headers = {'X-Auth-Token': _get_api()}
    standings = requests.get(url, headers=headers).json()['standings'][0]['table']

    table = []
    for team in standings:
        table.append(
            f"{team['position']}. {team['team']['name']} - {team['points']} points"
        )

    return "\n".join(table)

def la_liga_results():
    url = "https://api.football-data.org/v4/competitions/PD/matches"
    headers = {'X-Auth-Token': _get_api()}
    matches = requests.get(url, headers=headers).json().get('matches', [])

    results = []
    for match in matches:
        home = match['homeTeam']['name']
        away = match['awayTeam']['name']
        score_home = match['score']['fullTime']['home']
        score_away = match['score']['fullTime']['away']

        if score_home is None or score_away is None:
            continue

        results.append(f"{home} {score_home} - {score_away} {away}")

    return "\n".join(results)

def la_liga_table():
    url = "https://api.football-data.org/v4/competitions/PD/standings"
    headers = {'X-Auth-Token': _get_api()}
    standings = requests.get(url, headers=headers).json()['standings'][0]['table']

    table = []
    for team in standings:
        table.append(
            f"{team['position']}. {team['team']['name']} - {team['points']} points"
        )

    return "\n".join(table)

def ligue_results():
    url = "https://api.football-data.org/v4/competitions/FL1/matches"
    headers = {'X-Auth-Token': _get_api()}
    matches = requests.get(url, headers=headers).json().get('matches', [])

    results = []
    for match in matches:
        home = match['homeTeam']['name']
        away = match['awayTeam']['name']
        score_home = match['score']['fullTime']['home']
        score_away = match['score']['fullTime']['away']

        if score_home is None or score_away is None:
            continue

        results.append(f"{home} {score_home} - {score_away} {away}")

    if not results:
        return "No completed Ligue 1 matches yet."

    return "\n".join(results)