function main() {
  // --プロパティ読み込み--
  // Notion関係
  const SECRET_KEY =
    PropertiesService.getScriptProperties().getProperty("NOTION_API_TOKEN"); // シークレットキー
  const NOTION_DATABASE_ID =
    PropertiesService.getScriptProperties().getProperty("NOTION_DATABASE_ID"); // データベースID
  // spreadsheet関係
  const SHEET_URL =
    PropertiesService.getScriptProperties().getProperty("SPREAD_SHEET_ID");
  const SHEET_NAME =
    PropertiesService.getScriptProperties().getProperty("SPREAD_SHEET_NAME");

  // インスタンス生成
  const notion = new Notion(NOTION_DATABASE_ID, SECRET_KEY);
  const spreadSheet = new SpreadSheet(SHEET_URL, SHEET_NAME);

  // --カラム情報取得--
  // spreadsheetにカラムがあればそちらを優先する
  const columnsList = spreadSheet.getColumn().length
    ? spreadSheet.getColumn()
    : notion.getNotionDataBaseColumn();

  // --Notion DBのアイテムを取得・整形--
  // Notion DBのアイテムを取得
  let results = notion.getNotionDataBaseItems();

  // アイテムを行ごとに配列へ格納
  const records = notion.generateSpreadsheetData(columnsList, results);

  // シート更新
  spreadSheet.updateSheetData(records);
}
