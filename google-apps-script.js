// Standalone Apps Script project (script.google.com > New project) that
// writes DEXAM form submissions into the sheet below, targeted by ID so it
// works regardless of how the project was created. Deploy as Web app,
// executing as you, with access set to Anyone. Then paste the /exec URL
// into DEXAM CMS > Google Sheets.

var SPREADSHEET_ID = '1GKvuLIp3prV2pWZxt8VPM7rJhJ_MdnYtCLk0MqD4Ypg';

function doPost(e) {
  var data = JSON.parse(e.postData.contents || '{}');
  var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var isPaper = data.type === 'paper_download';
  var sheetName = isPaper ? 'Paper Downloads' : 'Counselling';
  var sheet = spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);

  var headers = isPaper
    ? ['Submitted At', 'Name', 'Phone', 'Location', 'Exam ID', 'Paper Year', 'Page']
    : ['Submitted At', 'Name', 'Phone', 'Location', 'Page'];
  var row = isPaper
    ? [data.submittedAt, data.name, data.phone, data.location, data.examId, data.paperYear, data.page]
    : [data.submittedAt, data.name, data.phone, data.location, data.page];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#F2B72A');
    sheet.setFrozenRows(1);
  }
  sheet.appendRow(row);
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
