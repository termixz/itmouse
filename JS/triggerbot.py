import mss
import numpy as np
import cv2
import keyboard
import win32api
import win32con
import time
import random

TOGGLE_KEY = "f10"
HOLD_KEY = "left alt"
TARGET_COLOR_RANGE = ([0, 0, 200], [50, 50, 255])
SCAN_AREA = {"top": 535, "left": 955, "width": 10, "height": 10}

enabled = False
sct = mss.mss()

def shoot():
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN, 0, 0)
    time.sleep(random.uniform(0.01, 0.03))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP, 0, 0)

while True:
    if keyboard.is_pressed(TOGGLE_KEY):
        enabled = not enabled
        time.sleep(0.3)

    if enabled:
        if keyboard.is_pressed(HOLD_KEY):
            img = np.array(sct.grab(SCAN_AREA))
            img_hsv = cv2.cvtColor(img, cv2.COLOR_BGRA2BGR)
            
            lower = np.array(TARGET_COLOR_RANGE[0], dtype="uint8")
            upper = np.array(TARGET_COLOR_RANGE[1], dtype="uint8")
            mask = cv2.inRange(img_hsv, lower, upper)

            if np.any(mask):
                shoot()
                enabled = False
                time.sleep(0.1)
        else:
            time.sleep(0.01)
    else:
        time.sleep(0.1)

    if keyboard.is_pressed("end"):
        break