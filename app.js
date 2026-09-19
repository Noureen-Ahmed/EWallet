/**
 * Home EWallet — Phase 4: Revised Request Flow & Personal Expenses
 */

// ==========================================
// CATALOG DATA (Categories & Pre-defined Items)
// ==========================================
const CATALOG_DATA = {
  frozen: {
    id: 'frozen', name: 'الفريزر', emoji: '❄️', subtitle: 'لحوم ومجمدات',
    items: [
      { id: 'f1', name: 'لحمه قطع', emoji: '🥩', unit: 'kg', defaultPrice: 0 },
      { id: 'f2', name: 'لحمه مفرومه', emoji: '🍔', unit: 'kg', defaultPrice: 0 },
      { id: 'f3', name: 'لحمه كوكتيل', emoji: '🍲', unit: 'kg', defaultPrice: 0 },
      { id: 'f4', name: 'سمك حوت', emoji: '🐟', unit: 'kg', defaultPrice: 0 },
      { id: 'f5', name: 'سمك وجمبري', emoji: '🦐', unit: 'kg', defaultPrice: 0 },
      { id: 'f6', name: 'سدق', emoji: '🌭', unit: 'kg', defaultPrice: 0 },
      { id: 'f7', name: 'سمنه', emoji: '🧈', unit: 'kg', defaultPrice: 0 },
      { id: 'f8', name: 'فراخ', emoji: '🍗', unit: 'kg', defaultPrice: 0 }
    ]
  },
  grocery: {
    id: 'grocery', name: 'البقالة', emoji: '🛒', subtitle: 'أساسيات المطبخ',
    items: [
      { id: 'g1', name: 'لبن', emoji: '🥛', unit: 'لتر', defaultPrice: 0 },
      { id: 'g2', name: 'براميلي', emoji: '🧀', unit: 'kg', defaultPrice: 0 },
      { id: 'g3', name: 'تركي', emoji: '🧀', unit: 'kg', defaultPrice: 0 },
      { id: 'g4', name: 'عسل اسود', emoji: '🍯', unit: 'برطمان', defaultPrice: 0 },
      { id: 'g5', name: 'طحينه', emoji: '🥣', unit: 'برطمان', defaultPrice: 0 },
      { id: 'g6', name: 'مربي', emoji: '🍓', unit: 'برطمان', defaultPrice: 0 },
      { id: 'g7', name: 'ارز', emoji: '🍚', unit: 'kg', defaultPrice: 0 },
      { id: 'g8', name: 'مكرونه', emoji: '🍝', unit: 'كيس', defaultPrice: 0 },
      { id: 'g9', name: 'لبنة', emoji: '🥣', unit: 'علبة', defaultPrice: 0 },
      { id: 'g10', name: 'بيض بلدي', emoji: '🥚', unit: 'كرتونة', defaultPrice: 0 },
      { id: 'g10', name: 'بيض احمر', emoji: '🥚', unit: 'كرتونة', defaultPrice: 0 },
      { id: 'g11', name: 'عيش', emoji: '🍞', unit: 'رغيف', defaultPrice: 0 },
      { id: 'g12', name: 'زبادي', emoji: '🥣', unit: 'علبة', defaultPrice: 0 },
      { id: 'g13', name: 'بسطرمة', emoji: '🥓', unit: 'kg', defaultPrice: 0 },
      { id: 'g14', name: 'دقيق', emoji: '🌾', unit: 'kg', defaultPrice: 0 },
      { id: 'g15', name: 'ملح', emoji: '🧂', unit: 'كيس', defaultPrice: 0 },
      { id: 'g16', name: 'ارز بسمتي', emoji: '🍚', unit: 'kg', defaultPrice: 0 },
      { id: 'g17', name: 'سكر', emoji: '🧊', unit: 'kg', defaultPrice: 0 },
      { id: 'g18', name: 'زيت', emoji: '🫗', unit: 'زجاجة', defaultPrice: 0 },
      { id: 'g19', name: 'خل', emoji: '🍶', unit: 'زجاجة', defaultPrice: 0 }
    ]
  },
  spices: {
    id: 'spices', name: 'العطارة', emoji: '🌿', subtitle: 'بهارات وأعشاب',
    items: [
      { id: 's1', name: 'كمون', emoji: '🌱', unit: 'جرام', defaultPrice: 0 },
      { id: 's2', name: 'فلفل', emoji: '🌶️', unit: 'جرام', defaultPrice: 0 },
      { id: 's3', name: 'ملح', emoji: '🧂', unit: 'كيس', defaultPrice: 0 },
      { id: 's4', name: 'بودره توم', emoji: '🧄', unit: 'جرام', defaultPrice: 0 },
      { id: 's5', name: 'بودره بصل', emoji: '🧅', unit: 'جرام', defaultPrice: 0 },
      { id: 's6', name: 'بابريكا مدخنة', emoji: '🌶️', unit: 'جرام', defaultPrice: 0 },
      { id: 's7', name: 'سكر', emoji: '🧊', unit: 'kg', defaultPrice: 0 },
      { id: 's8', name: 'خل', emoji: '🍶', unit: 'زجاجة', defaultPrice: 0 },
      { id: 's9', name: 'جوزه الطيب', emoji: '🌰', unit: 'جرام', defaultPrice: 0 },
      { id: 's10', name: 'مرقة فورية', emoji: '🍲', unit: 'مكعب', defaultPrice: 0 },
      { id: 's11', name: 'بيكينج بودر', emoji: '🧁', unit: 'كيس', defaultPrice: 0 }
    ]
  },
  vegetables: {
    id: 'vegetables', name: 'الخضار', emoji: '🥬', subtitle: 'خضروات طازجة',
    items: [
      { id: 'v1', name: 'طماطم', emoji: '🍅', unit: 'kg', defaultPrice: 0 },
      { id: 'v2', name: 'خيار', emoji: '🥒', unit: 'kg', defaultPrice: 0 },
      { id: 'v3', name: 'جزر', emoji: '🥕', unit: 'kg', defaultPrice: 0 },
      { id: 'v4', name: 'بصل', emoji: '🧅', unit: 'kg', defaultPrice: 0 },
      { id: 'v5', name: 'بطاطس', emoji: '🥔', unit: 'kg', defaultPrice: 0 },
      { id: 'v6', name: 'خس', emoji: '🥬', unit: 'واحدة', defaultPrice: 0 },
      { id: 'v7', name: 'بتنجان كبير', emoji: '🍆', unit: 'kg', defaultPrice: 0 },
      { id: 'v8', name: 'كوسة', emoji: '🥒', unit: 'kg', defaultPrice: 0 },
      { id: 'v9', name: 'فلفل الوان', emoji: '🫑', unit: 'kg', defaultPrice: 0 },
      { id: 'v10', name: 'فلفل كوبي', emoji: '🫑', unit: 'kg', defaultPrice: 0 },
      { id: 'v11', name: 'فلفل طويل اخضر', emoji: '🌶️', unit: 'kg', defaultPrice: 0 },
      { id: 'v12', name: 'ملوخية', emoji: '🌿', unit: 'حزمة', defaultPrice: 0 }
    ]
  },
  cleaning_supermarket: {
    id: 'cleaning_supermarket', name: 'السوبر ماركت و منظفات', emoji: '🧼', subtitle: 'منظفات وطلبات السوبر ماركت',
    items: [
      { id: 'c1', name: 'فتح الله', emoji: '🏪', unit: 'طلب', defaultPrice: 0 },
      { id: 'c2', name: 'فرجاني', emoji: '🏪', unit: 'طلب', defaultPrice: 0 },
      { id: 'c3', name: 'بيم', emoji: '🏪', unit: 'طلب', defaultPrice: 0 },
      { id: 'c4', name: 'زاهر', emoji: '🏪', unit: 'طلب', defaultPrice: 0 },
      { id: 'c5', name: 'الاهرام', emoji: '🏪', unit: 'طلب', defaultPrice: 0 },
      { id: 'c6', name: 'القزاز', emoji: '🏪', unit: 'طلب', defaultPrice: 0 },
      { id: 'c7', name: 'مناديل سحب', emoji: '🧻', unit: 'علبة', defaultPrice: 0 },
      { id: 'c8', name: 'صابون سايل', emoji: '🧴', unit: 'لتر', defaultPrice: 0 },
      { id: 'c9', name: 'شاورجل', emoji: '🚿', unit: 'لتر', defaultPrice: 0 },
      { id: 'c10', name: 'اوكسي جل', emoji: '🧺', unit: 'لتر', defaultPrice: 0 },
      { id: 'c11', name: 'صابون تواليت', emoji: '🧼', unit: 'قطعة', defaultPrice: 0 },
      { id: 'c12', name: 'مناديل جيب', emoji: '🤧', unit: 'باكت', defaultPrice: 0 },
      { id: 'c13', name: 'مناديل رول مطبخ', emoji: '🧻', unit: 'رول', defaultPrice: 0 },
      { id: 'c14', name: 'كلوروكس الوان', emoji: '🌈', unit: 'زجاجة', defaultPrice: 0 },
      { id: 'c15', name: 'كلوروكس ابيض', emoji: '🫧', unit: 'زجاجة', defaultPrice: 0 },
      { id: 'c16', name: 'معطر فريدا', emoji: '🌸', unit: 'زجاجة', defaultPrice: 0 },
      { id: 'c17', name: 'اكياس قمامة', emoji: '🗑️', unit: 'بكرة', defaultPrice: 0 },
      { id: 'c18', name: 'اكياس سندوتشات صغير', emoji: '🛍️', unit: 'رزمة', defaultPrice: 0 },
      { id: 'c19', name: 'اكياس سندوتشات كبير', emoji: '🛍️', unit: 'رزمة', defaultPrice: 0 },
      { id: 'c20', name: 'اكياس سندوتشات وسط', emoji: '🛍️', unit: 'رزمة', defaultPrice: 0 }
    ]
  },
  repairs: {
    id: 'repairs', name: 'التصليحات', emoji: '🛠️', subtitle: 'صيانة وتصليحات',
    items: [
      { id: 'r1', name: 'نجارة', emoji: '🪚', unit: 'خدمة', defaultPrice: 0 },
      { id: 'r2', name: 'سباكة', emoji: '🔧', unit: 'خدمة', defaultPrice: 0 },
      { id: 'r3', name: 'الوميتال', emoji: '🪟', unit: 'خدمة', defaultPrice: 0 },
      { id: 'r4', name: 'الريسيفر', emoji: '📺', unit: 'خدمة', defaultPrice: 0 },
      { id: 'r5', name: 'كهرباء', emoji: '⚡', unit: 'خدمة', defaultPrice: 0 }
    ]
  },
  bills: {
    id: 'bills', name: 'الفواتير', emoji: '🧾', subtitle: 'فواتير شهرية',
    items: [
      { id: 'b1', name: 'فاتوره كهرباء', emoji: '💡', unit: 'فاتورة', defaultPrice: 0 },
      { id: 'b2', name: 'فاتوره المياه', emoji: '💧', unit: 'فاتورة', defaultPrice: 0 },
      { id: 'b3', name: 'فاتوره الغاز', emoji: '🔥', unit: 'فاتورة', defaultPrice: 0 },
      { id: 'b4', name: 'فاتوره الارضي', emoji: '☎️', unit: 'فاتورة', defaultPrice: 0 },
      { id: 'b5', name: 'فاتوره النت', emoji: '🌐', unit: 'فاتورة', defaultPrice: 0 }
    ]
  },
  transport: {
    id: 'transport', name: 'مواصلات', emoji: '🚕', subtitle: 'انتقالات',
    items: [
      { id: 't1', name: 'مترو', emoji: '🚇', unit: 'تذكرة', defaultPrice: 0 },
      { id: 't2', name: 'توكتوك', emoji: '🛺', unit: 'رحلة', defaultPrice: 0 },
      { id: 't3', name: 'مكروباص', emoji: '🚐', unit: 'رحلة', defaultPrice: 0 }
    ]
  },
  university: {
    id: 'university', name: 'مصاريف جامعة', emoji: '🎓', subtitle: 'مصاريف دراسية',
    items: [
      { id: 'u1', name: 'اشتراك مترو', emoji: '🎟️', unit: 'اشتراك', defaultPrice: 0 },
      { id: 'u2', name: 'اكل من برا', emoji: '🍔', unit: 'وجبة', defaultPrice: 0 },
      { id: 'u3', name: 'مشروبات من برا', emoji: '☕', unit: 'مشروب', defaultPrice: 0 },
      { id: 'u4', name: 'حاجه حلوه', emoji: '🍫', unit: 'قطعة', defaultPrice: 0 },
      { id: 'u5', name: 'مايه', emoji: '💧', unit: 'زجاجة', defaultPrice: 0 },
      { id: 'u6', name: 'توكتوك', emoji: '🛺', unit: 'رحلة', defaultPrice: 0 },
      { id: 'u7', name: 'مكروباص', emoji: '🚐', unit: 'رحلة', defaultPrice: 0 },
      { id: 'u8', name: 'تصوير ورق', emoji: '🖨️', unit: 'ورقة', defaultPrice: 0 },
      { id: 'u9', name: 'اقلام', emoji: '🖊️', unit: 'قلم', defaultPrice: 0 },
      { id: 'u10', name: 'كشكول', emoji: '📓', unit: 'كشكول', defaultPrice: 0 }
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
  const itemInp = document.getElementById('sharedItemInput');
  const assignSel = document.getElementById('sharedAssignedToDropdown');
  const amtInp = document.getElementById('sharedAmountInput');
  const ddList = document.getElementById('sharedItemDropdownList');

  if (itemInp) {
    itemInp.value = "";
    itemInp.dataset.selectedId = "";
    itemInp.dataset.customMode = "false";
  }
  if (ddList) ddList.hidden = true;
  if (assignSel) assignSel.value = "";
  if (amtInp) amtInp.value = "";

  // reset qty
  state.quantityMode = 'count';
  document.querySelectorAll('.qty-mode-btn').forEach(btn => btn.classList.remove('active'));
  const defaultModeBtn = document.querySelector('.qty-mode-btn[data-mode="count"]');
  if (defaultModeBtn) defaultModeBtn.classList.add('active');
  document.querySelectorAll('.qty-input-section').forEach(sec => sec.hidden = true);
  const countSec = document.getElementById('qtySectionCount');
  if (countSec) countSec.hidden = false;

  const stepper = document.getElementById('stepperValue');
  if (stepper) stepper.value = 1;
  const weight = document.getElementById('weightInput');
  if (weight) weight.value = "";
  const amountFixed = document.getElementById('amountFixedInput');
  if (amountFixed) amountFixed.value = "";

  const optPrice = document.getElementById('optionalPriceRow');
  if (optPrice) optPrice.hidden = false;
  const amtOnly = document.getElementById('amountOnlyAddRow');
  if (amtOnly) amtOnly.hidden = true;
  const helpTxt = document.getElementById('priceHelpText');
  if (helpTxt) helpTxt.hidden = false;
}

async function handleSharedQuickAdd() {
  const itemInp = document.getElementById('sharedItemInput');
  const assignSel = document.getElementById('sharedAssignedToDropdown');

  const itemVal = itemInp.value.trim();
  const assignedTo = assignSel.value || null;
  const isCustom = itemInp.dataset.customMode === "true";
  const itemId = itemInp.dataset.selectedId;

  if (!itemVal && !itemId) {
    showToast('Please enter an item.', 'error');
    return;
  }

  let itemName = itemVal;
  let itemEmoji = '📦'; // Default for custom
  let itemUnit = 'Item';
  let catId = 'other';
  let catName = 'مختلف';
  let catEmoji = '🔹';

  if (!isCustom && itemId) {
    for (const key in CATALOG_DATA) {
      const found = CATALOG_DATA[key].items.find(i => i.id === itemId);
      if (found) {
        itemName = found.name;
        itemEmoji = found.emoji;
        itemUnit = found.unit || 'Item';
        catId = CATALOG_DATA[key].id;
        catName = CATALOG_DATA[key].name;
        catEmoji = CATALOG_DATA[key].emoji;
        break;
      }
    }
  }

  let finalQty = 1;
  let finalUnit = itemUnit;
  let price = 0;

  if (state.quantityMode === 'count') {
    finalQty = parseInt(document.getElementById('stepperValue').value) || 1;
    price = parseFloat(document.getElementById('sharedAmountInput').value) || 0;
  } else if (state.quantityMode === 'weight') {
    finalQty = parseFloat(document.getElementById('weightInput').value) || 0;
    if (finalQty <= 0) { showToast('Please enter a valid weight.', 'error'); return; }
    finalUnit = 'kg';
    price = parseFloat(document.getElementById('sharedAmountInput').value) || 0;
  } else if (state.quantityMode === 'amount') {
    finalQty = 1;
    finalUnit = 'Fixed Amount';
    price = parseFloat(document.getElementById('amountFixedInput').value) || 0;
    if (price <= 0) { showToast('Please enter a valid amount.', 'error'); return; }
  }

  const reqUser = state.currentUser;
  const data = {
    userId: reqUser.uid,
    userName: reqUser.name,
    userAvatar: reqUser.avatar,
    categoryId: catId,
    categoryName: catName,
    categoryEmoji: catEmoji,
    itemName: itemName,
    itemEmoji: itemEmoji,
    quantity: finalQty,
    unit: finalUnit,
    isDaily: false,
    assignedTo: assignedTo
  };

  if (price > 0) {
    data.price = price;
    data.pricedBy = reqUser.uid;
  }

  await DB.addRequest(data);
  showToast(`Added ${itemName} to Shared!`, 'success');
  initAddForm();

  if (price > 0) {
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
  document.getElementById('sharedAddBtnAmount')?.addEventListener('click', handleSharedQuickAdd);

  const itemInp = document.getElementById('sharedItemInput');
  const ddList = document.getElementById('sharedItemDropdownList');

  if (itemInp && ddList) {
    itemInp.addEventListener('input', (e) => {
      const val = e.target.value.toLowerCase().trim();
      ddList.innerHTML = '';
      if (val === '') {
        ddList.hidden = true;
        itemInp.dataset.customMode = "false";
        return;
      }

      let allItems = [];
      Object.values(CATALOG_DATA).forEach(cat => {
        allItems = allItems.concat(cat.items);
      });

      const filtered = allItems.filter(i => i.name.toLowerCase().includes(val));
      if (filtered.length > 0) {
        filtered.forEach(i => {
          const div = document.createElement('div');
          div.className = 'autocomplete-item';
          div.innerHTML = `${i.emoji} ${i.name}`;
          div.addEventListener('click', () => {
            itemInp.value = i.name;
            itemInp.dataset.selectedId = i.id;
            itemInp.dataset.customMode = "false";
            ddList.hidden = true;
          });
          ddList.appendChild(div);
        });
      } else {
        const div = document.createElement('div');
        div.className = 'autocomplete-item';
        div.innerHTML = `➕ إضافة عنصر جديد: "<b>${val}</b>"`;
        div.addEventListener('click', () => {
          itemInp.dataset.selectedId = "";
          itemInp.dataset.customMode = "true";
          itemInp.value = val;
          ddList.hidden = true;
        });
        ddList.appendChild(div);
      }
      ddList.hidden = false;
    });

    // Hide dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (e.target !== itemInp && e.target !== ddList) ddList.hidden = true;
    });
  }

  // Quantity Mode Switcher
  document.querySelectorAll('.qty-mode-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.qty-mode-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const mode = e.currentTarget.getAttribute('data-mode');
      state.quantityMode = mode;

      document.querySelectorAll('.qty-input-section').forEach(sec => sec.hidden = true);
      const optPrice = document.getElementById('optionalPriceRow');
      const amtOnly = document.getElementById('amountOnlyAddRow');
      const helpTxt = document.getElementById('priceHelpText');
      if (optPrice) optPrice.hidden = false;
      if (amtOnly) amtOnly.hidden = true;
      if (helpTxt) helpTxt.hidden = false;

      if (mode === 'count') {
        const c = document.getElementById('qtySectionCount');
        if (c) c.hidden = false;
      } else if (mode === 'weight') {
        const w = document.getElementById('qtySectionWeight');
        if (w) w.hidden = false;
      } else if (mode === 'amount') {
        const a = document.getElementById('qtySectionAmount');
        if (a) a.hidden = false;
        if (optPrice) optPrice.hidden = true;
        if (amtOnly) amtOnly.hidden = false;
        if (helpTxt) helpTxt.hidden = true;
      }
    });
  });

  // Stepper
  document.getElementById('stepperMinus')?.addEventListener('click', () => {
    const inp = document.getElementById('stepperValue');
    const val = parseInt(inp.value) || 1;
    if (val > 1) inp.value = val - 1;
  });
  document.getElementById('stepperPlus')?.addEventListener('click', () => {
    const inp = document.getElementById('stepperValue');
    const val = parseInt(inp.value) || 1;
    inp.value = val + 1;
  });

  // Fraction buttons
  document.querySelectorAll('.fraction-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const inp = document.getElementById('weightInput');
      if (inp) inp.value = e.currentTarget.getAttribute('data-val');
    });
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
