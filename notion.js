function getNotionDataBaseItems() {
  const base_url =
    "https://api.notion.com/v1/databases/" + NOTION_DATABASE_ID + "/query";
  const options = {
    method: "post",
    headers: {
      Authorization: "Bearer " + SECRET_KEY,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
  };

  let res = UrlFetchApp.fetch(base_url, options);
  return JSON.parse(res).results;
}

function getNotionDataBaseColumn() {
  const base_url = "https://api.notion.com/v1/databases/" + NOTION_DATABASE_ID;
  const options = {
    method: "get",
    headers: {
      Authorization: "Bearer " + SECRET_KEY,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
  };

  let res = UrlFetchApp.fetch(base_url, options);
  let jsonRes = JSON.parse(res);

  return Object.keys(jsonRes.properties);
}

function format_record(propatie) {
  type = propatie.type;
  // typeの種類:https://developers.notion.com/reference/property-object
  switch (type) {
    case "title":
      return propatie.title.length ? propatie.title[0].plain_text : "";
    case "checkbox":
      // boolean
      return propatie.checkbox;
    case "date":
      //propatie.date
      //{start: , end: , timezona: }
      // date が存在すればstartを出力 なければ 空文字
      return propatie.date ? propatie.date.start : "";
    case "email":
      return propatie.email;
    case "files":
      items = "";
      propatie.files.forEach((element) => (items += element.file.url + ","));
      items = items.slice(0, -1);
      return items;
    case "formula":
      return propatie.formula.string;
    case "last_edited_by":
      return propatie.last_edited_by.name;
    case "last_edited_time":
      return propatie.last_edited_time;
    case "multi_select":
      items = "";
      propatie.multi_select.forEach((element) => (items += element.name + ","));
      items = items.slice(0, -1);
      return items;
    case "number":
      return propatie.number;
    case "people":
      items = "";
      propatie.people.forEach((element) => (items += element.name + ","));
      items = items.slice(0, -1);
      return items;
    case "phone_number":
      return propatie.phone_number;
    case "relation":
      return propatie.relation;
    case "rich_text":
      return propatie.rich_text[0] ? propatie.rich_text[0].plain_text : "";
    case "rollup":
      return propatie.rollup;
    case "select":
      return propatie.select ? propatie.select.name : "";
    case "status":
      return propatie.status ? propatie.status.name : "";
    case "url":
      return propatie.url;
    case "created_time":
      return propatie.created_time;
    case "unique_id":
      return propatie.unique_id.number;
    case "created_by":
      return propatie.created_by.name;
    default:
      console.log(`不正な型の値が入力されました`);
  }
}
