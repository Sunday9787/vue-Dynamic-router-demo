/*
 * @Author: Edward
 * @Date: 2018-11-17 23:36:38
 * @Last Modified by: Edward
 * @Email: 809537981@qq.com
 * @Last Modified time: 2018-11-17 23:37:32
 */
import Cookies from 'js-cookie';

const TokenKey = 'token';

function setToken (token: string) {
  return Cookies.set(TokenKey, token, { expires: 1 });
}

function getToken () {
  return Cookies.get(TokenKey);
}

function removeToken () {
  return Cookies.remove(TokenKey);
}

export {
  setToken,
  getToken,
  removeToken,
};
