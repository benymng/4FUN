from bs4 import BeautifulSoup
import requests

url = "https://www.w3schools.com/html/html_basic.asp"
page = requests.get(url)
soup = BeautifulSoup(page.content, "html.parser")
text = soup.find_all('h2')
for one in text:
    print(one.get_text())


