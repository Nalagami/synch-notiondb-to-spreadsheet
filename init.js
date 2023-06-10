function Init() {
  // spreadsheetから値を取得
  const sheet = SpreadsheetApp.getActiveSheet();
  const values = sheet.getRange("C2:C3").getValues();

  const notionApiToken = values[0][0];
  const notionDatabaseId = values[1][0];

  if ((notionApiToken === "") | (notionDatabaseId === "")) {
    Browser.msgBox("Notion API token または Notion DB ID が未入力です");
    return;
  }

  // --Notion関係--
  // Notion API token
  PropertiesService.getScriptProperties().setProperty(
    "NOTION_API_TOKEN",
    notionApiToken
  );
  // Notion database id
  PropertiesService.getScriptProperties().setProperty(
    "NOTION_DATABASE_ID",
    notionDatabaseId
  );

  // --sheet関係--
  // sheet id
  PropertiesService.getScriptProperties().setProperty(
    "SPREAD_SHEET_ID",
    SpreadsheetApp.getActiveSpreadsheet().getId()
  );

  main();

  // --trigger set--
  deleteTrigger();
  setTrigger();
}

function setTrigger() {
  //10分ごとに繰り返し定期実行するトリガーを作成
  ScriptApp.newTrigger("main").timeBased().everyMinutes(10).create();
}

function deleteTrigger() {
  //GASプロジェクトに設定したトリガーをすべて取得
  const triggers = ScriptApp.getProjectTriggers();
  //トリガーの登録数をログ出力
  console.log("トリガー数：" + triggers.length);
  //トリガー登録数のforループを実行
  for (let i = 0; i < triggers.length; i++) {
    //取得したトリガーをdeleteTriggerで削除
    ScriptApp.deleteTrigger(triggers[i]);
  }
}
