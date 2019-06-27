function getList() {
  return Promise.resolve([{
    id: 1,
    name: 'app1',
  }, {
    id: 2,
    name: 'app2',
  }, {
    id: 3,
    name: 'app3',
  }, {
    id: 4,
    name: 'app4',
  }]);
}

function updateApp() {
  return Promise.resolve({ id: 1, name: 'mimo1' });
}

function deleteApp() {
  return Promise.resolve({ id: 2 });
}

function createApp() {
  return Promise.resolve({ id: 5, name: 'app5' });
}

export default {
  getList,
  updateApp,
  deleteApp,
  createApp,
};

