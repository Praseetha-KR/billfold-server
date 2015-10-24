##expense-backend

REST Server for ExpenseApp

####Expense object fields:

| Field         | Type      | Purpose               |
|---------------|-----------|-----------------------|
| `created_at`  | Date      | Creation time         |
| `date`        | Date      | Date of Expense       |
| `amount`      | Number    | amount                |
| `category`    | String    | Category              |
| `remarks`     | String    | Remarks if any        |

####APIs available:
1. List all expenses:
        
        GET /api/expenses
        
2. Add expense:
        
        POST /api/expenses
        
3. View expense item:
        
        GET /api/expenses/:expense_id
        
4. Update expense item:
        
        PATCH /api/expenses/:expense_id
        
5. Delete expense item:
        
        DELETE /api/expenses/:expense_id
