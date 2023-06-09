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

  // --同期処理--
  const sync = new Sync(SECRET_KEY, NOTION_DATABASE_ID, SHEET_URL);
  sync.syncData();
}
