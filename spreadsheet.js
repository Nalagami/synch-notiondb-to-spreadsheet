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
    this.sheet = this.spreadSheet.getSheetByName(this.SHEET_NAME)
      ? this.spreadSheet.getSheetByName(this.SHEET_NAME)
      : this.spreadSheet.insertSheet(this.SHEET_NAME);
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

  // Notion databse ID と API token を読み取る関数
  // returns {Array<Object>}
  // oojectは{id:, token:}
  getNotionInfo() {
    const sheet = this.spreadSheet.getSheetByName("設定");
    const lastRow = this.getColmunLastRow(1);
    const array = sheet.getRange(2, 1, 1, 2).getValues();
    console.log(lastRow);
    console.log(array);
    const return_object_array = [];
    for (const data of array) {
      const object = {};
      object.id = data[0];
      object.token = data[0];
      return_object_array.push(object);
    }
    console.log(return_object_array);
  }

  // TODO: 指定した行の最終行を取得する関数を作る
  // 引数：行数 返り値：最終行数(nuber)
  getColmunLastRow(column) {
    return this.sheet
      .getRange(1, column)
      .getNextDataCell(SpreadsheetApp.Direction.UP)
      .getRow();
  }
};
