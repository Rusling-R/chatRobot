const HOST_URL = 'https://study.duyiedu.com/api';
const TOKEN_NAME = 'tokenValue';

function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function GET(path) {
  const method = 'GET';
  const headers = {
    'Content-Type': 'application/json',
  };
  const token = localStorage.getItem(TOKEN_NAME);
  token && (headers['authorization'] = `Bearer ${token}`);
  return fetch(`${HOST_URL}/${path}`, { method, headers });
}
function POST(path, requsetBody) {
  const method = 'POST';
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = JSON.stringify(requsetBody);
  const token = localStorage.getItem(TOKEN_NAME);
  token && (headers['authorization'] = `Bearer ${token}`);
  return fetch(`${HOST_URL}/${path}`, { method, headers, body });
}
async function reg(userInfo) {
  const res = await POST('user/reg', userInfo);
  return await res.json();
}

async function login(loginInfo) {
  const res = await POST('user/login', loginInfo);
  const response = await res.json();
  if (response.code === 0) {
    localStorage.setItem(TOKEN_NAME, res.headers.get('authorization'));
  } else {
    return response;
  }
}

async function exists(loginId) {
  const res = await GET(`user/exists?loginId=${loginId}`);
  return await res.json();
}

async function profile() {
  const res = await GET('user/profile');
  return await res.json();
}

async function sendChat(content) {
  const res = await POST('chat', { content });
  return await res.json();
}

async function getHistory() {
  const res = await GET('chat/history');
  return await res.json();
}
