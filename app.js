const STORAGE_KEY = "fdo-duty-allocator-v1";

const sampleState = {
  fdos: [
    { id: crypto.randomUUID(), name: "Aman Khan", role: "Lab", maxLoad: 3, active: true },
    { id: crypto.randomUUID(), name: "Sara Ali", role: "Civil", maxLoad: 2, active: true },
    { id: crypto.randomUUID(), name: "Usman Raza", role: "Lab", maxLoad: 3, active: true },
    { id: crypto.randomUUID(), name: "Hira Noor", role: "Patrol", maxLoad: 2, active: true },
    { id: crypto.randomUUID(), name: "Bilal Ahmed", role: "Civil", maxLoad: 3, active: true },
    { id: crypto.randomUUID(), name: "Mariam Shah", role: "Security", maxLoad: 2, active: true },
    { id: crypto.randomUUID(), name: "Noman Iqbal", role: "Lab", maxLoad: 3, active: true },
    { id: crypto.randomUUID(), name: "Ayesha Khan", role: "Civil", maxLoad: 2, active: true },
    { id: crypto.randomUUID(), name: "Zubair Malik", role: "Patrol", maxLoad: 3, active: true },
    { id: crypto.randomUUID(), name: "Mahnoor Gill", role: "Security", maxLoad: 2, active: true },
    { id: crypto.randomUUID(), name: "Farhan Sheikh", role: "Lab", maxLoad: 3, active: true },
    { id: crypto.randomUUID(), name: "Iqra Butt", role: "Civil", maxLoad: 2, active: true },
    { id: crypto.randomUUID(), name: "Hassan Rauf", role: "Patrol", maxLoad: 3, active: true },
    { id: crypto.randomUUID(), name: "Eman Javed", role: "Security", maxLoad: 2, active: true },
    { id: crypto.randomUUID(), name: "Daniyal Noor", role: "Lab", maxLoad: 3, active: true },
    { id: crypto.randomUUID(), name: "Areeba Siddiqui", role: "Civil", maxLoad: 2, active: true },
    { id: crypto.randomUUID(), name: "Kashif Ali", role: "Patrol", maxLoad: 3, active: true },
    { id: crypto.randomUUID(), name: "Nimra Tariq", role: "Security", maxLoad: 2, active: true },
    { id: crypto.randomUUID(), name: "Taha Jamil", role: "Lab", maxLoad: 3, active: true },
    { id: crypto.randomUUID(), name: "Rabia Afzal", role: "Civil", maxLoad: 2, active: true }
  ],
  duties: [
    { id: crypto.randomUUID(), name: "Lab duty morning", category: "Lab", requiredRole: "Lab", fixedFdoId: "", assignedFdoId: "", locked: false },
    { id: crypto.randomUUID(), name: "Lab duty evening", category: "Lab", requiredRole: "Lab", fixedFdoId: "", assignedFdoId: "", locked: false },
    { id: crypto.randomUUID(), name: "Civil desk", category: "Civil", requiredRole: "Civil", fixedFdoId: "", assignedFdoId: "", locked: false },
    { id: crypto.randomUUID(), name: "Civil backup", category: "Civil", requiredRole: "", fixedFdoId: "", assignedFdoId: "", locked: false },
    { id: crypto.randomUUID(), name: "Patrol gate 1", category: "Surveillance", requiredRole: "Patrol", fixedFdoId: "", assignedFdoId: "", locked: false },
    { id: crypto.randomUUID(), name: "Patrol gate 2", category: "Surveillance", requiredRole: "Patrol", fixedFdoId: "", assignedFdoId: "", locked: false },
    { id: crypto.randomUUID(), name: "Security checkpoint", category: "Security", requiredRole: "Security", fixedFdoId: "", assignedFdoId: "", locked: false },
    { id: crypto.randomUUID(), name: "Main hall watch", category: "Surveillance", requiredRole: "", fixedFdoId: "", assignedFdoId: "", locked: false },
    { id: crypto.randomUUID(), name: "Call duty block A", category: "Call", requiredRole: "", fixedFdoId: "", assignedFdoId: "", locked: false },
    { id: crypto.randomUUID(), name: "Call duty block B", category: "Call", requiredRole: "", fixedFdoId: "", assignedFdoId: "", locked: false },
    { id: crypto.randomUUID(), name: "Night round", category: "Surveillance", requiredRole: "", fixedFdoId: "", assignedFdoId: "", locked: false },
    { id: crypto.randomUUID(), name: "Reserve duty", category: "General", requiredRole: "", fixedFdoId: "", assignedFdoId: "", locked: false }
  ],
  history: [],
  note: ""
};

const state = loadState();
const els = {
  totalFdos: document.getElementById("totalFdos"),
  totalDuties: document.getElementById("totalDuties"),
  lockedCount: document.getElementById("lockedCount"),
  unassignedCount: document.getElementById("unassignedCount"),
  fdoList: document.getElementById("fdoList"),
  dutyList: document.getElementById("dutyList"),
  assignmentRows: document.getElementById("assignmentRows"),
  newDutyFixedFdo: document.getElementById("newDutyFixedFdo"),
  repeatMode: document.getElementById("repeatMode"),
  defaultMaxLoad: document.getElementById("defaultMaxLoad"),
  allocationNote: document.getElementById("allocationNote"),
  allocationNoteCard: document.getElementById("allocationNoteCard")
};

const dom = {
  randomizeAllBtn: document.getElementById("randomizeAllBtn"),
  rerollUnlockedBtn: document.getElementById("rerollUnlockedBtn"),
  exportCsvBtn: document.getElementById("exportCsvBtn"),
  printBtn: document.getElementById("printBtn"),
  clearAssignmentsBtn: document.getElementById("clearAssignmentsBtn"),
  exportStateBtn: document.getElementById("exportStateBtn"),
  resetSampleDataBtn: document.getElementById("resetSampleDataBtn"),
  fdoForm: document.getElementById("fdoForm"),
  dutyForm: document.getElementById("dutyForm")
};

seedNoteFromState();
renderAll();
wireEvents();

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return structuredClone(sampleState);
  }

  try {
    const parsed = JSON.parse(raw);
    return {
      ...structuredClone(sampleState),
      ...parsed,
      fdos: Array.isArray(parsed.fdos) ? parsed.fdos : structuredClone(sampleState.fdos),
      duties: Array.isArray(parsed.duties) ? parsed.duties : structuredClone(sampleState.duties),
      history: Array.isArray(parsed.history) ? parsed.history : []
    };
  } catch {
    return structuredClone(sampleState);
  }
}

function saveState() {
  state.note = els.allocationNote.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateSummary();
}

function seedNoteFromState() {
  els.repeatMode.value = state.repeatMode || "balanced";
  els.defaultMaxLoad.value = String(state.defaultMaxLoad || 3);
  els.allocationNote.value = state.note || "";
}

function renderAll() {
  renderSummary();
  renderFdos();
  renderDuties();
  renderAssignments();
  populateFixedFdoOptions();
  saveState();
}

function renderSummary() {
  const totalFdos = state.fdos.length;
  const totalDuties = state.duties.length;
  const lockedCount = state.duties.filter((duty) => duty.locked || duty.fixedFdoId).length;
  const unassignedCount = state.duties.filter((duty) => !duty.assignedFdoId).length;

  els.totalFdos.textContent = String(totalFdos);
  els.totalDuties.textContent = String(totalDuties);
  els.lockedCount.textContent = String(lockedCount);
  els.unassignedCount.textContent = String(unassignedCount);

  const note = els.allocationNote.value.trim();
  els.allocationNoteCard.querySelector("p").textContent = note
    ? note
    : "Use the note field above to keep context for this allocation round.";
}

function updateSummary() {
  const lockedCount = state.duties.filter((duty) => duty.locked || duty.fixedFdoId).length;
  const unassignedCount = state.duties.filter((duty) => !duty.assignedFdoId).length;
  els.lockedCount.textContent = String(lockedCount);
  els.unassignedCount.textContent = String(unassignedCount);
  els.totalFdos.textContent = String(state.fdos.length);
  els.totalDuties.textContent = String(state.duties.length);
}

function renderFdos() {
  els.fdoList.innerHTML = state.fdos
    .map((fdo) => {
      const load = dutyLoadFor(fdo.id);
      return `
        <article class="record">
          <div class="record-grid">
            <div>
              <input data-type="fdo-name" data-id="${fdo.id}" value="${escapeHtml(fdo.name)}" aria-label="FDO name" />
              <div class="mini">Role: ${escapeHtml(fdo.role)}</div>
            </div>
            <input data-type="fdo-role" data-id="${fdo.id}" value="${escapeHtml(fdo.role)}" aria-label="Role" />
            <input data-type="fdo-maxLoad" data-id="${fdo.id}" type="number" min="1" max="20" value="${Number(fdo.maxLoad || 3)}" aria-label="Max load" />
            <label class="toggle-inline" style="padding-bottom:0;">
              <input data-type="fdo-active" data-id="${fdo.id}" type="checkbox" ${fdo.active ? "checked" : ""} />
              Active
            </label>
            <div class="actions">
              <span class="badge">Load ${load}/${Number(fdo.maxLoad || 3)}</span>
              <button class="ghost" data-action="delete-fdo" data-id="${fdo.id}">Delete</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderDuties() {
  els.dutyList.innerHTML = state.duties
    .map((duty) => {
      const assigned = state.fdos.find((fdo) => fdo.id === duty.assignedFdoId);
      const fixed = state.fdos.find((fdo) => fdo.id === duty.fixedFdoId);
      const selectOptions = state.fdos
        .map(
          (fdo) => `<option value="${fdo.id}" ${fdo.id === duty.fixedFdoId ? "selected" : ""}>${escapeHtml(fdo.name)}</option>`
        )
        .join("");

      return `
        <article class="record">
          <div class="record-grid duty-grid">
            <div>
              <input data-type="duty-name" data-id="${duty.id}" value="${escapeHtml(duty.name)}" aria-label="Duty name" />
              <div class="mini">${escapeHtml(duty.category || "General")}</div>
            </div>
            <input data-type="duty-category" data-id="${duty.id}" value="${escapeHtml(duty.category || "")}" aria-label="Category" />
            <input data-type="duty-requiredRole" data-id="${duty.id}" value="${escapeHtml(duty.requiredRole || "")}" placeholder="Any" aria-label="Required role" />
            <select data-type="duty-fixedFdoId" data-id="${duty.id}" aria-label="Fixed FDO">
              <option value="">No fixed FDO</option>
              ${selectOptions}
            </select>
            <div>
              <div class="badge ${duty.fixedFdoId ? "fixed" : ""}">${duty.fixedFdoId ? "Fixed" : "Open"}</div>
              <div class="mini">${assigned ? `Assigned: ${escapeHtml(assigned.name)}` : "Unassigned"}</div>
            </div>
            <div class="actions">
              <label class="toggle-inline" style="padding-bottom:0;">
                <input data-type="duty-locked" data-id="${duty.id}" type="checkbox" ${duty.locked ? "checked" : ""} />
                Lock
              </label>
              <button class="ghost" data-action="delete-duty" data-id="${duty.id}">Delete</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderAssignments() {
  els.assignmentRows.innerHTML = state.duties
    .map((duty) => {
      const options = state.fdos
        .map(
          (fdo) => `<option value="${fdo.id}" ${fdo.id === duty.assignedFdoId ? "selected" : ""}>${escapeHtml(fdo.name)} (${escapeHtml(fdo.role)})</option>`
        )
        .join("");
      const assigned = state.fdos.find((fdo) => fdo.id === duty.assignedFdoId);
      const fixed = state.fdos.find((fdo) => fdo.id === duty.fixedFdoId);

      return `
        <tr>
          <td>${escapeHtml(duty.name)}</td>
          <td>${escapeHtml(duty.category || "General")}</td>
          <td>${escapeHtml(duty.requiredRole || "Any")}</td>
          <td>
            <select data-action="assign-select" data-id="${duty.id}">
              <option value="">Select FDO</option>
              ${options}
            </select>
          </td>
          <td>${fixed ? `<span class="badge fixed">${escapeHtml(fixed.name)}</span>` : "<span class=\"badge off\">No</span>"}</td>
          <td>
            <div class="cell-actions">
              <input data-action="assignment-lock" data-id="${duty.id}" type="checkbox" ${duty.locked ? "checked" : ""} />
              <span>${duty.locked ? "Locked" : "Open"}</span>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");
}

function populateFixedFdoOptions() {
  els.newDutyFixedFdo.innerHTML = `
    <option value="">No fixed FDO</option>
    ${state.fdos.map((fdo) => `<option value="${fdo.id}">${escapeHtml(fdo.name)}</option>`).join("")}
  `;
}

function wireEvents() {
  dom.fdoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(dom.fdoForm);
    const name = String(form.get("name") || "").trim();
    const role = String(form.get("role") || "").trim();
    const maxLoad = clampNumber(form.get("maxLoad"), 1, 20, 3);
    const active = form.get("active") === "on";

    if (!name || !role) return;

    state.fdos.unshift({ id: crypto.randomUUID(), name, role, maxLoad, active });
    dom.fdoForm.reset();
    dom.fdoForm.querySelector('[name="maxLoad"]').value = "3";
    dom.fdoForm.querySelector('[name="active"]').checked = true;
    renderAll();
  });

  dom.dutyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(dom.dutyForm);
    const name = String(form.get("name") || "").trim();
    const category = String(form.get("category") || "").trim();
    const requiredRole = String(form.get("requiredRole") || "").trim();
    const fixedFdoId = String(form.get("fixedFdoId") || "");

    if (!name || !category) return;

    state.duties.unshift({
      id: crypto.randomUUID(),
      name,
      category,
      requiredRole,
      fixedFdoId,
      assignedFdoId: "",
      locked: false
    });
    dom.dutyForm.reset();
    populateFixedFdoOptions();
    renderAll();
  });

  document.addEventListener("input", handleInput);
  document.addEventListener("change", handleChange);
  document.addEventListener("click", handleClick);

  dom.randomizeAllBtn.addEventListener("click", () => randomizeAssignments({ keepLocked: true }));
  dom.rerollUnlockedBtn.addEventListener("click", () => randomizeAssignments({ keepLocked: true, onlyUnlocked: true }));
  dom.clearAssignmentsBtn.addEventListener("click", clearUnlockedAssignments);
  dom.exportCsvBtn.addEventListener("click", exportCsv);
  dom.exportStateBtn.addEventListener("click", exportBackupJson);
  dom.printBtn.addEventListener("click", () => window.print());
  dom.resetSampleDataBtn.addEventListener("click", resetSampleData);

  els.repeatMode.addEventListener("change", () => {
    state.repeatMode = els.repeatMode.value;
    saveState();
  });

  els.defaultMaxLoad.addEventListener("change", () => {
    state.defaultMaxLoad = clampNumber(els.defaultMaxLoad.value, 1, 20, 3);
    els.defaultMaxLoad.value = String(state.defaultMaxLoad);
    saveState();
  });

  els.allocationNote.addEventListener("input", () => {
    state.note = els.allocationNote.value.trim();
    renderSummary();
    saveState();
  });
}

function handleInput(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const id = target.dataset.id;
  const type = target.dataset.type;
  if (!id || !type) return;

  if (type.startsWith("fdo-")) {
    const fdo = state.fdos.find((item) => item.id === id);
    if (!fdo) return;

    if (type === "fdo-name") fdo.name = target.value;
    if (type === "fdo-role") fdo.role = target.value;
    if (type === "fdo-maxLoad") fdo.maxLoad = clampNumber(target.value, 1, 20, 3);
    renderAll();
    return;
  }

  if (type.startsWith("duty-")) {
    const duty = state.duties.find((item) => item.id === id);
    if (!duty) return;

    if (type === "duty-name") duty.name = target.value;
    if (type === "duty-category") duty.category = target.value;
    if (type === "duty-requiredRole") duty.requiredRole = target.value;
    if (type === "duty-fixedFdoId") {
      duty.fixedFdoId = target.value;
      if (target.value) {
        duty.assignedFdoId = target.value;
        duty.locked = true;
      } else {
        duty.assignedFdoId = "";
        duty.locked = false;
      }
    }
    renderAll();
    return;
  }

  if (type === "assignment-select") return;
}

function handleChange(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const id = target.dataset.id;
  const action = target.dataset.action;
  const type = target.dataset.type;

  if (!id) return;

  if (action === "assignment-lock" || type === "duty-locked") {
    const duty = state.duties.find((item) => item.id === id);
    if (!duty) return;
    duty.locked = target.checked;
    if (duty.locked && duty.fixedFdoId && !duty.assignedFdoId) {
      duty.assignedFdoId = duty.fixedFdoId;
    }
    saveState();
    renderAssignments();
    return;
  }

  if (action === "assign-select") {
    const duty = state.duties.find((item) => item.id === id);
    if (!duty) return;
    duty.assignedFdoId = target.value;
    duty.locked = Boolean(target.value);
    saveState();
    renderAll();
  }
}

function handleClick(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const action = target.dataset.action;
  const id = target.dataset.id;
  if (!action || !id) return;

  if (action === "delete-fdo") {
    state.fdos = state.fdos.filter((item) => item.id !== id);
    state.duties = state.duties.map((duty) =>
      duty.fixedFdoId === id || duty.assignedFdoId === id ? { ...duty, fixedFdoId: "", assignedFdoId: "", locked: false } : duty
    );
    renderAll();
    return;
  }

  if (action === "delete-duty") {
    state.duties = state.duties.filter((item) => item.id !== id);
    renderAll();
  }
}

function randomizeAssignments({ keepLocked, onlyUnlocked = false }) {
  const duties = onlyUnlocked ? state.duties.filter((duty) => !duty.locked) : state.duties;

  const activeFdos = state.fdos.filter((fdo) => fdo.active);
  const counts = new Map(activeFdos.map((fdo) => [fdo.id, dutyLoadFor(fdo.id)]));
  const historyWeight = getHistoryWeights();

  for (const duty of duties) {
    if (duty.fixedFdoId) {
      duty.assignedFdoId = duty.fixedFdoId;
      duty.locked = true;
      continue;
    }

    if (keepLocked && duty.locked && duty.assignedFdoId) {
      continue;
    }

    const candidates = activeFdos.filter((fdo) => {
      if (duty.requiredRole && !matchesRole(fdo.role, duty.requiredRole)) return false;
      const currentLoad = counts.get(fdo.id) || 0;
      const maxLoad = Number(fdo.maxLoad || els.defaultMaxLoad.value || 3);
      return currentLoad < maxLoad;
    });

    const pool = candidates.length ? candidates : activeFdos.filter((fdo) => {
      if (duty.requiredRole && !matchesRole(fdo.role, duty.requiredRole)) return false;
      return true;
    });

    const selected = weightedPick(pool, duty, historyWeight) || null;
    duty.assignedFdoId = selected ? selected.id : "";
    if (selected) {
      counts.set(selected.id, (counts.get(selected.id) || 0) + 1);
      state.history.unshift({ dutyId: duty.id, fdoId: selected.id, at: Date.now() });
      state.history = state.history.slice(0, 120);
    }
    if (!duty.locked) {
      duty.locked = false;
    }
  }

  state.repeatMode = els.repeatMode.value;
  saveState();
  renderAll();
}

function clearUnlockedAssignments() {
  state.duties = state.duties.map((duty) => {
    if (duty.locked || duty.fixedFdoId) return duty;
    return { ...duty, assignedFdoId: "" };
  });
  saveState();
  renderAll();
}

function weightedPick(pool, duty, historyWeight) {
  if (!pool.length) return null;

  const repeatMode = els.repeatMode.value;
  const weights = pool.map((fdo) => {
    const sameDutyRepeats = historyWeight.sameDutyCounts.get(`${duty.id}:${fdo.id}`) || 0;
    const recent = historyWeight.recentCounts.get(fdo.id) || 0;
    const load = dutyLoadFor(fdo.id);
    const capacity = Number(fdo.maxLoad || els.defaultMaxLoad.value || 3);
    let score = 1;

    if (repeatMode === "balanced") {
      score /= 1 + sameDutyRepeats * 3 + recent * 0.35 + load * 0.2;
    } else if (repeatMode === "strict") {
      score /= 1 + sameDutyRepeats * 6 + recent * 0.7 + load * 0.35;
    } else {
      score /= 1 + sameDutyRepeats * 2 + recent * 0.15 + load * 0.1;
    }

    if (capacity <= load) {
      score *= 0.25;
    }

    return { fdo, score };
  });

  const total = weights.reduce((sum, item) => sum + item.score, 0);
  if (total <= 0) return pool[Math.floor(Math.random() * pool.length)] || null;

  let cursor = Math.random() * total;
  for (const item of weights) {
    cursor -= item.score;
    if (cursor <= 0) return item.fdo;
  }

  return weights.at(-1)?.fdo || null;
}

function getHistoryWeights() {
  const recentWindow = state.history.slice(0, 30);
  const recentCounts = new Map();
  const sameDutyCounts = new Map();

  for (const entry of recentWindow) {
    recentCounts.set(entry.fdoId, (recentCounts.get(entry.fdoId) || 0) + 1);
    const key = `${entry.dutyId}:${entry.fdoId}`;
    sameDutyCounts.set(key, (sameDutyCounts.get(key) || 0) + 1);
  }

  return { recentCounts, sameDutyCounts };
}

function dutyLoadFor(fdoId) {
  return state.duties.filter((duty) => duty.assignedFdoId === fdoId).length;
}

function matchesRole(fdoRole, requiredRole) {
  if (!requiredRole) return true;
  return String(fdoRole || "").trim().toLowerCase() === String(requiredRole || "").trim().toLowerCase();
}

function clampNumber(value, min, max, fallback) {
  const parsed = Number.parseInt(String(value), 10);
  if (Number.isNaN(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

function exportCsv() {
  const rows = [
    ["Duty", "Category", "RequiredRole", "AssignedFDO", "Locked", "FixedFDO"],
    ...state.duties.map((duty) => {
      const assigned = state.fdos.find((fdo) => fdo.id === duty.assignedFdoId)?.name || "";
      const fixed = state.fdos.find((fdo) => fdo.id === duty.fixedFdoId)?.name || "";
      return [duty.name, duty.category, duty.requiredRole, assigned, String(Boolean(duty.locked)), fixed];
    })
  ];

  downloadFile("fdo-assignments.csv", rows.map((row) => row.map(csvEscape).join(",")).join("\n"), "text/csv;charset=utf-8");
}

function exportBackupJson() {
  downloadFile("fdo-allocator-backup.json", JSON.stringify(state, null, 2), "application/json;charset=utf-8");
}

function resetSampleData() {
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

function downloadFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
