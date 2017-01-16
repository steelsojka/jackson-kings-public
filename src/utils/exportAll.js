module.exports = function exportAll(_exports, _module) {
  Object.keys(_module).forEach(function(key) {
    _exports[key] = _module[key];
  });
};