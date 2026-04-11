// ─── STATE ────────────────────────────────────────────────────────────────────
// { "Category||Dish Name": { available: bool, note: string } }
let state = {};

function makeKey(cat, dish) {
  return `${cat}||${dish}`;
}

function loadState() {
  try {
    const saved = localStorage.getItem('menuState');
    if (saved) state = JSON.parse(saved);
  } catch (e) {}
}

function saveState() {
  try { localStorage.setItem('menuState', JSON.stringify(state)); } catch (e) {}
}

function getItem(cat, dish) {
  const k = makeKey(cat, dish);
  if (!state[k]) state[k] = { available: true, note: '' };
  return state[k];
}

// ─── RENDER ───────────────────────────────────────────────────────────────────
function render() {
  const root = document.getElementById('menu-root');
  root.innerHTML = '';

  const isSunday = new Date().getDay() === 0;

  // Info banner when sunday sections are hidden
  if (!isSunday) {
    const banner = document.createElement('div');
    banner.style.cssText = `
      background: #1a1814;
      border: 1px dashed #2e2924;
      border-radius: 4px;
      padding: 12px 18px;
      margin-bottom: 32px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.72rem;
      color: #6b6358;
      letter-spacing: 0.08em;
    `;
    banner.innerHTML = `<span style="font-size:1rem;">🕐</span> <span>The <strong style="color:#c9a84c">Sunday Roast</strong> and <strong style="color:#c9a84c">Sunday Sides</strong> sections are only visible on Sundays.</span>`;
    root.appendChild(banner);
  }

  MENU.forEach(section => {
    // Sunday-only sections hidden on other days
    if (section.tag === 'sunday' && !isSunday) return;

    const sec = document.createElement('div');
    sec.className = 'category';

    const hdr = document.createElement('div');
    hdr.className = 'category-header';
    hdr.innerHTML = `
      <span class="category-label">${section.category}</span>
      <span class="category-count">${section.items.length} items</span>
      ${section.tag ? `<span class="weekend-tag">${section.tag}</span>` : ''}
    `;
    sec.appendChild(hdr);

    section.items.forEach(dish => {
      const item = getItem(section.category, dish);
      const row = document.createElement('div');
      row.className = 'dish-row' + (item.available ? '' : ' unavailable');
      row.id = `row-${makeKey(section.category, dish).replace(/[^a-z0-9]/gi, '_')}`;

      const switchId = `sw-${Math.random().toString(36).slice(2)}`;

      row.innerHTML = `
        <span class="dish-name">${dish}</span>
        <input
          class="dish-note"
          type="text"
          placeholder="Note..."
          value="${item.note.replace(/"/g, '&quot;')}"
          data-cat="${section.category}"
          data-dish="${dish}"
        />
        <div class="switch-wrap">
          <span class="switch-label ${item.available ? '' : 'off'}" id="lbl-${switchId}">
            ${item.available ? 'Available' : 'N/A'}
          </span>
          <label class="toggle">
            <input
              type="checkbox"
              ${item.available ? 'checked' : ''}
              data-cat="${section.category}"
              data-dish="${dish}"
              data-lbl="${switchId}"
            />
            <span class="toggle-track"></span>
          </label>
        </div>
      `;
      sec.appendChild(row);
    });

    root.appendChild(sec);
  });

  // ── Events ──────────────────────────────────────────────────────────────────
  root.querySelectorAll('.dish-note').forEach(inp => {
    inp.addEventListener('input', e => {
      const k = makeKey(e.target.dataset.cat, e.target.dataset.dish);
      if (!state[k]) state[k] = { available: true, note: '' };
      state[k].note = e.target.value;
      saveState();
    });
  });

  root.querySelectorAll('.toggle input').forEach(cb => {
    cb.addEventListener('change', e => {
      const { cat, dish, lbl } = e.target.dataset;
      const k = makeKey(cat, dish);
      if (!state[k]) state[k] = { available: true, note: '' };
      state[k].available = e.target.checked;
      saveState();

      const label = document.getElementById(`lbl-${lbl}`);
      if (label) {
        label.textContent = e.target.checked ? 'Available' : 'N/A';
        label.className = 'switch-label' + (e.target.checked ? '' : ' off');
      }
      const rowEl = document.getElementById(`row-${k.replace(/[^a-z0-9]/gi, '_')}`);
      if (rowEl) rowEl.className = 'dish-row' + (e.target.checked ? '' : ' unavailable');
    });
  });
}

// ─── CLOCK ────────────────────────────────────────────────────────────────────
function updateClock() {
  const now = new Date();
  const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January','February','March','April','May','June','July',
                  'August','September','October','November','December'];
  const d    = days[now.getDay()];
  const day  = String(now.getDate()).padStart(2, '0');
  const mon  = months[now.getMonth()];
  const year = now.getFullYear();
  const hh   = String(now.getHours()).padStart(2, '0');
  const mm   = String(now.getMinutes()).padStart(2, '0');
  const ss   = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('clock-date').textContent = `${d}, ${day} ${mon} ${year}`;
  document.getElementById('clock-time').textContent = `${hh}:${mm}:${ss}`;
}

// ─── PDF DOWNLOAD ─────────────────────────────────────────────────────────────
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const now    = new Date();
  const months = ['January','February','March','April','May','June','July',
                  'August','September','October','November','December'];
  const dateStr = `${String(now.getDate()).padStart(2,'0')} ${months[now.getMonth()]} ${now.getFullYear()} — ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  const PAGE_W = 210;
  const MARGIN = 18;
  const COL_W  = PAGE_W - MARGIN * 2;
  let y = 20;

  const addPage  = () => { doc.addPage(); y = 20; };
  const checkY   = (need = 10) => { if (y + need > 280) addPage(); };
  const isSunday = now.getDay() === 0;

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(180, 140, 60);
  doc.text('MENU — AVAILABILITY SHEET', MARGIN, y);
  y += 8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(120, 110, 100);
  doc.text(`Generated: ${dateStr}`, MARGIN, y);
  y += 10;

  doc.setDrawColor(60, 50, 40);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 8;

  MENU.forEach(section => {
    if (section.tag === 'sunday' && !isSunday) return;
    checkY(16);

    // Section header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(200, 160, 70);
    let catLine = section.category.toUpperCase();
    if (section.tag) catLine += `  [${section.tag.toUpperCase()}]`;
    doc.text(catLine, MARGIN, y);
    y += 6;

    doc.setDrawColor(50, 44, 36);
    doc.line(MARGIN, y, PAGE_W - MARGIN, y);
    y += 4;

    section.items.forEach(dish => {
      checkY(8);
      const item = getItem(section.category, dish);

      // Availability dot
      doc.setFillColor(...(item.available ? [61, 140, 90] : [192, 57, 43]));
      doc.circle(MARGIN + 2, y - 2, 1.5, 'F');

      // Dish name
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...(item.available ? [220, 210, 200] : [130, 120, 110]));
      doc.text(dish, MARGIN + 6, y);

      // Status
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(...(item.available ? [61, 140, 90] : [192, 57, 43]));
      doc.text(item.available ? 'AVAILABLE' : 'NOT AVAILABLE', PAGE_W - MARGIN - 35, y);

      // Note
      if (item.note) {
        y += 4;
        checkY(6);
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(7.5);
        doc.setTextColor(130, 120, 110);
        const noteLines = doc.splitTextToSize(`Note: ${item.note}`, COL_W - 10);
        doc.text(noteLines, MARGIN + 6, y);
        y += noteLines.length * 4;
      }

      y += 6;
    });

    y += 4;
  });

  const ts = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}-${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}`;
  doc.save(`menu-${ts}.pdf`);
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
loadState();
render();
updateClock();
setInterval(updateClock, 1000);
