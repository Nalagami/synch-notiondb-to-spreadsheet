function updateSheetData(sheet, records) {
  deleteSheetData(sheet);
  addSheetData(sheet, records);
}

function deleteSheetData(sheet) {
  if (sheet.getLastRow() == 0) return;
  sheet.deleteRows(1, sheet.getLastRow());
}

function addSheetData(sheet, records) {
  // シートに書き込み
  for (record of records) {
    sheet.appendRow(record);
  }
}
