const Sync = class {
  constructor(SecretKey, NotionDatabaseId, sheetId) {
    this.SECRET_KEY = SecretKey;
    this.NOTION_DATABASE_ID = NotionDatabaseId;
    this.SHEET_ID = sheetId;
  }

  syncData() {
    // インスタンス生成
    const notion = new Notion(this.NOTION_DATABASE_ID, this.SECRET_KEY);
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
