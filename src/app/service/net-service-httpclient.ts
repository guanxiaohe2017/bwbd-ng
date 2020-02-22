import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

export abstract class NetServiceHttpclient {
  // baseUrl = environment.config.apiUrl;
  baseUrl = '';

  constructor(public httpClient: HttpClient) {
  }

  get headers(): HttpHeaders {
    // const token: string = sessionStorage.getItem('token')===null?'':sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json'
      // 'Authorization': token
    });
    return headers;
  }

  get headersFile(): HttpHeaders {
    // const token: string = sessionStorage.getItem('token')===null?'':sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Accept: 'application/json',
      // 'Authorization': token
    });
    return headers;
  }

  /**
   * GET
   * @param relativeUrl
   * @param params
   * @param headers
   */
  get<T>(relativeUrl: string,
                   params?: HttpParams | { [param: string]: string | string[] },
                   headers?: HttpHeaders): Observable<T> {
    return this.httpClient.get<T>(this.baseUrl + relativeUrl, {
      headers: headers || this.headers,
      params
    });
  }

  /**
   * Post
   * @param relativeUrl
   * @param body
   * @param params
   * @param headers
   */
  post<T>(relativeUrl: string,
                    body?: any,
                    params?: HttpParams | { [param: string]: string | string[] },
                    headers?: HttpHeaders): Observable<T> {
    return this.httpClient.post<T>(this.baseUrl + relativeUrl, body, {
      headers: headers || this.headers,
      params
    });
  }

  /**
   * Post
   * @param relativeUrl
   * @param body
   * @param params
   * @param headers
   */
  postFile<T>(relativeUrl: string,
                        body?: any,
                        params?: HttpParams | { [param: string]: string | string[] },
                        headers?: HttpHeaders): Observable<T> {
    return this.httpClient.post<T>(this.baseUrl + relativeUrl, body, {
      headers: headers || this.headersFile,
      params
    });
  }

  /**
   * GET
   * @param relativeUrl
   * @param params
   * @param headers
   */
  getMap<T>(relativeUrl: string,
                      params?: HttpParams | { [param: string]: string | string[] },
                      headers?: HttpHeaders): Observable<T> {
    return this.httpClient.get<T>(relativeUrl);
  }

  /**
   * Put
   * @param relativeUrl
   * @param body
   * @param params
   * @param headers
   */
  put<T>(relativeUrl: string,
                   body?: any,
                   params?: HttpParams | { [param: string]: string | string[] },
                   headers?: HttpHeaders): Observable<T> {
    return this.httpClient.put<T>(this.baseUrl + relativeUrl, body, {
      headers: headers || this.headers,
      params
    });
  }

  /**
   * Delete
   * @param relativeUrl
   * @param params
   * @param headers
   */
  delete<T>(relativeUrl: string,
                      params?: HttpParams | { [param: string]: string | string[] },
                      headers?: HttpHeaders): Observable<T> {
    return this.httpClient.delete<T>(this.baseUrl + relativeUrl, {
      headers: headers || this.headers,
      params
    });
  }

  /*
  * export
  * */
  export(relativeUrl: string,
                   body?: any,
                   fileName?: string,
                   fileType?: any) {
    this.httpClient.request('post', this.baseUrl + relativeUrl,
      {body, observe: 'response', responseType: 'blob', headers: this.headers})
      .subscribe(result => {
        // 判断浏览器内核
        const uA = window.navigator.userAgent;
        const isIE = /msie\s|trident\/|edge\//i.test(uA)
          && !!('uniqueID' in document || 'documentMode' in document
            || ('ActiveXObject' in window) || 'MSInputMethodContext' in window);
        const data = result.body;
        const blob = new Blob([data], {type: fileType || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});

        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.setAttribute('style', 'display:none');
        a.setAttribute('href', objectUrl);
        a.setAttribute('download', fileName);

        // 此处是为了兼容火狐点击事件；
        document.body.appendChild(a);
        if (isIE) {
          // 兼容IE11无法触发下载的问题
          navigator.msSaveBlob(new Blob([data]), a.download);
        } else {
          a.click();
        }
        /*// 触发下载后再释放链接
        a.addEventListener('click', function() {
          URL.revokeObjectURL(a.href);
          document.getElementById('download').remove();
        });
        a.click();
        URL.revokeObjectURL(objectUrl);*/
      });

  }
}
