const Notion = class {
  /**
   * Constructs a new instance of the class with the provided Notion database ID and secret key.
   *
   * @param {string} NOTION_DATABASE_ID - The ID of the Notion database to work with.
   * @param {string} SECRET_KEY - The secret key to authenticate with the Notion API.
   * @returns {void}
   */
  constructor(NOTION_DATABASE_ID, SECRET_KEY) {
    /* コンストラクタ */
    this.NOTION_DATABASE_ID = NOTION_DATABASE_ID;
    this.SECRET_KEY = SECRET_KEY;
  }

  /**
   * Notion APIを使用してデータベースのタイトルを取得する。
   *
   * @return {string} データベースのタイトル。タイトルがない場合はデータベースIDが返される。
   */
  getNotionDataBaseIdentifier() {
    const base_url =
      "https://api.notion.com/v1/databases/" + this.NOTION_DATABASE_ID;
    const options = {
      method: "get",
      headers: {
        Authorization: "Bearer " + this.SECRET_KEY,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
    };

    let res = UrlFetchApp.fetch(base_url, options);
    let jsonRes = JSON.parse(res);
    return jsonRes.title.length
      ? jsonRes.title[0].plain_text
      : this.NOTION_DATABASE_ID;
  }

  /**
   * Notionからデータベースアイテムを取得する関数
   * @returns {Array<Object>} 取得されたデータベースアイテムの配列
   */
  getNotionDataBaseItems() {
    const base_url =
      "https://api.notion.com/v1/databases/" +
      this.NOTION_DATABASE_ID +
      "/query";
    let options = {
      method: "post",
      headers: {
        Authorization: "Bearer " + this.SECRET_KEY,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
    };

    let res = UrlFetchApp.fetch(base_url, options);

    let hasMore = JSON.parse(res).has_more;
    let nextCursor = JSON.parse(res).next_cursor;

    let data = JSON.parse(res).results;

    while (hasMore) {
      options["payload"] = JSON.stringify({ start_cursor: nextCursor });
      let res2 = UrlFetchApp.fetch(base_url, options);
      data = data.concat(JSON.parse(res2).results);
      hasMore = JSON.parse(res2).has_more;
      nextCursor = JSON.parse(res2).next_cursor;
    }

    return data;
  }

  /**
   * Notionのデータベースからカラム情報を取得する関数
   * @returns {Array<string>} 取得されたカラム名の配列
   */
  getNotionDataBaseColumn() {
    const base_url =
      "https://api.notion.com/v1/databases/" + this.NOTION_DATABASE_ID;
    const options = {
      method: "get",
      headers: {
        Authorization: "Bearer " + this.SECRET_KEY,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
    };

    let res = UrlFetchApp.fetch(base_url, options);
    let jsonRes = JSON.parse(res);

    return Object.keys(jsonRes.properties);
  }

  /**
   * スプレッドシートにデータを入れるための二次元配列を生成する関数
   * @param {Array<string>} columnsList - カラムのリスト
   * @param {Array<Object>} results - データベースアイテムのリスト
   * @returns {Array<Array<any>>} 生成された二次元配列
   */
  generateSpreadsheetData(columnsList, results) {
    let records = [];
    // カラムを挿入
    records.push(columnsList);
    for (const result of results) {
      let record = [];
      for (const column of columnsList) {
        record.push(this.formatRecord(result.properties[column]));
      }
      records.push(record);
    }
    return records;
  }

  /**
   * Notionのプロパティを適切なフォーマットで変換する関数
   * @param {Object} property - 変換するプロパティオブジェクト
   * @returns {any} フォーマットされたプロパティ値
   */
  formatRecord(propatie) {
    const type = propatie.type;
    // typeの種類:https://developers.notion.com/reference/property-object
    let items = "";
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
        propatie.multi_select.forEach(
          (element) => (items += element.name + ",")
        );
        items = items.slice(0, -1);
        return items;
      case "number":
        return propatie.number;
      case "people":
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
};
