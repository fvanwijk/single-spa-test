import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { platformSingleSpa } from 'single-spa-angular-cli';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformSingleSpa.mount('app1').subscribe(({ props, attachUnmount }) => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .then(module => {
      attachUnmount(module);
      console.log('bootstrapped app1');
    })
    .catch(err => console.error(err));
});
