import { defer, of } from 'rxjs';

import controller$ from '../controller';
import DataModule from '../module-factory';
import api from './api';

const App$ = new DataModule({
  module: 'APP',

  source: controller$,

  get: () => defer(api.getList),

  del: (storedData, delApp) =>
    of(storedData.filter(app => app.id !== delApp.id)),

  update: (storedData, updatedApp) => {
    const prevIndex = storedData.findIndex(app => app.id === updatedApp.id);
    return of(
      storedData.map((v, i) => (i === prevIndex ? updatedApp : v)),
    );
  },

  post: (storedData, newApp) =>
    of([].concat(storedData, newApp)),
});

export default App$;
