import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {ASYNC_URLS} from '@shared/async-url.crud';
import {NetServiceHttpclient} from '../../service/net-service-httpclient';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: []
})
export class ArticleListComponent implements OnInit {
  // endregion

  constructor(private http: _HttpClient, private cdr: ChangeDetectorRef) {}
  q: any = {
    ps: 5,
    categories: [],
    owners: ['zxx'],
  };

  list: any[] = [];
  loading = false;

  term = '财税';

  star = Math.ceil(Math.random() * 100) + 100;
  like = Math.ceil(Math.random() * 100) + 100;
  message = Math.ceil(Math.random() * 100) + 100;



  // region: cateogry
  categories = [
    { id: 0, text: '全部', value: false },
    { id: 1, text: '案例', value: false },
    { id: 2, text: '法规', value: false },
    { id: 3, text: '问答', value: false },
  ];
  // endregion

  // region: owners
  owners = [
    {
      id: 'wzj',
      name: '我自己',
    },
    {
      id: 'wjh',
      name: '吴家豪',
    },
    {
      id: 'zxx',
      name: '周星星',
    },
    {
      id: 'zly',
      name: '赵丽颖',
    },
    {
      id: 'ym',
      name: '姚明',
    },
  ];

  getRandomNum(): number {

    return Math.ceil(Math.random() * 100) + 100;
  }


  changeCategory(status: boolean, idx: number) {
    if (idx === 0) {
      this.categories.map(i => (i.value = status));
    } else {
      this.categories[idx].value = status;
    }
  }

  setOwner() {
    this.q.owners = [`wzj`];
    // TODO: wait nz-dropdown OnPush mode
    setTimeout(() => this.cdr.detectChanges());
  }

  ngOnInit() {
    this.getData();
  }

  getData(more = false) {
    const params = {
      term: this.term,
    };
    this.loading = true;
    this.http.post(ASYNC_URLS.articleList, params).subscribe((res: any) => {
      if (res) {
        this.list = more ? this.list.concat(res.rows) : res.rows;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
