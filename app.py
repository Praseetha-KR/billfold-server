from flask import Flask
app = Flask(__name__)

@app.route('/<year>/')
def get_year(year):
	return ("Year: " + year)

@app.route('/<year>/<month>/')
def get_month(year,month):
	return ("Year: " + year + ", Month: " + month)

if __name__ == '__main__':
	app.run(debug=True)
