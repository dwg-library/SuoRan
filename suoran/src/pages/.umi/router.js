import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';
import { routerRedux } from 'dva';

const Router = routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/',
    exact: true,
    component: require('../index.js').default,
  },
  {
    path: '/utils/getpro',
    exact: true,
    component: require('../utils/getpro.js').default,
  },
  {
    path: '/utils',
    exact: true,
    component: require('../utils/index.js').default,
  },
  {
    path: '/home',
    exact: false,
    component: require('../home/_layout.js').default,
    routes: [
      {
        path: '/home/address',
        exact: true,
        component: require('../home/address.js').default,
      },
      {
        path: '/home/classify',
        exact: true,
        component: require('../home/classify.js').default,
      },
      {
        path: '/home/feedback',
        exact: true,
        component: require('../home/feedback.js').default,
      },
      {
        path: '/home/home',
        exact: true,
        component: require('../home/home.js').default,
      },
      {
        path: '/home/info',
        exact: true,
        component: require('../home/info.js').default,
      },
      {
        path: '/home/new',
        exact: true,
        component: require('../home/new.js').default,
      },
      {
        path: '/home/newpro',
        exact: true,
        component: require('../home/newpro.js').default,
      },
      {
        path: '/home/O-details',
        exact: true,
        component: require('../home/O-details.js').default,
      },
      {
        path: '/home/orders',
        exact: true,
        component: require('../home/orders.js').default,
      },
      {
        path: '/home/prolist',
        exact: true,
        component: require('../home/prolist.js').default,
      },
      {
        path: '/home/record',
        exact: true,
        component: require('../home/record.js').default,
      },
      {
        component: () =>
          React.createElement(
            require('C:/Users/L/AppData/Roaming/npm/node_modules/umi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: false },
          ),
      },
    ],
  },
  {
    component: () =>
      React.createElement(
        require('C:/Users/L/AppData/Roaming/npm/node_modules/umi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: false },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return <Router history={history}>{renderRoutes(routes, props)}</Router>;
  }
}
