# from turtle import *
# from time import sleep

# def paint():
#     t = Turtle()
#     t.shape("circle")
#     t.pensize(3)
#     t.speed(1000)
#     scr = t.getscreen()
#     scr.listen()
#     def blue():
#         t.color("blue")
#     def green():
#         t.color("green")
#     def yellow():
#         t.color("yellow")
#     def orange():
#         t.color("orange")
#     def red():
#         t.color("red")
#     def white():
#         t.color("white")
#     def up():
#         t.goto(t.xcor(), t.ycor() + 5)
#     def down():
#         t.goto(t.xcor(), t.ycor() - 5)
#     def left():
#         t.goto(t.xcor() - 5, t.ycor())
#     def right():
#         t.goto(t.xcor() + 5, t.ycor())
#     def drag(x, y):
#         t.goto(x, y)
#     def click(x, y):
#         t.penup()
#         t.goto(x, y)
#         t.pendown()
#     def start():
#         t.begin_fill()
#     def end():
#         t.end_fill()
#     def triangle():
#         for i in range(3):
#             t.forward(100)
#             t.left(120)
#     def square():
#         for i in range(4):
#             t.forward(100)
#             t.left(90)
#     def draw_circle():
#         t.circle(50)
#     def pentagon():
#         for i in range(5):
#             t.forward(100)
#             t.left(72)
#     def hexagon():
#         for i in range(6):
#             t.forward(100)
#             t.left(60)
#     def size1():
#         t.pensize(1)
#     def size2():
#         t.pensize(2)
#     def size3():
#         t.pensize(3)
#     def size4():
#         t.pensize(4)
#     def size5():
#         t.pensize(5)
#     def size6():
#         t.pensize(6)
#     def size7():
#         t.pensize(7)
#     def size8():
#         t.pensize(8)
#     def size9():
#         t.pensize(9)
#     def size10():
#         t.pensize(10)
#     t.ondrag(drag)
#     scr.onscreenclick(click)
#     scr.onkey(blue, "b")
#     scr.onkey(green, "g")
#     scr.onkey(yellow, "y")
#     scr.onkey(orange, "o")
#     scr.onkey(red, "r")
#     scr.onkey(white, "w")
#     scr.onkey(up, "Up")
#     scr.onkey(down, "Down")
#     scr.onkey(left, "Left")
#     scr.onkey(right, "Right")
#     scr.onkey(end, "e")
#     scr.onkey(start, "f")
#     scr.onkey(triangle, "t")
#     scr.onkey(square, "s")
#     scr.onkey(draw_circle, "c")
#     scr.onkey(pentagon, "p")
#     scr.onkey(hexagon, "h")
#     scr.onkey(size1, "1")
#     scr.onkey(size2, "2")
#     scr.onkey(size3, "3")
#     scr.onkey(size4, "4")
#     scr.onkey(size5, "5")
#     scr.onkey(size6, "6")
#     scr.onkey(size7, "7")
#     scr.onkey(size8, "8")
#     scr.onkey(size9, "9")
#     scr.onkey(size10, "0")
#     scr.onkey(scr.bye, "q")
#     scr.mainloop()

# def draw_square():
#     pensize(4)
#     for i in range(4):
#         forward(100)
#         left(90)


# def draw_triangle():
#     pensize(4)
#     for i in range(3):
#         forward(100)
#         left(120)


# def draw_pentagon():
#     pensize(4)
#     for i in range(5):
#         forward(100)
#         left(72)


# def draw_circle():
#     pensize(4)
#     circle(50)


# def draw_hexagon():
#     pensize(4)
#     for i in range(6):
#         forward(100)
#         left(60)


# def draw_octagon():
#     for i in range(8):
#         forward(100)
#         left(45)


# def draw_star():
#     pensize(4)
#     for i in range(5):
#         forward(100)
#         right(144)