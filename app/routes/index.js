import Router from 'koa-router';
import expenseRouter from './expenses.js';
import google from 'googleapis';
require('dotenv').config();

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

function getRows(sheetId, sheetRange) {
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

const router = new Router();
router
    .get('/', async (ctx, next) => {
        // ctx.body = "Welcome to expenses API";
        let oAuth2Client = await authorize();
        google.options({
            auth: oAuth2Client
        });

        let rows = await getRows(process.env.GOOGLE_SPREADSHEET_ID, 'February!A2:J32');
        rows.forEach(row => {
            let sum = 0;
            for (let i = 2; i < row.length; i++) {
                if (parseInt(row[i])) {
                    sum += parseInt(row[i]);
                }
            }
            console.log(sum);
        });
        ctx.body = rows;
    })
    .use('/api/v1/expenses', expenseRouter.routes());

export default router;
