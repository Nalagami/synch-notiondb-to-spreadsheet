// TODO:triggerを設定する関数を作成する
const SECRET_KEY =
  PropertiesService.getScriptProperties().getProperty("NOTION_API_TOKEN"); // シークレットキー
const NOTION_DATABASE_ID =
  PropertiesService.getScriptProperties().getProperty("NOTION_DATABASE_ID"); // データベースID

function main() {
  // --Notion DBのカラム情報取得--
  const columnsList = getNotionDataBaseColumn();

  // --Notion DBのアイテムを取得・整形--
  // スプレッドシートに書き込むための配列を準備
  records = [];

  // カラムを挿入
  records.push(columnsList);

  // Notion DBのアイテムを取得
  let results = getNotionDataBaseItems();

  // アイテムを行ごとに配列へ格納
  for (result of results) {
    record = [];
    for (column of columnsList) {
      record.push(format_record(result.properties[column]));
    }
    records.push(record);
  }

  // --スプレッドシートに書き込む処理--
  const SHEET_URL =
    PropertiesService.getScriptProperties().getProperty("SPREAD_SHEET_ID");
  const SHEET_NAME =
    PropertiesService.getScriptProperties().getProperty("SPREAD_SHEET_NAME");

  // シートの情報取得
  const spreadSheet = SpreadsheetApp.openById(SHEET_URL);
  const sheet = spreadSheet.getSheetByName(SHEET_NAME);

  // シート更新
  updateSheetData(sheet, records);
}
