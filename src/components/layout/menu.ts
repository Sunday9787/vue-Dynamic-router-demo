interface MenuType {
  name: string;
  link?: string;
  active?: boolean;
  icon?: string;
  root?: string;
  sub?: MenuType[];
}

export const menu: MenuType[] = [
  {
    name: '主页',
    icon: 'home',
    link: '/home/index',
  },
  {
    name: '报表查询',
    icon: 'receipt',
    link: '/home/report',
  },
  {
    name: '应用列表',
    icon: 'apps',
    link: '/home/app',
  },
  {
    name: '商户管理',
    icon: 'account_box',
    root: '/home/account/',
    sub: [
      { name: '商户充值', icon: 'payment', link: 'recharge' },
      { name: '提现', icon: 'autorenew', link: 'withdraw' },
    ],
  }
];
