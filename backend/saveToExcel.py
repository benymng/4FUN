import requests
import time
import urllib.request

myValue = ''
Req = ''
MyFile = ''
url = "http://localhost:3000"

page = urllib.request.urlopen(url)
print(page.read())

# myFile = open('data.csv', 'w')
# # myFile.write("testing")

# Req = requests.get('http://localhost:3000/')
# myValue = Req.text
# myFile.write(myValue)

# for count in range(5):
#     Req = requests.get("__IP ADDRESS__")
#     myValue = Req.text
#     myValue = myValue[25:27]
#     print(myValue)
#     myFile.write((str(int(myValue))))
#     time.sleep(3)
# myFile.close()
print("Success")