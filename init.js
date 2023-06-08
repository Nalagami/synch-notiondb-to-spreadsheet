function Init() {
  // --Notion関係--
  // Notion API token
  PropertiesService.getScriptProperties().setProperty(
    "NOTION_API_TOKEN",
    "<Notion api token>"
  );
  // Notion database id
  PropertiesService.getScriptProperties().setProperty(
    "NOTION_DATABASE_ID",
    "<notion database id>"
  );

  // --sheet関係--
  // sheet id
  PropertiesService.getScriptProperties().setProperty(
    "SPREAD_SHEET_ID",
    "<spread sheet id>"
  );
  // sheet name
  PropertiesService.getScriptProperties().setProperty(
    "SPREAD_SHEET_NAME",
    "<spread sheet name>"
  );

  // --trigger set--
  setTrigger();
}

function setTrigger() {
  //10分ごとに繰り返し定期実行するトリガーを作成
  ScriptApp.newTrigger("main").timeBased().everyMinutes(10).create();
}
