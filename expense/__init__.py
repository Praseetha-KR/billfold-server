from flask import Flask
from flask.ext.mongoengine import MongoEngine

app = Flask(__name__)
app.config["MONGODB_SETTINGS"] = {"DB": "expense_app_test2"}
app.config["SECRET_KEY"] = "KeepThisS3cr3t"

db = MongoEngine(app)


def register_blueprints(app):
    # Prevents circular imports
    from expense.views import expenses
    app.register_blueprint(expenses)

register_blueprints(app)

if __name__ == '__main__':
    app.run()
