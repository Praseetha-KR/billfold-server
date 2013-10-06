from flask import Blueprint, request, redirect, render_template, url_for
from flask.views import MethodView

from flask.ext.mongoengine.wtf import model_form
from expense.models import Expense

expenses = Blueprint('expenses', __name__, template_folder='templates')


class ListView(MethodView):

    def get(self):
        expenses = Expense.objects.all()
        return render_template('expenses/list.html', expenses=expenses)


class DetailView(MethodView):

    def get_context(self, expense_time):
        expense = Expense.objects.get_or_404(expense_time=expense_time)

        context = {
            "expense": expense,
        }
        return context

    def get(self, expense_time):
        context = self.get_context(expense_time)
        return render_template('expenses/detail.html', **context)

    def expense(self, expense_time):
        context = self.get_context(expense_time)
        return render_template('expenses/detail.html', **context)


# Register the urls
expenses.add_url_rule('/', view_func=ListView.as_view('list'))
expenses.add_url_rule('/<expense_time>/', view_func=DetailView.as_view('detail'))
