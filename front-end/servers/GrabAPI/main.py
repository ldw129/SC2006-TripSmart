import os

os.system('pip install -r requirements.txt')

import socket

s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.connect(("8.8.8.8", 80))
ip_address = s.getsockname()[0]
print(ip_address)
s.close()

os.system('python -m flask run --host='+ip_address)