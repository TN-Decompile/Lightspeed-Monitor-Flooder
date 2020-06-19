import uuid, random, requests, time, socket, sys, re, json
from stem import Signal
from stem.control import Controller

baseUrl = "https://devices.lsmdm.com/log/activity"
proxies = {
    'http': 'socks5://localhost:9050',
    'https': 'socks5://localhost:9050'
}

def generateInfo():
        names = open('names.txt', 'r').readlines()
        domains = open('domains.txt', 'r').readlines()

        data = {}
        data['uuid'] = str(uuid.uuid4())
        data['email'] = random.choice(list("abcdefghijklmnopqrstuvxyz")) + re.sub('[^0-9a-zA-Z]+', '', random.choice(names)).replace("\n", "") + "@" + random.choice(domains).replace("\n", "")
        data['gps'] = "[" + str(random.randint(0,90)) + "." + str(random.randint(100,999)) + "," + str(random.randint(0,90)) + "." + str(random.randint(100,999)) + "]"

        return data

def sendUrl():
        data = generateInfo()
        requests.post(baseUrl, "info[platform]=chromeTracker&info[email]=" + data['email'] + "&info[udid]=" + data['uuid'] + "&info[gps]=" + data['gps'] + "&info[phrases]=1", proxies=proxies)

        return data

def main():
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        result = sock.connect_ex(('127.0.0.1', 9051))
        if result != 0:
                print("Oi, install TOR and enable the control port at 9051 (of course, also the socks port at 9050)")
                sys.exit()

        i = 0
        while True:
                data = sendUrl()
                print("Sent: " + data['uuid'] + " " + data['email'] + " " + data['gps'])
                time.sleep(1)

                if i % 100 == 0:
                        with Controller.from_port(port = 9051) as controller:
                                controller.authenticate()
                                controller.signal(Signal.NEWNYM)
                        
                        ip = requests.get("http://httpbin.org/ip", proxies=proxies).text
                        print("Refreshed TOR! Exit Node: " + json.loads(ip)['origin'])

                i += 1

if __name__ == "__main__":
        main()
