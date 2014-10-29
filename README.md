Uber-Pickup-Times
=================

A micro web app to find available Uber cars around you and along with their ETAs. It uses the HTML5 Geolocation API to get the location.

###Demo
A demo of this is live at: [http://uberme.herokuapp.com](http://uberme.herokuapp.com)

###Usage
- Set environment variables for `uber_server_token` and `uber_app_host_name` (`localhost:5000` by default)

```bash
export uber_server_token=XXXXXXXXXXXXXX
export uber_app_host_name=DOMAIN.EXT 
```

- Run the script and see it live at `localhost:5000`

```bash
$ python app.py
 * Running on http://127.0.0.1:5000/
 * Restarting with reloader
```

###Contribute
Feel free to fork and improve upon it. Pull requests welcome!
