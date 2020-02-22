// 1.创建XMLHttpRequest对象
let xhr = null;
// @ts-ignore
if (window.XMLHttpRequest) {
  xhr = new XMLHttpRequest();
} else {
  // @ts-ignore
  xhr = new ActiveXObject('Microsoft.XMLHTTP');
}
// 2.打开与服务器的链接
xhr.open('get', '/assets/config.json', false);
// 3.发送给服务器
xhr.send(null);
// 4.响应就绪（同步请求）
const json = JSON.parse(xhr.responseText);

export let PATH = '';
if (!json.isUrl) {
  PATH = json.path;
} else {
  // 1.创建XMLHttpRequest对象
  let xhr1 = null;
// @ts-ignore
  if (window.XMLHttpRequest) {
    xhr1 = new XMLHttpRequest();
  } else {
    // @ts-ignore
    xhr1 = new ActiveXObject('Microsoft.XMLHTTP');
  }
// 2.打开与服务器的链接
  xhr1.open('get', json.url, false);
// 3.发送给服务器
  xhr1.send(null);
// 4.响应就绪（同步请求）
  PATH = xhr1.responseText;
}

export const ASYNC_URLS = {
  'articleList': PATH + 'BwbdType/improveSearch?_allow_anonymous=true',
};
