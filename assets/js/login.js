$(function () {
  // 点击去注册账号让 登录框隐藏，注册框显示
  $("#link_reg").click(() => {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  // 点击去登录让 注册框隐藏，登录框显示
  $("#link_login").click(() => {
    $(".login-box").show();
    $(".reg-box").hide();
  });

  // 从 LayUI 中获取 form 对象
  const form = layui.form
  const layer = layui.layer
  // const baseUrl = "http://www.liulongbin.top:3007";

  // 通过 form.verify() 方法自定义校验规则
  form.verify({
    // 自定义一个叫 pwd 的校验规则
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 校验两次密码是否一致的规则
    repass: (val) => {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败,则return一个提示消息即可
      const pwd = $(".reg-box [name=password").val();
      if (pwd !== val) return "两次密码不一致"
    },
  });

  $('#form_reg').on('submit', function (e) {
    e.preventDefault();
    const data = $(this).serialize();
    $.ajax({
      type: 'POST',
      url: '/api/reguser',
      data,
      success: res => {
        const { message, status } = res;
        if (status != 0) return layer.msg(message);
        $("#link_login").click();
      }
    });
  });

  $('#form_login').on('submit', function (e) {
    e.preventDefault();
    const data = $(this).serialize();
    $.ajax({
      type: 'POST',
      url: '/api/login',
      data,
      success: res => {
        const { message, status, token } = res;
        layer.msg(message);
        if (status != 0) return
        localStorage.setItem('token', token);
        location.href = '/index.html';
      }
    });
  });

  // 获取 layui 弹窗

  // 设置请求根路径


  // 监听注册表单，发送注册请求


  // 监听登录表单，发送登录请求

});
