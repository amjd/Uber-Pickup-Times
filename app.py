import requests
import json
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/livedata/<lat>/<lng>')
def livedata():
	url = 'https://api.uber.com/v1/estimates/time'

	parameters = {
	    'server_token': 'xMSF2VlxJybkRJY5SeVFw15XJ8wCPzEBoiVoVfOu',
	    'start_latitude': lat,
	    'start_longitude': lng
	}
	
	response = requests.get(url, params=parameters)
		
	return json.dumps(response.json(),sort_keys=True, indent=4)

if __name__ == '__main__':
	app.run(debug=True)
