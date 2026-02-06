import re
from .Weather import get_weather
from .Numbers import *
from .Time import *
from .Translator import translate
from .Leagues import *
from .Cooking import cooking
from .Gardening import gardening
from .Paint import *

def jay_execute(command: str):
    command = command.lower()
    
    if any(keyword in command for keyword in ["weather", "forecast", "temperature", "rain", "sunny", "cloudy"]):
        match = re.search(r"(?:in|of|at|location(?: of)?)\s+(.+)", command)
        location = re.sub(r"[^a-zA-Z\s]", "", match.group(1).strip()) if match else None
        if not location: 
            return "Please specify a city for the weather."
        return get_weather(location)

    # elif "square" in command and ("draw" in command or "make" in command or "create" in command):
    #     return draw_square()
    # elif "triangle" in command:
    #     return draw_triangle()
    # elif "circle" in command:
    #     return draw_circle()
    # elif "pentagon" in command:
    #     return draw_pentagon()
    # elif "hexagon" in command:
    #     return draw_hexagon()
    # elif "octagon" in command:
    #     return draw_octagon()
    # elif "star" in command:
    #     return draw_star()
    # elif "paint" in command or "draw" in command or "drawing" in command:
    #     return paint()

    elif "random" in command:
        numbers = [int(n) for n in re.findall(r'\d+', command)]
        return get_random(numbers[0], numbers[1])
    elif "multiplied" in command or "times" in command or "*" in command or "multiply" in command:
        numbers = [int(n) for n in re.findall(r'\d+', command)]
        return multiply(numbers[0], numbers[1])
    elif "divided" in command or "/" in command or "divide" in command:
        numbers = [int(n) for n in re.findall(r'\d+', command)]
        return divide(numbers[0], numbers[1])
    elif "plus" in command or "add" in command or "+" in command:
        numbers = [int(n) for n in re.findall(r'\d+', command)]
        return add(numbers[0], numbers[1])
    elif "minus" in command or "subtract" in command or "-" in command:
        numbers = [int(n) for n in re.findall(r'\d+', command)]
        return subtract(numbers[0], numbers[1])
    elif "power" in command or "^" in command:
        numbers = [int(n) for n in re.findall(r'\d+', command)]
        return power(numbers[0], numbers[1])
    elif "square root" in command or "sqrt" in command or "root" in command or "square rooted" in command:
        numbers = [int(n) for n in re.findall(r'\d+', command)]
        return square_root(numbers[0])
    elif "squared" in command or ("square" in command and not "draw" in command):
        numbers = [int(n) for n in re.findall(r'\d+', command)]
        return f"{numbers[0]} squared is {numbers[0] ** 2}"
    elif "cubed" in command or "cube" in command:
        numbers = [int(n) for n in re.findall(r'\d+', command)]
        return f"{numbers[0]} cubed is {numbers[0] ** 3}"
    elif "factorial" in command:
        numbers = [int(n) for n in re.findall(r'\d+', command)]
        return factorial(numbers[0])

    elif "timer" in command:
        numbers = [int(n) for n in re.findall(r'\d+', command)]
        hours = minutes = seconds = 0
        if "seconds" in command:
            seconds = numbers[0]
        elif "minutes" in command:
            minutes = numbers[0]
        elif "hours" in command:
            hours = numbers[0]
        return timer(hours, minutes, seconds)
    elif "time" in command:
        return get_time()
    elif "date" in command:
        return get_date()
    elif "alarm" in command:
        numbers = [int(n) for n in re.findall(r'\d+', command)]
        return alarm(numbers[0], numbers[1])

    elif "premier" in command:
        if "scores" in command or "results" in command:
            return premier_results()
        elif "table" in command or "standings" in command:
            return premier_table()
    elif "champions" in command:
        if "scores" in command or "results" in command:
            return champions_results()
        elif "table" in command or "standings" in command:
            return champions_table()
    elif "serie" in command and "a" in command:
        if "scores" in command or "results" in command:
            return serie_results()
        elif "table" in command or "standings" in command:
            return serie_table()
    elif "la liga" in command:
        if "scores" in command or "results" in command:
            return la_liga_results()
        elif "table" in command or "standings" in command:
            return la_liga_table()
    elif "bundesliga" in command:
        if "scores" in command or "results" in command:
            return bundesliga_results()
        elif "table" in command or "standings" in command:
            return bundesliga_table()
    elif "ligue" in command and "1" in command:
        if "scores" in command or "results" in command:
            return ligue_results()
        elif "table" in command or "standings" in command:
            return ligue_table()

    elif "recipe" in command or "cooking" in command or "cook" in command or "make" in command or "recipes" in command:
        match = re.search(r"(?:for|of|in|at|recipe(?: for)?)\s+(.+)", command)
        item = re.sub(r"[^a-zA-Z\s]", "", match.group(1).strip()) if match else None
        return cooking(item)
    elif "plant" in command or "gardening" in command or "garden" in command or "plants" in command:
        match = re.search(r"(?:for|of|in|at|type|plant(?: for)?)\s+(.+)", command)
        item = re.sub(r"[^a-zA-Z\s]", "", match.group(1).strip()) if match else None
        return gardening(item)

    elif "nuclear" in command:
        return "Please don't use nuclear weapons. It's not a good idea."
    elif "bomb" in command or "bombs" in command:
        return "Please don't use bombs. It's really not a good idea."

    elif "translate" in command or "translated" in command or "into" in command or "in" in command:
        pattern1 = r"translate\s(.+?)\s(?:into|in)\s(\w+)"
        pattern2 = r"translate\s(?:into|in)\s(\w+)\s(.+)"
        pattern3 = r"(.+?)\s(?:in)\s(\w+)"
        match1 = re.search(pattern1, command)
        match2 = re.search(pattern2, command)
        match3 = re.search(pattern3, command)
        if match1:
            text, language = match1.group(1).strip(), match1.group(2).strip()
        elif match2:
            language, text = match2.group(1).strip(), match2.group(2).strip()
        elif match3:
            text, language = match3.group(1).strip(), match3.group(2).strip()
        else:
            return "Sorry, I couldn't understand the translation request."
        return translate(text, language)

    elif any(keyword in command for keyword in ["exit", "quit", "stop", "bye", "goodbye"]):
        return "exit"

    elif any(keyword in command for keyword in ["hello", "hi", "hey", "greetings"]):
        return "Hello Simona! How can I assist you today?"

    else:
        return "I'm sorry Simona, I can't do that or I don't understand it yet."
