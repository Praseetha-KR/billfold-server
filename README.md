# billfold-server

billfold-server is a REST Server which directly updates expense sheet (existing with predefined structure) in Google Spreadsheets. No database required.

### Setup

##### Install dependencies:
```
yarn
```
##### Start server:
```
npm start
```

### Config
Create a `.env` file in the project root directory, provide following info in that.
```
GOOGLE_API_CLIENT_ID        = 'xxxxxxxxxxxx'
GOOGLE_API_CLIENT_SECRET    = 'xxxxx'
GOOGLE_API_REDIRECT_URL     = 'http://xxxxxxxx/xxxx'
GOOGLE_API_ACCESS_TOKEN     = 'xxxxxxxxxxxx'
GOOGLE_API_REFRESH_TOKEN    = 'xxxxxxxxxxxx'
GOOGLE_API_EXPIRY_DATE      = new Date(xxxxxxx)'
GOOGLE_SPREADSHEET_ID_2017  = 'xxxxxxxxxxxx'
```

### Endpoints implemented:
1. List all expenses (from start of year till date):
        
        GET /api/v1/expenses
        
        
2. View expense item:
        
        GET /api/expenses/:datestr
        
3. Update expense item:
        
        PUT /api/expenses/:datestr
        

### Expense sheet format:

| Date | Total | Food | Travel | Supermarket | Recharge | e-shopping | Rent/wifi/hosting | Transfers | Others | Remarks |
|------|-------|------|--------|-------------|----------|------------|-------------------|-----------|--------|---------|
|`<Date>`|`<Number>`|`<Number>`|`<Number>`|`<Number>`|`<Number>`|`<Number>`|`<Number>`|`<Number>`|`<Number>`|`<String>`|

