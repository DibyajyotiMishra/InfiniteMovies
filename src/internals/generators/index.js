/* Template Generators */
const componentGenerator = require('./components');
const pageGenerator = require('./pages');

module.exports = plop => {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('page', pageGenerator);
};
