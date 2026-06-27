const STORAGE_KEY = "fdo-invigilation-sheet-v1";
const DEFAULT_SESSION_COUNT = 3;
const SHEET_TITLE = "Invigilation Duties for Admission Tests Fall 2026 (W.e.f. Monday, June 29, 2026)";

const defaultSchedule = {
  title: "Invigilation Duties for Admission Tests Fall 2026 (W.e.f. Monday, June 29, 2026)",
  dateHeading: "Monday, June 29, 2026",
  sessionCount: 3,
  sessionLabels: ["08:00 AM", "11:00 AM", "02:00 PM"],
  rows: [
    { date: "Monday, June 29, 2026", place: "IT Lab II, 2nd Floor, D Block", band: "lab-a", locked: false, fixedName: "Atyina Abbasi", pattern: "same", sessionNames: ["Muhammad Abdul Basit", "Muhammad Emaad Noor", "Muhammad Abdul Basit"] },
    { date: "Monday, June 29, 2026", place: "IT Lab III, 2nd Floor, D Block", band: "lab-a", locked: false, fixedName: "Laiba Majeed", pattern: "same", sessionNames: ["Fozan Athar", "Abdul Samad", "Fozan Athar"] },
    { date: "Monday, June 29, 2026", place: "IT Lab IV, 2nd Floor, D Block", band: "lab-a", locked: false, fixedName: "Asifa Minahil", pattern: "same", sessionNames: ["Muhammad Bilal Qasim", "Abdul Ahad Minhas", "Muhammad Bilal Qasim"] },
    { date: "Monday, June 29, 2026", place: "Margalla Lab I, 2nd Floor, C Block", band: "lab-b", locked: false, fixedName: "Mahnoor Ahmed Khan", pattern: "same", sessionNames: ["Muhammad Husnain Malik", "Mahad Kashif Siddique", "Muhammad Husnain Malik"] },
    { date: "Monday, June 29, 2026", place: "Margalla Lab III, 2nd Floor, C Block", band: "lab-b", locked: false, fixedName: "Musa Kamal Kiani", pattern: "same", sessionNames: ["Ahsan Ali Qamar", "Muhammad Kashif Zulfiqar", "Ahsan Ali Qamar"] },
    { date: "Monday, June 29, 2026", place: "Margalla Lab IV, 2nd Floor, C Block", band: "lab-b", locked: false, fixedName: "Maaz Sher", pattern: "same", sessionNames: ["Rayan Arshad", "Muneeb ur Rehman", "Rayan Arshad"] },
    { date: "Monday, June 29, 2026", place: "Documents", band: "blue", locked: true, fixedName: "Muhammad Abdullah Tanveer", pattern: "fixed", sessionNames: ["Muhammad Abdullah Tanveer", "Muhammad Abdullah Tanveer", "Muhammad Abdullah Tanveer"] },
    { date: "Monday, June 29, 2026", place: "Documents", band: "blue", locked: true, fixedName: "Sana Naz", pattern: "fixed", sessionNames: ["Sana Naz", "Muhammad Husnain Malik", "Sana Naz"] },
    { date: "Monday, June 29, 2026", place: "Documents", band: "blue", locked: true, fixedName: "Abdul Ahad Minhas", pattern: "fixed", sessionNames: ["Abdul Ahad Minhas", "Ahsan Ali Qamar", "Abdul Ahad Minhas"] },
    { date: "Monday, June 29, 2026", place: "Emails", band: "green", locked: true, fixedName: "Khuzaima Raheel", pattern: "fixed", sessionNames: ["Khuzaima Raheel", "Khuzaima Raheel", "Khuzaima Raheel"] },
    { date: "Monday, June 29, 2026", place: "Emails", band: "green", locked: false, fixedName: "", pattern: "same", sessionNames: ["Mahroosha Azmat", "Rayan Arshad", "Mahroosha Azmat"] },
    { date: "Monday, June 29, 2026", place: "Emails", band: "green", locked: false, fixedName: "", pattern: "same", sessionNames: ["Muhammad Emaad Noor", "Ayesha Yousaf", "Muhammad Emaad Noor"] },
    { date: "Monday, June 29, 2026", place: "Auditorium", band: "neutral", locked: false, fixedName: "", pattern: "same", sessionNames: ["Laiba Majeed", "Mahroosha Azmat", "Laiba Majeed"] },
    { date: "Monday, June 29, 2026", place: "Admissions", band: "purple", locked: true, fixedName: "Muhammad Muaaz", pattern: "fixed", sessionNames: ["Muhammad Muaaz", "Muhammad Muaaz", "Muhammad Muaaz"] },
    { date: "Monday, June 29, 2026", place: "Admissions", band: "purple", locked: false, fixedName: "", pattern: "same", sessionNames: ["Ayesha Yousaf", "Muhammad Bilal Qasim", "Ayesha Yousaf"] },
    { date: "Monday, June 29, 2026", place: "Front Desk", band: "neutral", locked: false, fixedName: "", pattern: "same", sessionNames: ["Abdul Samad", "Fozan Athar", "Abdul Samad"] },
    { date: "Monday, June 29, 2026", place: "Front Desk", band: "neutral", locked: false, fixedName: "", pattern: "same", sessionNames: ["Muneeb ur Rehman", "Muhammad Abdul Basit", "Muneeb ur Rehman"] },
    { date: "Monday, June 29, 2026", place: "Calls", band: "neutral", locked: false, fixedName: "", pattern: "alternate", sessionNames: ["Mahad Kashif Siddique", "", "Mahad Kashif Siddique"] },
    { date: "Monday, June 29, 2026", place: "Calls", band: "neutral", locked: false, fixedName: "", pattern: "same", sessionNames: ["Muhammad Kashif Zulfiqar", "", "Muhammad Kashif Zulfiqar"] }
  ]
};

const colorBands = {
  "lab-a": "lab-a",
  "lab-b": "lab-b",
  green: "green",
  blue: "blue",
  purple: "purple",
  neutral: "neutral"
};

const patternOptions = [
  { value: "same", label: "Session 1 = Session 3" },
  { value: "alternate", label: "Session 1 = Session 3, Session 2 different" },
  { value: "first-two", label: "Session 1 = Session 2, Session 3 different" },
  { value: "all-different", label: "All sessions different" },
  { value: "all-random", label: "Shuffle all sessions" },
  { value: "fixed", label: "Fixed in all sessions" }
];

const state = loadState();
const els = {
  sheetRoot: document.getElementById("sheetRoot"),
  legendRoot: document.getElementById("legendRoot"),
  statusText: document.getElementById("statusText"),
  noteInput: document.getElementById("noteInput"),
  dateHeadingInput: document.getElementById("dateHeadingInput"),
  shuffleModeSelect: document.getElementById("shuffleModeSelect"),
  importBtn: document.getElementById("importBtn"),
  xlsxInput: document.getElementById("xlsxInput"),
  exportBtn: document.getElementById("exportBtn"),
  randomizeBtn: document.getElementById("randomizeBtn"),
  restoreBtn: document.getElementById("restoreBtn"),
  clearSheetBtn: document.getElementById("clearSheetBtn"),
  fixRowBtn: document.getElementById("fixRowBtn"),
  clearFixedBtn: document.getElementById("clearFixedBtn"),
  fixedRowSelect: document.getElementById("fixedRowSelect"),
  fixedNameInput: document.getElementById("fixedNameInput"),
  printBtn: document.getElementById("printBtn"),
  addRowPlace: document.getElementById("addRowPlace"),
  addRowBand: document.getElementById("addRowBand"),
  addPattern: document.getElementById("addPattern"),
  addFixedName: document.getElementById("addFixedName"),
  addRowBtn: document.getElementById("addRowBtn")
};

render();
wireEvents();

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return cloneState(defaultSchedule);
  }

  try {
    const parsed = JSON.parse(raw);
    return normalizeState(parsed);
  } catch {
    return cloneState(defaultSchedule);
  }
}

function cloneState(source) {
  return {
    title: source.title || SHEET_TITLE,
    dateHeading: source.dateHeading || defaultSchedule.dateHeading,
    shuffleMode: source.shuffleMode || "same",
    sessionCount: source.sessionCount || DEFAULT_SESSION_COUNT,
    sessionLabels: Array.isArray(source.sessionLabels) ? [...source.sessionLabels] : [...defaultSchedule.sessionLabels],
    note: source.note || "",
    rows: (source.rows || []).map((row) => cloneRow(row, source.sessionCount || DEFAULT_SESSION_COUNT))
  };
}

function cloneRow(row, sessionCount) {
  return {
    place: row.place || "",
    band: row.band || "neutral",
    locked: Boolean(row.locked),
    fixedName: row.fixedName || "",
    pattern: row.pattern || "same",
    sessionNames: Array.from({ length: sessionCount }, (_, index) => row.sessionNames?.[index] || "")
  };
}

function normalizeState(parsed) {
  const sessionCount = clampNumber(parsed.sessionCount, 1, 8, DEFAULT_SESSION_COUNT);
  return {
    title: parsed.title || SHEET_TITLE,
    dateHeading: parsed.dateHeading || defaultSchedule.dateHeading,
    shuffleMode: typeof parsed.shuffleMode === "string" ? parsed.shuffleMode : "same",
    sessionCount,
    sessionLabels: normalizeSessionLabels(parsed.sessionLabels, sessionCount),
    note: typeof parsed.note === "string" ? parsed.note : "",
    rows: Array.isArray(parsed.rows)
      ? parsed.rows.map((row) => cloneRow(row, sessionCount))
      : cloneState(defaultSchedule).rows
  };
}

function normalizeSessionLabels(labels, sessionCount) {
  const defaults = [...defaultSchedule.sessionLabels];
  while (defaults.length < sessionCount) {
    defaults.push(`Session ${defaults.length + 1}`);
  }
  if (!Array.isArray(labels) || !labels.length) return defaults.slice(0, sessionCount);
  const copy = labels.slice(0, sessionCount).map((label, index) => label || defaults[index] || `Session ${index + 1}`);
  while (copy.length < sessionCount) {
    copy.push(defaults[copy.length] || `Session ${copy.length + 1}`);
  }
  return copy;
}

function saveState() {
  state.note = els.noteInput.value.trim();
  state.dateHeading = els.dateHeadingInput ? els.dateHeadingInput.value.trim() || state.dateHeading || defaultSchedule.dateHeading : state.dateHeading || defaultSchedule.dateHeading;
  if (els.shuffleModeSelect) state.shuffleMode = els.shuffleModeSelect.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateStatus();
}

function render() {
  els.sheetRoot.innerHTML = buildSheetHtml();
  els.legendRoot.innerHTML = buildLegendHtml();
  els.noteInput.value = state.note || "";
  if (els.dateHeadingInput) els.dateHeadingInput.value = state.dateHeading || defaultSchedule.dateHeading;
  if (els.shuffleModeSelect) els.shuffleModeSelect.value = state.shuffleMode || "same";
  populatePatternSelect();
  populateFixedRowSelect();
  updateStatus();
}

function buildLegendHtml() {
  return `
    <div class="legend-item legend-blue"><span></span><p>Blue rows are fixed responsibilities and remain locked.</p></div>
    <div class="legend-item legend-green"><span></span><p>Green rows represent email duties.</p></div>
    <div class="legend-item legend-purple"><span></span><p>Purple rows represent admissions duties.</p></div>
    <div class="legend-item legend-neutral"><span></span><p>Neutral rows can be randomized by pattern.</p></div>
  `;
}

function populatePatternSelect() {
  const select = document.getElementById("addPattern");
  if (!select) return;
  select.innerHTML = patternOptions.map((option) => `<option value="${option.value}">${option.label}</option>`).join("");
}

function populateFixedRowSelect() {
  const select = els.fixedRowSelect;
  if (!select) return;
  select.innerHTML = state.rows
    .map((row, index) => {
      const label = `${index + 1}. ${row.place || "Unnamed place"}`;
      return `<option value="${index}">${escapeHtml(label)}</option>`;
    })
    .join("");
}

function clearSpreadsheet() {
  state.rows = state.rows.map((row) => ({
    ...row,
    fixedName: "",
    locked: row.band === "blue",
    sessionNames: Array.from({ length: state.sessionCount }, () => "")
  }));
  state.note = "";
}

function buildSheetHtml() {
  const sessionHead = state.sessionLabels
    .map((label, index) => `<th class="session-head">${getOrdinalLabel(index + 1)} Session<br />Reporting Time<br />${escapeHtml(label)}</th>`)
    .join("");
  const sessionSubHead = state.sessionLabels.map(() => `<th>Invigilator</th>`).join("");
  const totalColumns = 1 + state.sessionCount + 1;

  const rows = state.rows
    .map((row, index) => {
      const sessionCells = row.sessionNames
        .map((name, sessionIndex) => {
          return `<td class="session-cell ${row.locked ? "locked" : ""}">
            <input data-row="${index}" data-session="${sessionIndex}" value="${escapeHtml(name)}" ${row.locked ? "readonly" : ""} />
          </td>`;
        })
        .join("");

      return `
        <tr class="row-${colorBands[row.band] || "neutral"} ${row.locked ? "row-locked" : ""}">
          <th class="place-cell">
            <input data-row="${index}" data-field="place" value="${escapeHtml(row.place)}" ${row.locked ? "readonly" : ""} />
          </th>
          ${sessionCells}
          <td class="fixed-cell">
            <input data-row="${index}" data-field="fixedName" value="${escapeHtml(row.fixedName)}" ${row.locked ? "readonly" : ""} />
          </td>
        </tr>
      `;
    })
    .join("");

  return `
    <table class="sheet-table">
      <thead>
        <tr class="title-row"><th colspan="${totalColumns}">${escapeHtml(state.title)}</th></tr>
        <tr class="subtitle-row"><th colspan="${totalColumns}">${escapeHtml(state.dateHeading || defaultSchedule.dateHeading)}</th></tr>
        <tr class="session-row">
          <th rowspan="2" class="place-head">Computer Labs</th>
          ${sessionHead}
          <th rowspan="2" class="fixed-head">FDO (fixed in all three sessions)</th>
        </tr>
        <tr class="session-subrow">${sessionSubHead}</tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function wireEvents() {
  document.addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (target.id === "dateHeadingInput") {
      state.dateHeading = target.value;
      saveState();
      return;
    }
    const rowIndex = Number(target.dataset.row);
    if (!Number.isInteger(rowIndex) || !state.rows[rowIndex]) return;

    if (target.dataset.field === "place") state.rows[rowIndex].place = target.value;
    if (target.dataset.field === "fixedName") state.rows[rowIndex].fixedName = target.value;
    if (target.dataset.session !== undefined) {
      const sessionIndex = Number(target.dataset.session);
      state.rows[rowIndex].sessionNames[sessionIndex] = target.value;
    }
    saveState();
  });

  els.noteInput.addEventListener("input", () => {
    state.note = els.noteInput.value;
    saveState();
  });

  els.randomizeBtn.addEventListener("click", () => {
    randomizeSchedule();
    render();
    saveState();
  });

  els.restoreBtn.addEventListener("click", () => {
    const restored = cloneState(defaultSchedule);
    state.title = restored.title;
    state.sessionCount = restored.sessionCount;
    state.sessionLabels = restored.sessionLabels;
    state.rows = restored.rows;
    state.note = "";
    render();
    saveState();
  });

  els.importBtn.addEventListener("click", () => {
    els.xlsxInput.value = "";
    els.xlsxInput.click();
  });

  els.xlsxInput.addEventListener("change", async () => {
    const file = els.xlsxInput.files && els.xlsxInput.files[0];
    if (file) await importWorkbookFile(file);
  });

  if (els.shuffleModeSelect) {
    els.shuffleModeSelect.addEventListener("change", () => {
      state.shuffleMode = els.shuffleModeSelect.value;
      saveState();
    });
  }

  els.exportBtn.addEventListener("click", exportXlsx);
  els.printBtn.addEventListener("click", () => window.print());
  els.clearSheetBtn.addEventListener("click", () => {
    clearSpreadsheet();
    render();
    saveState();
  });
  els.fixRowBtn.addEventListener("click", () => {
    const rowIndex = Number(els.fixedRowSelect.value);
    const fixedName = els.fixedNameInput.value.trim();
    if (!Number.isInteger(rowIndex) || !state.rows[rowIndex]) return;
    if (!fixedName) return;
    const row = state.rows[rowIndex];
    row.fixedName = fixedName;
    row.sessionNames = Array.from({ length: state.sessionCount }, () => fixedName);
    row.locked = true;
    render();
    saveState();
  });

  els.clearFixedBtn.addEventListener("click", () => {
    const rowIndex = Number(els.fixedRowSelect.value);
    if (!Number.isInteger(rowIndex) || !state.rows[rowIndex]) return;
    const row = state.rows[rowIndex];
    row.fixedName = "";
    row.sessionNames = Array.from({ length: state.sessionCount }, () => "");
    row.locked = false;
    render();
    saveState();
  });

  els.addRowBtn.addEventListener("click", () => {
    addNewRow();
    render();
    saveState();
  });
}

async function importWorkbookFile(file) {
  if (typeof XLSX === "undefined") {
    alert("XLSX parser is not available right now.");
    return;
  }

  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });
  const firstSheetName = workbook.SheetNames[0];
  const matrix = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName], { header: 1, defval: "" });
  const imported = parseWorkbookMatrix(matrix);
  state.title = imported.title;
  state.dateHeading = imported.dateHeading;
  state.sessionCount = imported.sessionCount;
  state.sessionLabels = imported.sessionLabels;
  state.rows = imported.rows;
  render();
  saveState();
}

function parseWorkbookMatrix(matrix) {
  const title = String(matrix?.[0]?.[0] || SHEET_TITLE).trim();
  const dateHeading = String(matrix?.[1]?.[0] || defaultSchedule.dateHeading).trim();
  const sessionCount = Math.max(1, inferSessionCount(matrix));
  const sessionLabels = Array.from({ length: sessionCount }, (_, index) => inferSessionLabel(matrix, index));
  const layout = detectWorkbookLayout(matrix);
  const dataRows = matrix.slice(layout.dataStartRow).filter((row) => String(row?.[layout.placeIndex] || "").trim());

  const rows = dataRows.map((row, index) => {
    const place = String(row[layout.placeIndex] || "").trim();
    const sessionNames = Array.from({ length: sessionCount }, (_, sessionIndex) => String(row[layout.sessionStartIndex + sessionIndex] || "").trim());
    const fixedName = String(row[layout.fixedIndex] || "").trim();
    const band = inferBand(place, fixedName, index);
    const locked = Boolean(fixedName) || band === "blue";
    return {
      place,
      band,
      locked,
      fixedName,
      pattern: inferPattern(sessionNames),
      sessionNames
    };
  });

  return {
    title,
    dateHeading,
    sessionCount,
    sessionLabels,
    rows
  };
}

function detectWorkbookLayout(matrix) {
  const headerRow = matrix[2] || [];
  const labelRow = matrix[3] || [];
  const isNewLayout = String(headerRow[0] || "").toLowerCase().includes("date") && String(headerRow[1] || "").toLowerCase().includes("computer labs");

  if (isNewLayout) {
    return {
      dataStartRow: 4,
      placeIndex: 1,
      sessionStartIndex: 2,
      fixedIndex: 5
    };
  }

  const fdoMarkers = labelRow.filter((cell) => /fdo\s*1|invigilator/i.test(String(cell || ""))).length;
  const sessionCount = Math.max(1, Math.floor(fdoMarkers / 1) || DEFAULT_SESSION_COUNT);

  return {
    dataStartRow: 4,
    placeIndex: 1,
    sessionStartIndex: 2,
    fixedIndex: 2 + sessionCount
  };
}

function inferSessionCount(matrix) {
  const headerRow = matrix[3] || [];
  const markers = headerRow.filter((cell) => /invigilator|fdo\s*1/i.test(String(cell || ""))).length;
  return Math.max(3, markers || DEFAULT_SESSION_COUNT);
}

function inferSessionLabel(matrix, index) {
  const row = matrix[2] || [];
  const cell = String(row[2 + index] || "").trim();
  return cell || defaultSchedule.sessionLabels[index] || `Session ${index + 1}`;
}

function inferBand(place, fixedName, index) {
  const text = `${place} ${fixedName}`.toLowerCase();
  if (text.includes("documents")) return "blue";
  if (text.includes("emails")) return "green";
  if (text.includes("admissions")) return "purple";
  if (text.includes("lab ii") || text.includes("lab iii") || text.includes("lab iv") || text.includes("margalla")) return index < 6 ? "lab-a" : "lab-b";
  return "neutral";
}

function inferPattern(sessionNames) {
  const first = sessionNames[0] || "";
  const second = sessionNames[1] || "";
  const third = sessionNames[2] || "";
  if (first && first === second && second === third) return "fixed";
  if (first === third && first !== second) return "alternate";
  if (first === third) return "same";
  return "all-different";
}

function randomizeSchedule() {
  const sessionCount = state.sessionCount;
  const pool = shuffle(getDistinctNames(state.rows.concat(defaultSchedule.rows)));

  for (const row of state.rows) {
    if (row.locked) continue;

    if (row.pattern === "fixed") {
      row.fixedName = row.fixedName || pickRandom(pool);
      row.sessionNames = Array.from({ length: sessionCount }, () => row.fixedName);
      row.locked = true;
      continue;
    }

    if (row.band === "blue") {
      row.locked = true;
      row.fixedName = row.fixedName || row.sessionNames[0] || pickRandom(pool);
      row.sessionNames = row.sessionNames.map(() => row.fixedName);
      continue;
    }

    const s1 = pickRandom(pool);
    let s2 = pickRandom(pool);
    let s3 = s1;

    if (row.pattern === "alternate") {
      s2 = pickRandom(pool, [s1]);
      s3 = s1;
    } else if (row.pattern === "first-two") {
      s2 = s1;
      s3 = pickRandom(pool, [s1]);
    } else if (row.pattern === "all-different") {
      s2 = pickRandom(pool, [s1]);
      s3 = pickRandom(pool, [s1, s2]);
    } else if (row.pattern === "all-random") {
      s2 = pickRandom(pool);
      s3 = pickRandom(pool);
    } else {
      s3 = s1;
    }

    row.sessionNames = Array.from({ length: sessionCount }, (_, index) => {
      if (index === 0) return s1;
      if (index === 1) return s2;
      if (index === 2) return s3;
      return pickRandom(pool);
    });
  }

  for (const row of state.rows.filter((row) => row.locked)) {
    row.sessionNames = Array.from({ length: sessionCount }, () => row.fixedName || row.sessionNames[0] || "");
  }
}

function getShuffleMode() {
  return state.shuffleMode || "same-start-end";
}

function getDistinctNames(rows) {
  const names = new Set();
  rows.forEach((row) => {
    row.sessionNames?.forEach((name) => {
      if (name) names.add(name);
    });
    if (row.fixedName) names.add(row.fixedName);
  });
  return [...names];
}

function pickNext(pool, avoid = []) {
  const remaining = pool.filter((name) => !avoid.includes(name));
  const source = remaining.length ? remaining : pool;
  if (!source.length) return "";
  return source.splice(Math.floor(Math.random() * source.length), 1)[0];
}

function pickRandom(pool, avoid = []) {
  const remaining = pool.filter((name) => !avoid.includes(name));
  const source = remaining.length ? remaining : pool;
  if (!source.length) return "";
  return source[Math.floor(Math.random() * source.length)];
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}

function exportXlsx() {
  if (typeof XLSX === "undefined") {
    alert("XLSX exporter is not available right now.");
    return;
  }

  const header1 = [state.title, "", "", "", "", "", ""];
  const header2 = [state.dateHeading || defaultSchedule.dateHeading, "", "", "", "", "", ""];
  const header3 = ["Computer Labs"];
  const header4 = [""];
  state.sessionLabels.forEach((label, index) => {
    header3.push(`${getOrdinalLabel(index + 1)} Session (Invigilator)`);
    header4.push(`Reporting Time ${label}`);
  });
  header3.push("FDO(fixed in all three sessions )");
  header4.push("");

  const rows = [header1, header2, header3, header4];
  state.rows.forEach((row) => {
    rows.push([row.place, ...row.sessionNames, row.fixedName, row.locked ? "Fixed" : "Open"]);
  });

  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Invigilation Duties");
  XLSX.writeFile(workbook, "invigilation-duties-export.xlsx");
}

function addNewRow() {
  const place = els.addRowPlace.value.trim();
  if (!place) return;
  const band = els.addRowBand.value || "neutral";
  const pattern = els.addPattern.value || "same";
  const fixedName = els.addFixedName.value.trim();
  const locked = band === "blue" || pattern === "fixed" || Boolean(fixedName);
  state.rows.push({
    place,
    band,
    locked,
    fixedName,
    pattern,
    sessionNames: Array.from({ length: state.sessionCount }, () => fixedName || "")
  });
  els.addRowPlace.value = "";
  els.addFixedName.value = "";
}

function updateStatus() {
  const locked = state.rows.filter((row) => row.locked).length;
  els.statusText.textContent = `${state.rows.length} places, ${state.sessionCount} sessions, ${locked} fixed rows`;
}

function getOrdinalLabel(number) {
  const suffix = number % 10 === 1 && number % 100 !== 11 ? "st" : number % 10 === 2 && number % 100 !== 12 ? "nd" : number % 10 === 3 && number % 100 !== 13 ? "rd" : "th";
  return `${number}${suffix}`;
}

function clampNumber(value, min, max, fallback) {
  const parsed = Number.parseInt(String(value), 10);
  if (Number.isNaN(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
