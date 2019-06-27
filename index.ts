import { GET, POST, DELETE, UPDATE } from './controller';

import App$ from './app';
import api from './app/api';

App$.stream.subscribe(res => {
  console.log('receive app data', res);
});

api.createApp()
  .then(res => { POST('APP', res) })
  .then(api.deleteApp)
  .then(res => { DELETE('APP', res) })
  .then(api.updateApp)
  .then(res => { UPDATE('APP', res) })
