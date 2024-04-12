const loginId = new verify('txtLoginId', (value) => {
  return value ? '' : '账号不能为空';
});
const loginPwd = new verify('txtLoginPwd', (value) => {
  return value ? '' : '密码不能为空';
});
const userForm = $('.user-form');

userForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const res = await verify.validatForm(loginId, loginPwd);
  if (!res) {
    return;
  }
  const response = await login(Object.fromEntries(new FormData(userForm)));
  if (response) {
    loginId.errorP && (loginId.errorP.innerHTML = '');
    loginPwd.errorP && (loginPwd.errorP.innerHTML = response.msg);
  } else {
    window.location.href = './index.html';
  }
});
