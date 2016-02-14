var Service = {
  //host:'http://127.0.0.1:3001',
  host:'http://192.168.2.1:3001',
  login: '/user/login',
  loginByToken: '/user/login/token',
  getUser: '/user/get',
  createUser: '/user/create',
  getMessage: '/message/get',
  addMessage: '/message/add',
  updatePassword: '/user/password/update',
  deleteUser: '/user/delete'
};

module.exports = Service;