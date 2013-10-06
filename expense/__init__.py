from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/<year>/')
def get_year(year):
	return jsonify(year=year)

@app.route('/<year>/<month>/')
def get_month(year,month):
	return jsonify(year=year, month=month)
