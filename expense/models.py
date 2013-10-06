import datetime
from flask import url_for
from expense import db


class Expense(db.DynamicDocument):
    expense_time = db.DateTimeField(default=datetime.datetime.now, required=True)
    expense_category = db.StringField(max_length=255, required=True)
    expense_amount = db.IntField(min_value=0, required=True)
    expense_remarks = db.StringField(max_length=255)

    def get_absolute_url(self):
        return url_for('expense', kwargs={"expense_time": self.expense_time})

    def __unicode__(self):
        return self.expense_category

    @property
    def expense_type(self):
        return self.__class__.__name__

    meta = {
        'allow_inheritance': True,
        'indexes': ['-expense_time', 'expense_time'],
        'ordering': ['-expense_time']
    }

class BlogExpense(Expense):
    body = db.StringField(required=True)
