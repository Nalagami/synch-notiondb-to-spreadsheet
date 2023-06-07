const SECRET_KEY = '' // シークレットキー
const NOTION_DATABASE_ID = ''; // データベースID

function getNotionDataBaseItems() {
  const base_url = 'https://api.notion.com/v1/databases/' + NOTION_DATABASE_ID + '/query';

  const options = {
    'method': 'post',
    'headers': {
      'Authorization': 'Bearer ' + SECRET_KEY,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json'
    }
  };

  let res = UrlFetchApp.fetch(base_url, options);
  let jsonRes = JSON.parse(res)

  // Logger.log(typeof(jsonRes))
  // Logger.log(jsonRes.results)

  for (result of jsonRes.results) {
    console.log(result.properties)
    console.log(result.properties.名前)
  }

}

function getNotionDataBaseColumn() {

  const base_url = 'https://api.notion.com/v1/databases/' + NOTION_DATABASE_ID;
  const options = {
    'method': 'get',
    'headers': {
      'Authorization': 'Bearer ' + SECRET_KEY,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json'
    }
  };

  let res = UrlFetchApp.fetch(base_url, options);
  let jsonRes = JSON.parse(res);

  return Object.keys(jsonRes.properties)
}