const txtID = new verify('txtLoginId', async function (value) {
  if (value) {
    const res = await exists(value);
    return res.data ? '账号已存在' : '';
  } else {
    return '账号不能为空';
  }
});
const nickName = new verify('txtNickname', function (value) {
  return value ? '' : '昵称不能为空';
});
const txtLoginPwd = new verify('txtLoginPwd', function (value) {
  return value ? '' : '密码不能为空';
});
const txtLoginPwdConfirm = new verify('txtLoginPwdConfirm', function (value) {
  if (value) {
    return value === txtLoginPwd.formDom.value ? '' : '两次密码不一致';
  } else {
    return '密码不能为空';
  }
});

const userForm = $('.user-form');
userForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const res = await verify.validatForm(txtID, txtLoginPwd, txtLoginPwdConfirm, nickName);
  if (!res) {
    return;
  }
  const res2 = await reg(Object.fromEntries(new FormData(userForm)));
  if (res2.code === 0) {
    alert('注册成功');
    window.location.href = './login.html';
  } else {
    txtLoginPwdConfirm.errorP.innerText = res2.msg;
  }
});
