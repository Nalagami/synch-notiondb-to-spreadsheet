const SpreadSheet = class {
  /**
   * スプレッドシートURLとシート名を指定して新しいスプレッドシートオブジェクトを作成する。
   *
   * @param {string} sheetId - スプレッドシートのURL。
   * @param {string} sheetName - スプレッドシートのシート名。
   */
  constructor(sheetId, sheetName) {
    this.SHEET_ID = sheetId;
    this.SHEET_NAME = sheetName;
    this.spreadSheet = SpreadsheetApp.openById(this.SHEET_ID);
    this.spreadSheet.renameActiveSheet(this.SHEET_NAME);
    this.sheet = this.spreadSheet.getActiveSheet();
  }

  /**
   * スプレッドシートのデータを更新する。
   *
   * @param {Array<Array<string>>} records - 更新する行と列の値を含む二次元配列。
   */
  updateSheetData(records) {
    this.sheet.clear();
    this.addSheetData(records);
  }

  /**
   * スプレッドシートにデータを追加する。
   *
   * @param {Array<Array<string>>} records - 追加する行と列の値を含む二次元配列。
   */
  addSheetData(records) {
    for (const record of records) {
      this.sheet.appendRow(record);
    }
  }

  /**
   * スプレッドシートの最初の列の値を返す。
   *
   * @returns {Array<string>} 最初の行にある各列の値の配列。
   */
  getColumn() {
    const values = this.sheet.getDataRange().getValues();
    return values[0];
  }
};
