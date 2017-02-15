import google from 'googleapis';
require('dotenv').config();

function removeZeroPrefix(number) {
    if (number[0] === 0) {
        return number.slice(1);
    }
    return number;
}

function getSheetId(year) {
    var yearlySpreadsheets = {
        2017: process.env.GOOGLE_SPREADSHEET_ID_2017
    };
    return yearlySpreadsheets[year];
}

function getSheetName(index) {
    let monthlySheets = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthlySheets[index - 1];
}

function rowToExpenseObj(row) {
    const startIndex = 2; // expense value starting point in expense row
    return {
        'date': row[startIndex - 2],
        'total': parseInt(row[startIndex - 1]) || 0,
        'food': parseInt(row[startIndex]) || 0,
        'travel': parseInt(row[startIndex + 1]) || 0,
        'supermarket': parseInt(row[startIndex + 2]) || 0,
        'recharge': parseInt(row[startIndex + 3]) || 0,
        'e-shopping': parseInt(row[startIndex + 4]) || 0,
        'rent/wifi/hosting': parseInt(row[startIndex + 5]) || 0,
        'transfers': parseInt(row[startIndex + 6]) || 0,
        'others': parseInt(row[startIndex + 7]) || 0,
        'remarks': row[startIndex + 8]
    };
}

function totalExpenses(row) {
    let sum = 0;
    const expenseRow = row.slice(2, 10);
    expenseRow.forEach(column => {
        if (parseInt(column)) {
            sum += parseInt(column);
        }
    });
    return sum;
}

function optionsSheetIdRange(datestr) {
    const day = datestr.slice(0,2);
    const month = datestr.slice(2,4);
    const year = datestr.slice(4);
    const spreadsheetId = getSheetId(year);
    const rowIndex = parseInt(removeZeroPrefix(day)) + 1;
    const sheetName = getSheetName(removeZeroPrefix(month));
    const range = `${sheetName}!A${rowIndex}:K${rowIndex}`;

    return {
        spreadsheetId: spreadsheetId,
        range: range
    }
}

function authorize() {
    return new Promise((resolve, reject) => {
        const OAuth2 = google.auth.OAuth2;
        let oAuth2Client = new OAuth2(
            process.env.GOOGLE_API_CLIENT_ID,
            process.env.GOOGLE_API_CLIENT_SECRET,
            process.env.GOOGLE_API_REDIRECT_URL
        );
        oAuth2Client.setCredentials({
            access_token: process.env.GOOGLE_API_ACCESS_TOKEN,
            refresh_token: process.env.GOOGLE_API_REFRESH_TOKEN,
            expiry_date: process.env.GOOGLE_API_EXPIRY_DATE
        });
        resolve(oAuth2Client);
    });
}

function queryExpenseSheet(year, month, day) {
    return new Promise((resolve, reject) => {
        var sheets = google.sheets('v4');
        let range;
        if (day) {
            range = `${getSheetName(removeZeroPrefix(month))}!A2:K${day+1}`;
        } else {
            range = `${getSheetName(removeZeroPrefix(month))}!A2:K32`;
        }
        sheets.spreadsheets.values.get({
            spreadsheetId: getSheetId(year),
            range: range
        }, (err, response) => {
            if (err) {
                console.log('The API returned an error: ' + err);
                reject();
            }
            resolve(response.values);
        });
    });
}

function queryExpenseSheetRows(datestr) {
    return new Promise((resolve, reject) => {
        var sheets = google.sheets('v4');
        sheets.spreadsheets.values.get(optionsSheetIdRange(datestr), (err, response) => {
            if (err) {
                console.log('The API returned an error: ' + err);
                reject();
            }
            resolve(response.values);
        });
    });
}

function updateExpenseSheetRow(datestr, expenseObj) {
    return new Promise((resolve, reject) => {
        var sheets = google.sheets('v4');
        sheets.spreadsheets.values.update(Object.assign(optionsSheetIdRange(datestr),
        {
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    Object.values(expenseObj)
                ]
            }
        }), (err, response) => {
            if (err) {
                console.log('The API returned an error: ' + err);
                reject();
            }
            resolve(expenseObj);
        });
    });
}

async function getRowForDate(datestr) {
    let oAuth2Client = await authorize();
    google.options({
        auth: oAuth2Client
    });

    const rows = await queryExpenseSheetRows(datestr);
    return rows[0];
}

async function getSheetForMonth(year, month, day) {
    let oAuth2Client = await authorize();
    google.options({
        auth: oAuth2Client
    });
    return queryExpenseSheet(year, month, day);
}

async function queryExpenses() {
    const d = new Date();
    const day = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();

    let expenses = [];
    for (let m = 1; m < month + 1; m++) {
        expenses[m - 1] = await getSheetForMonth(year, m);
    }
    expenses[month] = await getSheetForMonth(year, month, day);

    const arrOfExpenseArr = [].concat.apply([], expenses);
    return arrOfExpenseArr.map(arr => {
        return rowToExpenseObj(arr)
    });
}

async function getExpense(datestr) {
    const row = await getRowForDate(datestr);
    return rowToExpenseObj(row);
}

async function editExpense(datestr, value, category, remarks='') {
    const row = await getRowForDate(datestr);
    const expenseObj = rowToExpenseObj(row);
    expenseObj[category] = value;
    expenseObj['remarks'] = remarks;
    expenseObj['total'] = totalExpenses(Object.values(expenseObj));
    return updateExpenseSheetRow(datestr, expenseObj);
}

export default {
    query: queryExpenses,
    get: getExpense,
    edit: editExpense
};
