function formatDate(date, format) {
  const year = date.getFullYear().toString().padStart(4, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const second = date.getSeconds().toString().padStart(2, '0');
  return format
    .replace('yyyy', year)
    .replace('MM', month)
    .replace('dd', day)
    .replace('HH', hour)
    .replace('mm', minute)
    .replace('ss', second);
}
const FORMAT_TIME = 'yyyy-MM-dd HH:mm:ss';

const chatContainer = $('.chat-container');
function addRobotMsg(content, time) {
  chatContainer.innerHTML += `<div class="chat-item">
    <img class="chat-avatar" src="./asset/robot-avatar.jpg" />
    <div class="chat-content">${content}</div>
    <div class="chat-date">${time}</div>
  </div>`;
}
function addUserMsg(content, time) {
  chatContainer.innerHTML += `<div class="chat-item me">
    <img class="chat-avatar" src="./asset/avatar.png" />
    <div class="chat-content">${content}</div>
    <div class="chat-date">${time}</div>
  </div>`;
}

(async function () {
  const response = await profile();
  const userInfo = response.data;
  if (userInfo) {
    $('#nickname').innerText = userInfo.nickname;
    $('#loginId').innerText = userInfo.loginId;
    const history = (await getHistory()).data;
    console.log(history);
    history.forEach((i) => {
      const time = formatDate(new Date(+i.createdAt), FORMAT_TIME);
      if (i.from === userInfo.loginId) {
        addUserMsg(i.content, time);
      } else {
        addRobotMsg(i.content, time);
      }
    });
    chatContainer.scrollTop = chatContainer.scrollHeight;
  } else {
    window.location.href = './login.html';
  }

  const msessage = new verify('txtMsg', (value) => (value ? '' : 'empty'));
  const form = $('.msg-container');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formTrue = msessage.validator();
    const msessageTxt = msessage.formDom.value;
    msessage.formDom.value = '';
    if (formTrue) {
      const time1 = formatDate(new Date(), FORMAT_TIME);
      addUserMsg(msessageTxt, time1);
      chatContainer.scrollTop = chatContainer.scrollHeight;
      const res = await sendChat(msessageTxt);
      if (res.code === 0) {
        const time2 = formatDate(new Date(+res.data.createdAt), FORMAT_TIME);
        addRobotMsg(res.data.content, time2);
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    } else {
      return;
    }
  });

  const exit = $('.close');
  exit.addEventListener('click', () => {
    localStorage.removeItem(TOKEN_NAME);
    window.location.href = './login.html';
  });
})();
