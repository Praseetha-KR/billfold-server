from flask import Flask, jsonify

app = Flask(__name__, instance_relative_config=True)
app.config.from_pyfile('config.py')

@app.route('/<year>/')
def get_year(year):
	return jsonify(year=year)

@app.route('/<year>/<month>/')
def get_month(year,month):
	return jsonify(year=year, month=month)
