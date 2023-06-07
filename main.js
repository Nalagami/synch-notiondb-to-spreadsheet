const SECRET_KEY = '' // シークレットキー
const NOTION_DATABASE_ID = ''; // データベースID

function getNotionDataBaseItems() {
  const base_url = 'https://api.notion.com/v1/databases/' + NOTION_DATABASE_ID + '/query';
  const columnsList = getNotionDataBaseColumn()

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

  for (result of jsonRes.results) {
    for (column of columnsList) {
      console.log(result.properties[column])
      format_record(result.properties[column])
      // TODO: 取得したオブジェクトのタイプを見て、格納する変数を決める関数を作成する
    }
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

function format_record(propatie) {
  type = propatie.type
  // typeの種類:https://developers.notion.com/reference/property-object
  switch (type) {
    case 'title':
      console.log(propatie.title[0].plain_text);
      break;
    case 'checkbox':
      console.log("checkbox!");
      break;
    case 'date':
      //propatie.date
      //{start: , end: , timezona: }
      // date が存在すればstartを出力 なければ 空文字
      console.log(propatie.date ? propatie.date.start : '');
      break;
    case 'email':
      console.log('email');
      break;
    case 'files':
      console.log('files');
      break;
    case 'formula':
      console.log('formula');
      break;
    case 'last_edited_by':
      console.log('last_edited_by');
      break;
    case 'last_edited_time':
      console.log('last_edited_time');
      break;
    case 'multi_select':
      propatie.multi_select.forEach(element => console.log(element.name));
      break;
    case 'number':
      console.log('number');
      break;
    case 'people':
      console.log('people');
      break;
    case 'phone_number':
      console.log('phone_number');
      break;
    case 'relation':
      console.log('relation');
      break;
    case 'rich_text':
      console.log(propatie.rich_text[0] ? propatie.rich_text[0].plain_text : '');
      break;
    case 'rollup':
      console.log('rollup');
      break;
    case 'select':
      console.log('select');
      break;
    case 'status':
      console.log('status');
      break;
    case 'url':
      console.log('url');
      break;
    default:
      console.log(`Sorry, we are out of ${expr}.`);
  }
}