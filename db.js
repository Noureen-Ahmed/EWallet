/**
 * db.js — Firebase Firestore-backed Persistence Layer for Home EWallet
 * Collections: users, requests, personalExpenses
 */

const firebaseConfig = {
  apiKey: "AIzaSyDlD7UoWhofkrBZRxqZ6pL0aqMMwOhksw0",
  authDomain: "ewallet-1cefa.firebaseapp.com",
  projectId: "ewallet-1cefa",
  storageBucket: "ewallet-1cefa.firebasestorage.app",
  messagingSenderId: "321447516157",
  appId: "1:321447516157:web:44f098c755d14d769d2b94"
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

const DB = (() => {
  const KEYS = {
    session: 'ewallet_session'
  };

  let cachedUsers = [];

  // ==========================================
  // Password Hashing (Web Crypto API)
  // ==========================================
  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + '_ewallet_salt_2026');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // ==========================================
  // Session (Local Storage)
  // ==========================================
  function getSession() {
    try { const raw = localStorage.getItem(KEYS.session); return raw ? JSON.parse(raw) : null; }
    catch (e) { return null; }
  }
  function setSession(userObj, rememberMe) {
    const session = { ...userObj, rememberMe, loginTime: new Date().toISOString() };
    try { localStorage.setItem(KEYS.session, JSON.stringify(session)); } catch (e) {}
    return session;
  }
  function clearSession() { localStorage.removeItem(KEYS.session); }

  async function init() {
    try {
      if (typeof firebase !== 'undefined' && firebase.auth) {
        if (!firebase.auth().currentUser) {
          await firebase.auth().signInAnonymously();
        }
      }
    } catch (authErr) {
      console.warn('Firebase auth notice:', authErr);
    }

    let snap = await firestore.collection('users').get();
    if (snap.empty) {
      const defaultUsers = [
        { uid: 'user_wafaa', name: 'Wafaa (Mom)', shortName: 'Wafaa', email: 'wafaa@ewallet.com', passwordHash: await hashPassword('admin123'), role: 'admin', avatar: '👩' },
        { uid: 'user_norien', name: 'Norien', shortName: 'Norien', email: 'norien@ewallet.com', passwordHash: await hashPassword('norien123'), role: 'member', avatar: '👧' },
        { uid: 'user_zeyad', name: 'Zeyad', shortName: 'Zeyad', email: 'zeyad@ewallet.com', passwordHash: await hashPassword('zeyad123'), role: 'member', avatar: '👦' }
      ];
      for (let u of defaultUsers) {
        await firestore.collection('users').doc(u.uid).set(u);
      }
      snap = await firestore.collection('users').get();
      console.log('DB: Initialized with Firebase seed data');
    }
    cachedUsers = snap.docs.map(d => d.data());
  }

  // ==========================================
  // User Operations
  // ==========================================
  function getAllUsers() { return cachedUsers; }
  function getUserByUid(uid) { return cachedUsers.find(u => u.uid === uid) || null; }
  function getUserByEmail(email) { return cachedUsers.find(u => u.email.toLowerCase() === email.toLowerCase()) || null; }

  async function authenticateUser(email, password) {
    const user = getUserByEmail(email);
    if (!user) return { success: false, error: 'No account found with this email.' };
    const hash = await hashPassword(password);
    if (user.passwordHash !== hash) return { success: false, error: 'Incorrect password. Please try again.' };
    return { success: true, user: { uid: user.uid, name: user.name, shortName: user.shortName, email: user.email, role: user.role, avatar: user.avatar } };
  }

  async function changePassword(uid, currentPassword, newPassword) {
    const user = getUserByUid(uid);
    if (!user) return { success: false, error: 'User not found.' };
    const currentHash = await hashPassword(currentPassword);
    if (user.passwordHash !== currentHash) return { success: false, error: 'Current password is incorrect.' };
    if (newPassword.length < 6) return { success: false, error: 'New password must be at least 6 characters.' };
    
    const newHash = await hashPassword(newPassword);
    await firestore.collection('users').doc(uid).update({ passwordHash: newHash });
    
    // update cache
    user.passwordHash = newHash;
    return { success: true };
  }

  // ==========================================
  // Shared Request Operations
  // ==========================================
  async function getAllRequests() {
    const snap = await firestore.collection('requests').get();
    let requests = snap.docs.map(d => d.data());
    requests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return requests;
  }

  async function getRequests(filters = {}) {
    const snap = await firestore.collection('requests').get();
    let requests = snap.docs.map(d => d.data());

    if (filters.userId) requests = requests.filter(r => r.userId === filters.userId);
    if (filters.status) requests = requests.filter(r => r.status === filters.status);
    if (filters.statusIn) requests = requests.filter(r => filters.statusIn.includes(r.status));
    if (filters.categoryId && filters.categoryId !== 'all') requests = requests.filter(r => r.categoryId === filters.categoryId);
    if (filters.dailyOnly) requests = requests.filter(r => r.isDaily === true);
    if (filters.todayOnly) {
      const ts = new Date(); ts.setHours(0, 0, 0, 0);
      requests = requests.filter(r => new Date(r.createdAt) >= ts);
    }
    requests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return requests;
  }

  async function addRequest(data) {
    const id = 'req-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4);
    const newReq = {
      id: id,
      userId: data.userId, userName: data.userName, userAvatar: data.userAvatar,
      categoryId: data.categoryId, categoryName: data.categoryName, categoryEmoji: data.categoryEmoji,
      itemName: data.itemName, itemEmoji: data.itemEmoji,
      quantity: data.quantity, unit: data.unit,
      price: data.price || 0,
      totalPrice: data.price ? data.quantity * data.price : 0,
      isDaily: data.isDaily || false,
      status: data.price ? 'completed' : 'pending_price',
      createdAt: new Date().toISOString(),
      boughtAt: data.price ? new Date().toISOString() : null,
      pricedBy: data.pricedBy || null,
      assignedTo: data.assignedTo || null
    };
    await firestore.collection('requests').doc(id).set(newReq);
    return newReq;
  }

  async function updateRequestPrice(reqId, price, pricedByUid) {
    const docRef = firestore.collection('requests').doc(reqId);
    const doc = await docRef.get();
    if (!doc.exists) return null;
    const req = doc.data();
    req.price = price;
    req.totalPrice = price * req.quantity;
    req.status = 'completed';
    req.boughtAt = new Date().toISOString();
    req.pricedBy = pricedByUid;
    await docRef.set(req);
    return req;
  }

  async function cancelRequest(reqId) {
    await firestore.collection('requests').doc(reqId).delete();
  }

  async function reorderRequest(reqId) {
    const docRef = firestore.collection('requests').doc(reqId);
    const doc = await docRef.get();
    if (!doc.exists) return;
    const r = doc.data();
    await addRequest({
      userId: r.userId, userName: r.userName, userAvatar: r.userAvatar,
      categoryId: r.categoryId, categoryName: r.categoryName, categoryEmoji: r.categoryEmoji,
      itemName: r.itemName, itemEmoji: r.itemEmoji,
      quantity: r.quantity, unit: r.unit, isDaily: r.isDaily, assignedTo: r.assignedTo
    });
  }

  // ==========================================
  // Personal Expenses Operations
  // ==========================================
  async function getPersonalExpenses(filters = {}) {
    let query = firestore.collection('personalExpenses');
    if (filters.userId) query = query.where('userId', '==', filters.userId);
    const snap = await query.get();
    let results = snap.docs.map(d => d.data());
    
    if (filters.todayOnly) {
      const ts = new Date(); ts.setHours(0, 0, 0, 0);
      results = results.filter(r => new Date(r.createdAt) >= ts);
    }
    results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return results;
  }

  async function addPersonalExpense(data) {
    const id = 'pe-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4);
    const newExp = {
      id: id,
      userId: data.userId,
      categoryId: data.categoryId, categoryName: data.categoryName, categoryEmoji: data.categoryEmoji,
      itemName: data.itemName, amount: data.amount,
      createdAt: new Date().toISOString()
    };
    await firestore.collection('personalExpenses').doc(id).set(newExp);
    return newExp;
  }

  async function deletePersonalExpense(expId) {
    await firestore.collection('personalExpenses').doc(expId).delete();
  }

  // ==========================================
  // Financial Aggregations
  // ==========================================
  async function getSharedFinancials() {
    const snap = await firestore.collection('requests').get();
    const today = new Date(); today.setHours(0,0,0,0);
    
    let dailyPending = 0, dailyCompleted = 0, dailyTotal = 0;
    let awaitingPriceCount = 0;
    let todayItemCount = 0;
    
    const userBreakdown = {};
    cachedUsers.forEach(u => { userBreakdown[u.uid] = { user: u, count: 0, spent: 0 }; });

    snap.docs.forEach(doc => {
      const r = doc.data();
      if (new Date(r.createdAt) >= today) {
        todayItemCount++;
        if (r.status === 'pending_price') awaitingPriceCount++;
        
        if (r.status === 'pending_price' || r.status === 'pending') dailyPending += r.totalPrice || 0;
        else if (r.status === 'completed') dailyCompleted += r.totalPrice || 0;
        dailyTotal += r.totalPrice || 0;

        if (userBreakdown[r.userId]) {
          userBreakdown[r.userId].count++;
          userBreakdown[r.userId].spent += (Number(r.totalPrice) || 0);
        }
      }
    });
    return { dailyPending, dailyCompleted, dailyTotal, awaitingPriceCount, todayItemCount, userBreakdown };
  }

  async function getPersonalFinancials(uid) {
    const snap = await firestore.collection('personalExpenses').where('userId', '==', uid).get();
    const today = new Date(); today.setHours(0,0,0,0);
    const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    let dailyTotal = 0, monthlyTotal = 0;
    let categories = {};

    snap.docs.forEach(doc => {
      const e = doc.data();
      const d = new Date(e.createdAt);
      if (d >= today) dailyTotal += e.amount;
      if (d >= firstOfMonth) {
        monthlyTotal += e.amount;
        if(!categories[e.categoryId]) categories[e.categoryId] = { name: e.categoryName, emoji: e.categoryEmoji, total: 0 };
        categories[e.categoryId].total += e.amount;
      }
    });
    
    const catArray = Object.values(categories).sort((a,b) => b.total - a.total);
    return { dailyTotal, monthlyTotal, categoryBreakdown: catArray };
  }

  async function getWeeklySharedFinancials() {
    const snap = await firestore.collection('requests').where('status', '==', 'completed').get();
    const today = new Date(); today.setHours(0,0,0,0);
    const firstOfWeek = new Date(today);
    firstOfWeek.setDate(firstOfWeek.getDate() - firstOfWeek.getDay());
    
    let total = 0;
    let memberTotals = {};
    let categories = {};

    snap.docs.forEach(doc => {
      const r = doc.data();
      const d = new Date(r.createdAt);
      if (d >= firstOfWeek) {
        total += r.totalPrice;
        const buyerUid = r.pricedBy || r.userId;
        memberTotals[buyerUid] = (memberTotals[buyerUid] || 0) + r.totalPrice;
        if(!categories[r.categoryId]) categories[r.categoryId] = { name: r.categoryName, emoji: r.categoryEmoji, total: 0 };
        categories[r.categoryId].total += r.totalPrice;
      }
    });
    const catArray = Object.values(categories).sort((a,b) => b.total - a.total);
    return { weeklyTotal: total, memberTotals, categoryBreakdown: catArray };
  }

  function resetDB() {
    localStorage.removeItem(KEYS.session);
  }

  return {
    init, getAllUsers, getUserByUid, getUserByEmail, authenticateUser, changePassword,
    getSession, setSession, clearSession,
    getAllRequests, getRequests, addRequest, updateRequestPrice, cancelRequest, reorderRequest,
    getPersonalExpenses, addPersonalExpense, deletePersonalExpense,
    getSharedFinancials, getPersonalFinancials, getWeeklySharedFinancials, resetDB
  };
})();
