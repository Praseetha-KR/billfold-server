import google from 'googleapis';
require('dotenv').config();


export default {
    get: getExpense
};

function removeZeroPrefix(number) {
    if (number[0] === 0) {
        return number.slice(1);
    }
    return number;
}

function getSheetId(year) {
    var yearlySpreadsheets = {
        2017: process.env.GOOGLE_SPREADSHEET_ID
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

function fetchRows(sheetId, sheetRange) {
    return new Promise((resolve, reject) => {
        var sheets = google.sheets('v4');
        sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: sheetRange,
        }, (err, response) => {
            if (err) {
                console.log('The API returned an error: ' + err);
                reject();
            }
            resolve(response.values);
        });
    });
}

async function getExpense(datestr) {
    let oAuth2Client = await authorize();
    google.options({
        auth: oAuth2Client
    });

    const day = removeZeroPrefix(datestr.slice(0,2));
    const month = removeZeroPrefix(datestr.slice(2,4));
    const year = datestr.slice(4);

    const rowIndex = parseInt(day) + 1;
    const sheetName = getSheetName(month);
    const range = `${sheetName}!A${rowIndex}:K${rowIndex}`;
    const spreadsheetId = getSheetId(year);

    let rows = await fetchRows(spreadsheetId, range);
    return rowToExpenseObj(rows[0]);
}
