const SpreadSheet = class {
  constructor(sheetUrl, sheetName) {
    this.SHEET_URL = sheetUrl;
    this.SHEET_NAME = sheetName;
    this.spreadSheet = SpreadsheetApp.openById(this.SHEET_URL);
    this.sheet = this.spreadSheet.getSheetByName(this.SHEET_NAME)
      ? this.spreadSheet.getSheetByName(this.SHEET_NAME)
      : this.spreadSheet.insertSheet(this.SHEET_NAME);
  }

  updateSheetData(records) {
    this.sheet.clear();
    this.addSheetData(records);
  }

  addSheetData(records) {
    // シートに書き込み
    for (const record of records) {
      this.sheet.appendRow(record);
    }
  }

  getColumn() {
    const values = this.sheet.getDataRange().getValues();
    return values[0];
  }
};
