const Sync = class {
  /**
   * Sync クラスのコンストラクター関数
   *
   * @param {string} secretKey - Notion APIのSecret Key
   * @param {string} notionDatabaseId - 同期対象となるNotion DatabaseのID
   * @param {string} sheetId - 同期対象となるGoogle SheetsのID
   */
  constructor(secretKey, notionDatabaseId, sheetId) {
    this.SECRET_KEY = secretKey;
    this.NOTION_DATABASE_ID = notionDatabaseId;
    this.SHEET_ID = sheetId;
  }

  /**
   * NotionとGoogle Sheetsのデータを同期する
   *
   * @returns {void}
   */
  syncData() {
    // Notionインスタンス生成
    const notion = new Notion(this.NOTION_DATABASE_ID, this.SECRET_KEY);
    // Google Sheetsインスタンス生成
    const spreadSheet = new SpreadSheet(
      this.SHEET_ID,
      notion.getNotionDataBaseIdentifier()
    );

    // --カラム情報取得--
    // spreadsheetにカラムがあればそちらを優先する
    const sheetColumns = spreadSheet.getColumn();
    const columnsList = !this.isEmptyColumn(sheetColumns)
      ? sheetColumns
      : notion.getNotionDataBaseColumn();

    // --Notion DBのアイテムを取得・整形--
    // Notion DBのアイテムを取得
    let results = notion.getNotionDataBaseItems();

    // アイテムを行ごとに配列へ格納
    const records = notion.generateSpreadsheetData(columnsList, results);

    // シート更新
    spreadSheet.updateSheetData(records);
  }

  /**
   * 配列が空の場合 true を返す、それ以外の場合 false を返す
   *
   * @param {Array} array - 空かどうかを確認する配列
   * @returns {boolean} - 配列が空の場合 true、それ以外の場合 false
   */
  isEmptyColumn(array) {
    if (!Array.isArray(array)) {
      return false;
    }

    for (let i = 0; i < array.length; i++) {
      if (array[i] !== "" && array[i] !== null) {
        return false;
      }
    }

    return true;
  }
};
