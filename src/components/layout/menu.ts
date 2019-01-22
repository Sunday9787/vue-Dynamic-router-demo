export interface MenuType {
  name: string;
  link?: string;
  active?: boolean;
  icon?: string;
  root?: string;
  sub?: MenuType[];
  roles?: number[];
}

/**
 * 老板 1
 * 技术 2
 * 财务 3
 * 运营 4
 */

/**
 * 切记 菜单栏权限要跟 router role 对应
 */

const menu: MenuType[] = [
  {
    name: '主页',
    icon: 'home',
    link: '/home/index',
  },
  {
    name: '报表查询',
    icon: 'receipt',
    link: '/home/report',
    roles: [1, 2, 4],
  },
  {
    name: '应用列表',
    icon: 'apps',
    link: '/home/app',
    roles: [1, 2, 3],
  },
  {
    name: '商户管理',
    icon: 'account_box',
    root: '/home/account/',
    roles: [1, 3],
    sub: [
      { name: '商户充值', icon: 'payment', link: 'recharge' },
      { name: '提现', icon: 'autorenew', link: 'withdraw' },
    ],
  },
];

export default menu;
