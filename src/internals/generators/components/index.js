const componentExists = require('../checks');

module.exports = {
  description: 'Creates A Reusable Component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the component ?',
      default: 'Button',
      validate: name => {
        if (/.+/.test(name)) {
          return componentExists(name)
            ? 'A component or container with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
  ],
  actions: [
    {
      type: 'add',
      path: '../../app/components/{{pascalCase name}}/index.tsx',
      templateFile: './components/index.tsx.hbs',
    },
    {
      type: 'add',
      path: '../../app/components/{{pascalCase name}}/styles.scss',
      templateFile: './components/styles.scss.hbs',
    },
    {
      type: 'append',
      path: '../../app/components/index.tsx',
      pattern: /(\/\/ COMPONENT IMPORTS)/g,
      template: `import {{pascalCase name}} from './{{pascalCase name}}';`,
    },
    {
      type: 'append',
      path: '../../app/components/index.tsx',
      pattern: /(\/\/ COMPONENT EXPORTS)/g,
      template: `  {{pascalCase name}},`,
    },
  ],
};
