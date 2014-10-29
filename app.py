import requests
import json
import os
from flask import Flask, render_template

app = Flask(__name__)

SERVER_TOKEN = os.environ['uber_server_token']

try:
	HOST = os.environ['uber_app_domain']
except:
	HOST = "localhost:5000"


@app.route('/')
def index():
	return render_template('index.html', domain=HOST)

@app.route('/livedata/<lat>/<lng>')
def livedata(lat,lng):
	url = 'https://api.uber.com/v1/estimates/time'

	parameters = {
	    'server_token': SERVER_TOKEN,
	    'start_latitude': lat,
	    'start_longitude': lng
	}
	
	response = requests.get(url, params=parameters)
		
	return json.dumps(response.json(),sort_keys=True, indent=4)

if __name__ == '__main__':
	app.run(debug=True)
