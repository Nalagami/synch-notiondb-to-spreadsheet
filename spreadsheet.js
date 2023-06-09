const SpreadSheet = class {
  constructor(sheetUrl, sheetName) {
    this.sheetUrl = sheetUrl;
    this.sheetName = sheetName;
    this.spreadSheet = SpreadsheetApp.openById(this.sheetUrl);
    this.sheet = this.spreadSheet.getSheetByName(this.sheetName);
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
