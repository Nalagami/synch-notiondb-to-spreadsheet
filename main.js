function main() {
  const SECRET_KEY =
    PropertiesService.getScriptProperties().getProperty("NOTION_API_TOKEN"); // シークレットキー
  const NOTION_DATABASE_ID =
    PropertiesService.getScriptProperties().getProperty("NOTION_DATABASE_ID"); // データベースID

  const notion = new Notion(NOTION_DATABASE_ID, SECRET_KEY);

  // --Notion DBのカラム情報取得--
  const columnsList = notion.getNotionDataBaseColumn();

  // --Notion DBのアイテムを取得・整形--
  // Notion DBのアイテムを取得
  let results = notion.getNotionDataBaseItems();

  // アイテムを行ごとに配列へ格納
  const records = notion.generateSpreadsheetData(columnsList, results);

  // --スプレッドシートに書き込む処理--
  const SHEET_URL =
    PropertiesService.getScriptProperties().getProperty("SPREAD_SHEET_ID");
  const SHEET_NAME =
    PropertiesService.getScriptProperties().getProperty("SPREAD_SHEET_NAME");

  const spreadSheet = new SpreadSheet(SHEET_URL, SHEET_NAME);

  // シート更新
  spreadSheet.updateSheetData(records);
}
