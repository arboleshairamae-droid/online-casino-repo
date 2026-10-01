const SHEET_HEADERS = {
  Users: ['id', 'name', 'email', 'password', 'balance', 'created_at'],
  Activities: [
    'id',
    'user_id',
    'activity_type',
    'description',
    'credits',
    'created_at',
    'updated_at',
  ],
  Tokens: ['token_hash', 'user_id', 'created_at'],
};

function setupLuckyVaultSheets() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  if (!spreadsheet) {
    throw new Error('Open Apps Script from the target spreadsheet before running setup.');
  }

  PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', spreadsheet.getId());

  for (const [name, headers] of Object.entries(SHEET_HEADERS)) {
    let sheet = spreadsheet.getSheetByName(name);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(name);
    }

    const current = sheet.getRange(1, 1, 1, headers.length).getDisplayValues()[0];
    const empty = current.every((value) => value === '');
    const matches = headers.every((header, index) => current[index] === header);

    if (!empty && !matches) {
      throw new Error(`The "${name}" tab has different headers; it was not changed.`);
    }

    if (empty) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }

    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, headers.length);
  }
}

function doGet() {
  return jsonResponse({ ok: true, service: 'luckyvault-sheets' });
}

function doPost(event) {
  try {
    const request = JSON.parse(event.postData.contents);
    authorize(request.api_key);

    if (!Object.prototype.hasOwnProperty.call(SHEET_HEADERS, request.tab)) {
      throw new Error('Unknown sheet tab.');
    }

    const spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');

    if (!spreadsheetId) {
      throw new Error('Run setupLuckyVaultSheets before using the API.');
    }

    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(request.tab);

    if (!sheet) {
      throw new Error(`Sheet tab "${request.tab}" was not found.`);
    }

    if (request.action === 'rows') {
      return jsonResponse({ ok: true, rows: readRows(sheet, request.tab) });
    }

    if (request.action === 'append') {
      sheet.appendRow(toRow(request.tab, request.row));
      return jsonResponse({ ok: true });
    }

    if (request.action === 'update') {
      const rowNumber = Number(request.row_number);

      if (!Number.isInteger(rowNumber) || rowNumber < 2) {
        throw new Error('Invalid row number.');
      }

      sheet.getRange(rowNumber, 1, 1, SHEET_HEADERS[request.tab].length)
        .setValues([toRow(request.tab, request.row)]);
      return jsonResponse({ ok: true });
    }

    throw new Error('Unknown action.');
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error.message || error) });
  }
}

function authorize(providedKey) {
  const expectedKey = PropertiesService.getScriptProperties().getProperty('API_KEY');

  if (!expectedKey || providedKey !== expectedKey) {
    throw new Error('Unauthorized.');
  }
}

function readRows(sheet, tab) {
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    return [];
  }

  const headers = SHEET_HEADERS[tab];
  return sheet.getRange(2, 1, lastRow - 1, headers.length).getValues()
    .map((values, index) => {
      const row = Object.fromEntries(headers.map((header, column) => [
        header,
        values[column] instanceof Date ? values[column].toISOString() : values[column],
      ]));
      row._row = index + 2;
      return row;
    });
}

function toRow(tab, data) {
  if (!data || typeof data !== 'object') {
    throw new Error('Row data is required.');
  }

  return SHEET_HEADERS[tab].map((header) => {
    const value = data[header] == null ? '' : data[header];
    return typeof value === 'string' && value.startsWith('=') ? `'${value}` : value;
  });
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}