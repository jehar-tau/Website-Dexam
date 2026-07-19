// Paste this into Extensions > Apps Script in the Google Sheet that should
// receive DEXAM enquiries. Deploy as Web app, executing as you, with access
// set to Anyone. Then paste the /exec URL into DEXAM CMS > Google Sheets.

function doPost(e) {
  var data = JSON.parse(e.postData.contents || '{}');
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var isPaper = data.type === 'paper_download';
  var sheetName = isPaper ? 'Paper Downloads' : 'Counselling';
  var sheet = spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);

  var headers = isPaper
    ? ['Submitted At', 'Name', 'Parent', 'Phone', 'Email', 'Class', 'Exam', 'City', 'Exam ID', 'Paper Year', 'Page']
    : ['Submitted At', 'Name', 'Phone', 'Message', 'Page'];
  var row = isPaper
    ? [data.submittedAt, data.name, data.parent, data.phone, data.email, data.cls, data.exam, data.city, data.examId, data.paperYear, data.page]
    : [data.submittedAt, data.name, data.phone, data.msg, data.page];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#F2B72A');
    sheet.setFrozenRows(1);
  }
  sheet.appendRow(row);
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
