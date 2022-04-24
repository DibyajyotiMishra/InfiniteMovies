const componentExists = require('../checks');

module.exports = {
  description: 'Creates A New WebPage Component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the Page?',
      default: 'NotFound',
      validate: (name) => {
        if (/.+/.test(name)) {
          return componentExists(name)
            ? 'A component or page with this name already exists'
            : true;
        }

        return 'The name is required';
      }
    },
    {
      type: 'confirm',
      name: 'memo',
      default: false,
      message: 'Do you want to wrap your component in React.memo?'
    },
    {
      type: 'confirm',
      name: 'wantHeaders',
      default: false,
      message: 'Do you want headers?'
    },
    {
      type: 'confirm',
      name: 'wantActionsAndReducer',
      default: true,
      message:
        'Do you want an actions/constants/reducer tuple for this pages?'
    },
    {
      type: 'confirm',
      name: 'wantSaga',
      default: true,
      message: 'Do you want sagas for asynchronous flows? (e.g. fetching data)'
    }
  ],
  actions: (res) => {
    const actions = [
      {
        type: 'add',
        path: '../../app/pages//{{pascalCase name}}/index.tsx',
        templateFile: './pages/index.tsx.hbs',
        abortOnFail: true
      },
      {
        type: 'add',
        path: '../../app/pages//{{pascalCase name}}/styles.scss',
        templateFile: './pages/styles.scss.hbs',
        abortOnFail: true
      },
      {
        type: 'add',
        path: '../../app/pages//{{pascalCase name}}/type.d.ts',
        templateFile: './pages/type.d.ts.hbs',
        abortOnFail: true,
      }
    ];

    if (res.wantActionsAndReducer) {
      actions.push({
        type: 'add',
        path: '../../app/pages//{{pascalCase name}}/actions.ts',
        templateFile: './pages/actions.ts.hbs',
        abortOnFail: true
      });

      actions.push({
        type: 'add',
        path: '../../app/pages//{{pascalCase name}}/actions.types.ts',
        templateFile: './pages/actions.types.ts.hbs',
        abortOnFail: true
      });


      actions.push({
        type: 'add',
        path: '../../app/pages//{{pascalCase name}}/reducer.ts',
        templateFile: './pages/reducer.ts.hbs',
        abortOnFail: true
      });
    }
    if (res.wantSaga) {
      actions.push({
        type: 'add',
        path: '../../app/pages//{{pascalCase name}}/saga.ts',
        templateFile: './pages/saga.ts.hbs',
        abortOnFail: true
      });
    }
    return actions;
  }
};