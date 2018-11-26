import { registerApplication, start } from 'single-spa';
import { loader, router } from 'single-spa-angular-cli';
import 'zone.js';
import 'babel-polyfill';

const applications = require('./applications.config.js');

for (const application of applications) {
  registerApplication(
    application.name,
    (() => {
      const lifecycles = loader({
        name: application.name,
        selector: application.selector,
        container: application.container,
        baseHref: application.baseHref
      });

      return {
        bootstrap: [lifecycles.bootstrap],
        mount: [lifecycles.mount],
        unmount: [lifecycles.unmount],
        unload: [lifecycles.unload]
      };
    })(),
    router.matchRoute(application.matchRoute, application.isDefaultApp)
  );
}

start();
