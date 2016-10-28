from flask import Response, Flask, request
app = Flask(__name__)

last_event = "fist"

@app.route('/leap', methods=['POST', 'OPTIONS'])
def leap_input():
	global last_event
	if request.method == 'POST':
		last_event = request.get_json()["event"]
		print(last_event)
	resp = Response("Foo bar baz")
	resp.headers['Access-Control-Allow-Origin'] = '*'
	resp.headers['Access-Control-Allow-Headers'] = 'origin, content-type, accept'
	return resp

@app.route('/car', methods=['GET'])
def command_get():
	global last_event
	print(last_event)
	return Response(last_event)

app.debug=True
app.run(host="0.0.0.0")