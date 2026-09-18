/**
 * Home EWallet — Phase 4: Revised Request Flow & Personal Expenses
 */

// ==========================================
// CATALOG DATA (Categories & Pre-defined Items)
// ==========================================
const CATALOG_DATA = {
  grocery: {
    id: 'grocery', name: 'Grocery', emoji: '🛒', subtitle: 'Dairy, Pantry & Fresh Essentials',
    items: [
      { id: 'milk', name: 'Milk', emoji: '🥛', unit: 'Bottle (1L)', defaultPrice: 42 },
      { id: 'eggs', name: 'Eggs', emoji: '🥚', unit: 'Carton', defaultPrice: 165 },
      { id: 'cheese', name: 'White Cheese', emoji: '🧀', unit: '500g Tub', defaultPrice: 75 },
      { id: 'bread', name: 'Baladi Bread.', emoji: '🍞', unit: 'Pack of 10', defaultPrice: 20 },
      { id: 'butter', name: 'Natural Butter Block', emoji: '🧈', unit: '500g Block', defaultPrice: 95 },
      { id: 'olive_oil', name: 'Extra Virgin Olive Oil', emoji: '🫒', unit: '750ml Bottle', defaultPrice: 210 },
      { id: 'rice', name: 'Egyptian White Rice', emoji: '🍚', unit: '1kg Bag', defaultPrice: 35 },
      { id: 'yogurt', name: 'Plain Greek Yogurt', emoji: '🥣', unit: '6-Pack', defaultPrice: 55 }
    ]
  },
  frozen: {
    id: 'frozen', name: 'Frozen Food', emoji: '❄️', subtitle: 'Meats, Veggies & Ice Cream',
    items: [
      { id: 'mixed_veg', name: 'Mixed Farm Veggies', emoji: '🥦', unit: '400g Bag', defaultPrice: 28 },
      { id: 'beef_burgers', name: 'Beef Burgers Patties', emoji: '🍔', unit: '8-Pack', defaultPrice: 145 },
      { id: 'fries', name: 'Crispy French Fries', emoji: '🍟', unit: '1kg Bag', defaultPrice: 65 },
      { id: 'chicken_tenders', name: 'Breaded Chicken Strips', emoji: '🍗', unit: '1kg Bag', defaultPrice: 185 },
      { id: 'frozen_shrimp', name: 'Peeled Sea Shrimp', emoji: '🦐', unit: '500g Bag', defaultPrice: 240 },
      { id: 'ice_cream', name: 'Family Ice Cream Tub', emoji: '🍨', unit: '1L Tub', defaultPrice: 85 }
    ]
  },
  spices: {
    id: 'spices', name: 'Spices & Herbs', emoji: '🌿', subtitle: 'Seasonings, Herbs & Seeds',
    items: [
      { id: 'black_pepper', name: 'Ground Black Pepper', emoji: '🧂', unit: '100g Jar', defaultPrice: 45 },
      { id: 'cumin', name: 'Ground Cumin', emoji: '🌱', unit: '100g Jar', defaultPrice: 35 },
      { id: 'oregano', name: 'Dried Oregano Leaves', emoji: '🍃', unit: '50g Jar', defaultPrice: 30 },
      { id: 'paprika', name: 'Sweet Smoked Paprika', emoji: '🌶️', unit: '80g Jar', defaultPrice: 40 },
      { id: 'turmeric', name: 'Turmeric Powder', emoji: '🟡', unit: '100g Jar', defaultPrice: 35 },
      { id: 'cinnamon', name: 'Cinnamon Bark Sticks', emoji: '🪵', unit: '100g Pack', defaultPrice: 50 }
    ]
  },
  cleaning: {
    id: 'cleaning', name: 'Cleaning Supplies', emoji: '🧼', subtitle: 'Detergents, Soaps & Home Care',
    items: [
      { id: 'dish_soap', name: 'Concentrated Dish Soap', emoji: '🧴', unit: '1L Bottle', defaultPrice: 45 },
      { id: 'laundry_gel', name: 'Automatic Laundry Gel', emoji: '🧺', unit: '2.5L Bottle', defaultPrice: 195 },
      { id: 'bleach', name: 'Multi-Surface Bleach', emoji: '🫧', unit: '1L Bottle', defaultPrice: 32 },
      { id: 'floor_cleaner', name: 'Floral Floor Cleaner', emoji: '🧹', unit: '1L Bottle', defaultPrice: 48 },
      { id: 'sponges', name: 'Heavy Scrub Sponges', emoji: '🧽', unit: 'Pack of 3', defaultPrice: 25 },
      { id: 'trash_bags', name: 'Heavy Trash Bags (70L)', emoji: '🗑️', unit: 'Roll (20 pcs)', defaultPrice: 55 }
    ]
  },
  school: {
    id: 'school', name: 'School Expenses', emoji: '📚', subtitle: 'Stationery, Books & School Care',
    items: [
      { id: 'notebooks', name: 'A4 Lined Notebooks', emoji: '📓', unit: 'Pack of 5', defaultPrice: 85 },
      { id: 'pens_pack', name: 'Ballpoint Pens Set', emoji: '🖊️', unit: 'Pack of 10', defaultPrice: 55 },
      { id: 'backpack', name: 'Water-Resistant Backpack', emoji: '🎒', unit: 'Piece', defaultPrice: 450 },
      { id: 'art_supplies', name: 'Color Pencils & Sketchpad', emoji: '🎨', unit: 'Set', defaultPrice: 120 },
      { id: 'geometry_kit', name: 'Precision Geometry Kit', emoji: '📐', unit: 'Metal Box', defaultPrice: 70 },
      { id: 'organizer_folders', name: 'File Folders & Sleeves', emoji: '📁', unit: 'Pack of 10', defaultPrice: 40 }
    ]
  }
};

// ==========================================
// APPLICATION STATE
// ==========================================
const state = {
  currentUser: null,
  isAuthenticated: false,
  activeView: 'login', // 'login' | 'shared' | 'personal' | 'add' | 'settings'

  // Feed State
  filterCategory: 'all',
  isDailyOnlyFilter: false,
  completedSectionCollapsed: false,

  // Add Form State
  selectedRequesterUid: null,
  selectedCategoryId: null,
  selectedItemId: null,
  quantity: 1,
  unitPrice: 0,
  isDailyRecurring: false
};

// ==========================================
// UTILITIES
// ==========================================
function formatEGP(amount) {
  return Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatTime(isoStr) {
  if (!isoStr) return '';
  const d = new Date(isoStr);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDate(isoStr) {
  if (!isoStr) return '';
  const d = new Date(isoStr);
  const today = new Date();
  if (d.toDateString() === today.toDateString()) return 'Today, ' + formatTime(isoStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ', ' + formatTime(isoStr);
}

function updateClock() {
  const now = new Date();
  const el = document.getElementById('statusClock');
  if (el) el.textContent = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}
setInterval(updateClock, 30000);

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span class="toast-icon">${icons[type] || 'ℹ️'}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ==========================================
// NAVIGATION & ROUTING
// ==========================================
async function switchView(viewName) {
  if (viewName !== 'login' && !state.isAuthenticated) {
    await switchView('login');
    return;
  }

  state.activeView = viewName;
  ['loginView', 'sharedView', 'personalView', 'addRequestView', 'weeklyView', 'settingsView'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.hidden = true; el.classList.remove('active-view'); }
  });
  document.querySelectorAll('.app-view').forEach(v => { v.hidden = true; v.classList.remove('active-view'); });

  const navBar = document.getElementById('bottomNavBar');
  if (navBar && state.currentUser) {
    navBar.classList.toggle('role-admin', state.currentUser.role === 'admin');
  }

  ['navSharedTab', 'navPersonalTab', 'navAddTab', 'navSettingsTab'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });

  if (viewName === 'login') {
    document.getElementById('loginView').hidden = false;
    document.getElementById('loginView').classList.add('active-view');
    if (navBar) navBar.hidden = true;
    return;
  }

  if (navBar) navBar.hidden = false;

  switch (viewName) {
    case 'shared':
      document.getElementById('sharedView').hidden = false;
      document.getElementById('sharedView').classList.add('active-view');
      document.getElementById('navSharedTab')?.classList.add('active');
      await renderSharedDashboard();
      break;
    case 'personal':
      document.getElementById('personalView').hidden = false;
      document.getElementById('personalView').classList.add('active-view');
      document.getElementById('navPersonalTab')?.classList.add('active');
      await renderPersonalDashboard();
      break;
    case 'add':
      if (state.currentUser.role !== 'admin') {
        await switchView('shared');
        return;
      }
      document.getElementById('addRequestView').hidden = false;
      document.getElementById('addRequestView').classList.add('active-view');
      document.getElementById('navAddTab')?.classList.add('active');
      initAddForm();
      break;
    case 'settings':
      document.getElementById('settingsView').hidden = false;
      document.getElementById('settingsView').classList.add('active-view');
      document.getElementById('navSettingsTab')?.classList.add('active');
      renderSettingsPage();
      break;
    case 'weekly':
      document.getElementById('weeklyView').hidden = false;
      document.getElementById('weeklyView').classList.add('active-view');
      await renderWeeklyDashboard();
      break;
  }
}

// ==========================================
// AUTHENTICATION
// ==========================================
async function handleLogin(email, password) {
  const submitBtn = document.getElementById('loginSubmitBtn');
  const errorEl = document.getElementById('loginErrorMessage');
  const errorTextEl = document.getElementById('loginErrorText');

  errorEl.hidden = true;
  submitBtn.classList.add('loading');
  await new Promise(r => setTimeout(r, 400));

  const result = await DB.authenticateUser(email, password);
  submitBtn.classList.remove('loading');

  if (!result.success) {
    errorTextEl.textContent = result.error;
    errorEl.hidden = false;
    return;
  }

  const rememberMe = document.getElementById('rememberMeToggle')?.checked || false;
  DB.setSession(result.user, rememberMe);
  state.currentUser = result.user;
  state.isAuthenticated = true;

  showToast(`Welcome back, ${result.user.shortName}!`, 'success');
  await switchView('shared');
}

async function handleLogout() {
  DB.clearSession();
  state.currentUser = null;
  state.isAuthenticated = false;
  await switchView('login');
}

async function checkSession() {
  const session = DB.getSession();
  if (session && session.rememberMe) {
    state.currentUser = { uid: session.uid, name: session.name, shortName: session.shortName, email: session.email, role: session.role, avatar: session.avatar };
    state.isAuthenticated = true;
    await switchView('shared');
  } else {
    DB.clearSession();
    await switchView('login');
  }
}

// ==========================================
// SHARED DASHBOARD
// ==========================================
async function renderSharedDashboard() {
  const fin = await DB.getSharedFinancials();
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

  set('totalDailyExpensesVal', formatEGP(fin.dailyTotal));
  set('heroPendingTotal', `${formatEGP(fin.dailyPending)} EGP`);
  set('heroCompletedTotal', `${formatEGP(fin.dailyCompleted)} EGP`);

  const dateEl = document.getElementById('todayDateBadge');
  if (dateEl) dateEl.textContent = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  const weeklyBtn = document.getElementById('openWeeklyViewBtn');
  if (weeklyBtn) weeklyBtn.hidden = (state.currentUser.role !== 'admin');

  renderBreakdown(fin.userBreakdown, fin.dailyTotal);
  await renderFeedLists();
}

function renderBreakdown(userBreakdown, total) {
  const grid = document.getElementById('individualBreakdownGrid');
  if (!grid) return;
  grid.innerHTML = '';
  Object.values(userBreakdown).forEach(data => {
    const pct = total > 0 ? Math.round((data.spent / total) * 100) : 0;
    const card = document.createElement('div');
    card.className = 'breakdown-subcard';
    card.innerHTML = `
      <div class="breakdown-user-top">
        <div class="breakdown-user-info">
          <span class="breakdown-avatar">${data.user.avatar}</span>
          <span class="breakdown-name">${data.user.shortName}</span>
        </div>
        <span class="breakdown-item-count">${data.count} item${data.count === 1 ? '' : 's'}</span>
      </div>
      <div class="breakdown-amount-row"><span class="breakdown-amount">${formatEGP(data.spent)} EGP</span></div>
      <div class="breakdown-bar-track"><div class="breakdown-bar-fill" style="width: ${pct}%;"></div></div>`;
    grid.appendChild(card);
  });
}

async function renderFeedLists() {
  let requests = await DB.getRequests({ todayOnly: true });
  if (state.filterCategory !== 'all') requests = requests.filter(r => r.categoryId === state.filterCategory);
  if (state.isDailyOnlyFilter) requests = requests.filter(r => r.isDaily);

  const awaiting = requests.filter(r => r.status === 'pending_price');
  const completed = requests.filter(r => r.status === 'completed');

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('awaitingPriceCount', awaiting.length);
  set('completedCountBadge', completed.length);

  const awaitingSec = document.getElementById('awaitingPriceSection');
  if (awaitingSec) awaitingSec.hidden = (awaiting.length === 0);

  // Render lists
  const renderList = (id, items, createCardFn) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = '';
    items.forEach(item => el.appendChild(createCardFn(item)));
  };

  renderList('awaitingPriceList', awaiting, createAwaitingCard);
  renderList('completedItemsList', completed, createCompletedCard);

  const emptyState = document.getElementById('allFulfilledEmptyState');
  if (emptyState) emptyState.hidden = (awaiting.length > 0);
}

function createAwaitingCard(item) {
  const card = document.createElement('div');
  card.className = 'feed-item-card awaiting-price';
  card.innerHTML = `
    <div class="feed-item-main">
      <div class="feed-item-emoji-wrap">${item.itemEmoji}</div>
      <div class="feed-item-details">
        <div class="feed-item-title-row">
          <h3 class="feed-item-name">${item.itemName}</h3>
          ${item.isDaily ? '<span class="feed-item-daily-chip">🔄 Daily</span>' : ''}
        </div>
        <div class="feed-item-meta-row">
          <span class="feed-item-requester">👤 ${item.userName}</span>
          <span>•</span><span>${item.quantity} ${item.unit}</span>
          ${item.assignedTo ? `<span>•</span><span style="color:var(--color-primary);font-weight:600;">Assigned: ${DB.getUserByUid(item.assignedTo)?.shortName || 'Unknown'}</span>` : ''}
        </div>
        <span class="awaiting-price-badge">Awaiting Price</span>
        <div class="inline-price-entry">
          <div class="inline-price-input-wrap">
            <input type="number" class="inline-price-input" id="price-input-${item.id}" placeholder="Enter Price" min="0.5" step="0.5">
            <span>EGP</span>
          </div>
          <button type="button" class="inline-price-confirm-btn" data-id="${item.id}">Confirm</button>
          <button type="button" class="feed-action-btn delete-btn" id="delAwaitingBtn-${item.id}" title="Delete Request" aria-label="Delete Request">🗑️</button>
        </div>
      </div>
    </div>`;

  const btn = card.querySelector('.inline-price-confirm-btn');
  btn.addEventListener('click', async () => {
    const priceVal = parseFloat(card.querySelector(`#price-input-${item.id}`).value);
    if (!priceVal || priceVal <= 0) {
      showToast('Please enter a valid price.', 'error');
      return;
    }
    btn.disabled = true;
    await DB.updateRequestPrice(item.id, priceVal, state.currentUser.uid);
    showToast(`Price set for ${item.itemName}`, 'success');
    await renderSharedDashboard();
  });

  const delBtn = card.querySelector(`#delAwaitingBtn-${item.id}`);
  delBtn.addEventListener('click', async () => {
    if (confirm(`Delete "${item.itemName}" from awaiting requests?`)) {
      delBtn.disabled = true;
      await DB.deleteRequest(item.id);
      showToast(`Deleted request for ${item.itemName}`, 'info');
      await renderSharedDashboard();
    }
  });

  return card;
}


function createCompletedCard(item) {
  const card = document.createElement('div');
  card.className = 'feed-item-card completed-item-card';
  card.innerHTML = `
    <div class="feed-item-main">
      <div class="feed-item-emoji-wrap" style="opacity:0.85;">${item.itemEmoji}</div>
      <div class="feed-item-details">
        <div class="feed-item-title-row">
          <h3 class="feed-item-name">${item.itemName}</h3>
          <span class="completed-bought-badge">✓ Bought</span>
        </div>
        <div class="feed-item-meta-row">
          <span>By ${item.userName}</span><span>•</span><span>${formatTime(item.boughtAt)}</span>
        </div>
        <!-- Inline Price Edit Box -->
        <div class="inline-edit-box" id="editBox-${item.id}" style="display:none;">
          <div class="inline-edit-input-wrap">
            <input type="number" class="inline-edit-input" id="editInput-${item.id}" value="${item.price}" min="0.5" step="0.5" placeholder="Price">
            <span class="inline-edit-currency">EGP</span>
          </div>
          <button type="button" class="inline-save-btn" id="saveBtn-${item.id}">Save</button>
          <button type="button" class="inline-cancel-btn" id="cancelBtn-${item.id}">✕</button>
        </div>
      </div>
    </div>
    <div class="feed-item-pricing" id="pricingWrap-${item.id}">
      <span class="feed-item-total" id="priceDisplay-${item.id}">${formatEGP(item.totalPrice)} EGP</span>
      <div class="feed-actions-group">
        <button type="button" class="feed-action-btn edit-btn" id="editBtn-${item.id}" title="Edit Price">✏️ Edit</button>
        <button type="button" class="feed-action-btn delete-btn" id="delBtn-${item.id}" title="Delete Item">🗑️</button>
      </div>
    </div>`;

  const editBtn = card.querySelector(`#editBtn-${item.id}`);
  const delBtn = card.querySelector(`#delBtn-${item.id}`);
  const editBox = card.querySelector(`#editBox-${item.id}`);
  const editInput = card.querySelector(`#editInput-${item.id}`);
  const saveBtn = card.querySelector(`#saveBtn-${item.id}`);
  const cancelBtn = card.querySelector(`#cancelBtn-${item.id}`);

  editBtn.addEventListener('click', () => {
    editBox.style.display = 'flex';
    editInput.focus();
    editInput.select();
  });

  cancelBtn.addEventListener('click', () => {
    editBox.style.display = 'none';
    editInput.value = item.price;
  });

  editInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') saveBtn.click();
    if (e.key === 'Escape') cancelBtn.click();
  });

  saveBtn.addEventListener('click', async () => {
    const newPrice = parseFloat(editInput.value);
    if (isNaN(newPrice) || newPrice <= 0) {
      showToast('Please enter a valid price.', 'error');
      return;
    }
    saveBtn.disabled = true;
    await DB.updateRequestPrice(item.id, newPrice, state.currentUser.uid);
    showToast(`Price updated for ${item.itemName} (${formatEGP(newPrice)} EGP) ✓`, 'success');
    await renderSharedDashboard();
  });

  delBtn.addEventListener('click', async () => {
    if (confirm(`Delete "${item.itemName}" from shared purchases?`)) {
      delBtn.disabled = true;
      await DB.deleteRequest(item.id);
      showToast(`Deleted ${item.itemName}`, 'info');
      await renderSharedDashboard();
    }
  });

  return card;
}

// ==========================================
// PERSONAL EXPENSES
// ==========================================
async function renderPersonalDashboard() {
  if (!state.currentUser) return;
  const fin = await DB.getPersonalFinancials(state.currentUser.uid);

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('personalName', state.currentUser.shortName);
  set('personalAvatar', state.currentUser.avatar);
  set('personalDailyTotal', formatEGP(fin.dailyTotal));
  set('personalMonthlyTotal', formatEGP(fin.monthlyTotal));
  set('personalItemCount', fin.todayItemCount);

  // Quick Add Form reset
  document.getElementById('personalCategorySelect').value = '';
  document.getElementById('personalItemInput').value = '';
  document.getElementById('personalAmountInput').value = '';

  // Render Ledger
  const list = document.getElementById('personalLedgerList');
  const empty = document.getElementById('personalLedgerEmpty');
  if (!list) return;

  const expenses = await DB.getPersonalExpenses({ userId: state.currentUser.uid });
  set('personalLedgerCount', `${expenses.length} entries`);

  list.innerHTML = '';
  if (expenses.length === 0) {
    if (empty) empty.hidden = false;
  } else {
    if (empty) empty.hidden = true;
    expenses.forEach(exp => {
      const card = document.createElement('div');
      card.className = 'ledger-item-card';
      card.innerHTML = `
        <div class="ledger-item-emoji">${exp.categoryEmoji}</div>
        <div class="ledger-item-info">
          <div class="ledger-item-name">${exp.itemName}</div>
          <div class="ledger-item-meta"><span>${formatDate(exp.createdAt)}</span></div>
        </div>
        <div class="ledger-actions"><button class="ledger-action-btn cancel-btn" data-id="${exp.id}">Delete</button></div>`;
      card.querySelector('.cancel-btn').addEventListener('click', async () => {
        card.querySelector('.cancel-btn').disabled = true;
        await DB.deletePersonalExpense(exp.id);
        showToast('Expense deleted', 'info');
        await renderPersonalDashboard();
      });
      list.appendChild(card);
    });
  }

  // Category Breakdown
  const bars = document.getElementById('personalCategoryBars');
  if (bars) {
    bars.innerHTML = '';
    const max = Math.max(...fin.categoryBreakdown.map(c => c.total), 1);
    fin.categoryBreakdown.forEach(cat => {
      const pct = (cat.total / max) * 100;
      bars.innerHTML += `
        <div class="category-bar-row">
          <span class="cat-bar-label">${cat.emoji} ${cat.name}</span>
          <div class="cat-bar-track"><div class="cat-bar-fill" style="width:${pct}%"></div></div>
          <span class="cat-bar-amount">${formatEGP(cat.total)}</span>
        </div>`;
    });
  }
}

async function handleAddPersonalExpense() {
  const catSel = document.getElementById('personalCategorySelect');
  const nameInp = document.getElementById('personalItemInput');
  const amtInp = document.getElementById('personalAmountInput');

  const catId = catSel.value;
  const name = nameInp.value.trim();
  const amount = parseFloat(amtInp.value);

  if (!catId || !name || !amount) {
    showToast('Please fill all fields', 'error');
    return;
  }

  const opt = catSel.options[catSel.selectedIndex];
  await DB.addPersonalExpense({
    userId: state.currentUser.uid,
    categoryId: catId,
    categoryName: opt.text.substring(3),
    categoryEmoji: opt.getAttribute('data-emoji'),
    itemName: name,
    amount: amount
  });

  showToast('Personal expense added ✓', 'success');
  await renderPersonalDashboard();
}

// ==========================================
// ADD REQUEST FORM (Shared)
// ==========================================
function initAddForm() {
  const catSel = document.getElementById('sharedCategorySelect');
  const itemInp = document.getElementById('sharedItemDropdown');
  const assignSel = document.getElementById('sharedAssignedToDropdown');
  const amtInp = document.getElementById('sharedAmountInput');
  if (catSel) catSel.value = "";
  if (itemInp) {
    itemInp.innerHTML = '<option value="" disabled selected>First select a category...</option>';
    itemInp.value = "";
    itemInp.disabled = true;
  }
  if (assignSel) assignSel.value = "";
  if (amtInp) amtInp.value = "";
}

async function handleSharedQuickAdd() {
  const catSel = document.getElementById('sharedCategorySelect');
  const itemInp = document.getElementById('sharedItemDropdown');
  const assignSel = document.getElementById('sharedAssignedToDropdown');
  const amtInp = document.getElementById('sharedAmountInput');

  const catId = catSel.value;
  const itemId = itemInp.value;
  const assignedTo = assignSel.value || null;
  const price = parseFloat(amtInp.value);

  if (!catId || !itemId) {
    showToast('Please select a category and an item.', 'error');
    return;
  }

  const cat = CATALOG_DATA[catId];
  if (!cat) return;
  const item = cat.items.find(i => i.id === itemId);
  if (!item) return;

  const reqUser = state.currentUser;
  const data = {
    userId: reqUser.uid,
    userName: reqUser.name,
    userAvatar: reqUser.avatar,
    categoryId: cat.id,
    categoryName: cat.name,
    categoryEmoji: cat.emoji,
    itemName: item.name,
    itemEmoji: item.emoji,
    quantity: 1,
    unit: item.unit || 'Item',
    isDaily: false,
    assignedTo: assignedTo
  };

  if (!isNaN(price) && price > 0) {
    data.price = price;
    data.pricedBy = reqUser.uid;
  }

  await DB.addRequest(data);
  showToast(`Added ${item.name} to Shared!`, 'success');
  initAddForm();

  if (!isNaN(price) && price > 0) {
    await renderSharedDashboard(); // Update dashboard totals
  }
  await switchView('shared');
}

// ==========================================
// SETTINGS
// ==========================================
function renderSettingsPage() {
  if (!state.currentUser) return;
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('settingsUserAvatar', state.currentUser.avatar);
  set('settingsUserName', state.currentUser.name);
  set('settingsUserEmail', state.currentUser.email);
  set('settingsRoleBadge', state.currentUser.role === 'admin' ? 'Admin' : 'Member');

  document.getElementById('currentPasswordInput').value = '';
  document.getElementById('newPasswordInput').value = '';
  document.getElementById('confirmPasswordInput').value = '';
  document.getElementById('settingsFeedback').hidden = true;
}

async function handlePasswordChange() {
  const current = document.getElementById('currentPasswordInput').value;
  const newPass = document.getElementById('newPasswordInput').value;
  const confirm = document.getElementById('confirmPasswordInput').value;

  const fb = document.getElementById('settingsFeedback');
  const fbt = document.getElementById('settingsFeedbackText');
  const showFb = (msg, isErr) => { fb.hidden = false; fb.className = `settings-feedback ${isErr ? 'feedback-error' : 'feedback-success'}`; fbt.textContent = msg; };

  if (newPass !== confirm) return showFb('Passwords do not match.', true);
  if (newPass.length < 6) return showFb('Password too short (min 6).', true);

  const res = await DB.changePassword(state.currentUser.uid, current, newPass);
  if (!res.success) return showFb(res.error, true);

  showFb('Password updated successfully!', false);
  showToast('Password updated ✓', 'success');
}

// ==========================================
// WEEKLY DASHBOARD
// ==========================================
async function renderWeeklyDashboard() {
  const fin = await DB.getWeeklySharedFinancials();
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

  set('weeklyTotalSum', formatEGP(fin.weeklyTotal) + ' EGP');
  set('weeklyItemCount', `${fin.weekItemCount} items this week`);

  const list = document.getElementById('weeklyBreakdownList');
  if (!list) return;
  list.innerHTML = '';

  Object.values(fin.userBreakdown).forEach(data => {
    list.innerHTML += `
      <div class="weekly-breakdown-row">
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="font-size:24px;">${data.user.avatar}</span>
          <div>
            <div style="font-weight:600;font-size:15px;color:var(--color-text);">${data.user.name}</div>
            <div style="font-size:12px;color:var(--color-text-secondary);">${data.count} items</div>
          </div>
        </div>
        <div style="font-weight:700;font-size:16px;color:var(--color-text);">${formatEGP(data.spent)}</div>
      </div>
    `;
  });
}

// ==========================================
// EVENTS & BOOTSTRAP
// ==========================================
function initEvents() {
  // Login
  document.getElementById('loginForm')?.addEventListener('submit', () => {
    handleLogin(document.getElementById('loginEmail').value, document.getElementById('loginPassword').value);
  });
  document.querySelectorAll('.quick-login-chip').forEach(c => {
    c.addEventListener('click', () => handleLogin(c.getAttribute('data-email'), c.getAttribute('data-pass')));
  });
  document.getElementById('passwordToggleBtn')?.addEventListener('click', (e) => {
    const inp = document.getElementById('loginPassword');
    const isP = inp.type === 'password';
    inp.type = isP ? 'text' : 'password';
    e.currentTarget.querySelector('.eye-open').style.display = isP ? 'none' : 'block';
    e.currentTarget.querySelector('.eye-closed').style.display = isP ? 'block' : 'none';
  });

  // Nav
  document.getElementById('navSharedTab')?.addEventListener('click', () => switchView('shared'));
  document.getElementById('navPersonalTab')?.addEventListener('click', () => switchView('personal'));
  document.getElementById('navAddTab')?.addEventListener('click', () => switchView('add'));
  document.getElementById('navSettingsTab')?.addEventListener('click', () => switchView('settings'));
  document.getElementById('logoutBtn')?.addEventListener('click', handleLogout);

  document.getElementById('openWeeklyViewBtn')?.addEventListener('click', () => switchView('weekly'));
  document.getElementById('backFromWeeklyBtn')?.addEventListener('click', () => switchView('shared'));
  document.getElementById('backFromAddBtn')?.addEventListener('click', () => switchView('shared'));

  // Shared Feed
  document.getElementById('refreshFeedBtn')?.addEventListener('click', () => { showToast('Syncing feed...', 'info'); setTimeout(renderSharedDashboard, 500); });
  document.querySelectorAll('.filter-chip').forEach(c => {
    c.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(chip => { chip.classList.remove('active'); chip.setAttribute('aria-selected', 'false'); });
      c.classList.add('active'); c.setAttribute('aria-selected', 'true');
      state.filterCategory = c.getAttribute('data-filter-cat');
      renderFeedLists();
    });
  });
  document.getElementById('dailyFilterToggleBtn')?.addEventListener('click', (e) => {
    state.isDailyOnlyFilter = !state.isDailyOnlyFilter;
    e.currentTarget.classList.toggle('active', state.isDailyOnlyFilter);
    document.getElementById('dailyFilterIndicator').textContent = state.isDailyOnlyFilter ? 'On' : 'Off';
    renderFeedLists();
  });

  // Personal Add
  document.getElementById('personalAddBtn')?.addEventListener('click', handleAddPersonalExpense);

  // Add Form (Shared)
  document.getElementById('sharedAddBtn')?.addEventListener('click', handleSharedQuickAdd);
  document.getElementById('sharedCategorySelect')?.addEventListener('change', (e) => {
    const catId = e.target.value;
    const dd = document.getElementById('sharedItemDropdown');
    if (!catId || !dd) return;

    const cat = CATALOG_DATA[catId];
    if (!cat) return;

    dd.innerHTML = `<option value="" disabled selected>Select an item...</option>`;
    cat.items.forEach(i => {
      dd.innerHTML += `<option value="${i.id}">${i.emoji} ${i.name} (${i.unit})</option>`;
    });
    dd.disabled = false;
  });

  // Modal
  document.getElementById('modalViewFeedBtn')?.addEventListener('click', () => { document.getElementById('successModal').hidden = true; switchView('shared'); });
  document.getElementById('modalAddAnotherBtn')?.addEventListener('click', () => { document.getElementById('successModal').hidden = true; initAddForm(); });

  // Settings
  document.getElementById('changePasswordForm')?.addEventListener('submit', handlePasswordChange);
  document.getElementById('resetDataBtn')?.addEventListener('click', () => {
    if (confirm('Reset all local data? You will be logged out.')) { DB.resetDB(); handleLogout(); }
  });

  // Preview controls
  document.getElementById('toggleDeviceFrameBtn')?.addEventListener('click', (e) => {
    e.currentTarget.classList.add('active'); document.getElementById('toggleFullscreenBtn').classList.remove('active');
    document.getElementById('appViewportContainer').classList.remove('fullscreen-mode');
  });
  document.getElementById('toggleFullscreenBtn')?.addEventListener('click', (e) => {
    e.currentTarget.classList.add('active'); document.getElementById('toggleDeviceFrameBtn').classList.remove('active');
    document.getElementById('appViewportContainer').classList.add('fullscreen-mode');
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await DB.init();
  initEvents();
  await checkSession();
  updateClock();
});
