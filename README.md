> Note: This no longer works.

Uber-Pickup-Times
=================

A small experiment with Uber API to find available Uber cars around you and along with their ETAs. It uses the HTML5 Geolocation API to get the location.

### Demo
A demo of this is live at: [http://ubernow.herokuapp.com](http://ubernow.herokuapp.com)

### Usage
1. Install dependencies
    ```bash
    $ pip install -r requirements.txt
    ```

2. Set environment variable for `uber_server_token`
    ```bash
    export uber_server_token=XXXXXXXXXXXXXX
    ```

3. Run the script and see it live at: `http://localhost:5000`
    ```shell
    $ python app.py
     * Running on http://127.0.0.1:5000/
     * Restarting with reloader
    ```

### Contribute
Feel free to fork and improve upon it. Pull requests welcome!
