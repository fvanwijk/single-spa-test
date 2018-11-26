module.exports = [
  {
    name: 'menu',
    selector: 'app-root-menu',
    baseHref: '/menu',
    container: '#menu',
    matchRoute: '/**'
  },
  {
    name: 'app1',
    selector: 'app-root-app1',
    baseHref: '/app1',
    matchRoute: '/app1/',
    container: '#app1',
    isDefaultApp: true
  },
  {
    name: 'app2',
    selector: 'app-root-app2',
    baseHref: '/app2',
    matchRoute: '/app2/',
    container: '#app2'
  }
];
