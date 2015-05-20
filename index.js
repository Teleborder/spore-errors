exports.noAppFound = errType('SPORE_NO_APP', function (sporeFile, dir) {
  return "No " + sporeFile + " found in " + dir;
});

exports.appExists = errType('SPORE_APP_EXISTS', function (dir) {
  return "A Spore app already exists in " + dir;
});

exports.noValue = errType('SPORE_CELL_UNDEFINED', function (cellName) {
  return "No value has been specified for " + cellName;
});

exports.onlyStrings = errType('SPORE_CELL_ONLY_STRINGS', function (cellName) {
  return "Only strings are allowed as cell values (cell: " + cellName + ")";
});

exports.badPath = errType('SPORE_CELL_PATH_INVALID', function (path, sep) {
  return "The cell path `" + path + "` is invalid - it should separate the app, environment, and cell with `" + sep +"`";
});

exports.noEnvs = errType('SPORE_APP_NO_ENVIRONMENTS', function (appName) {
  return "The Spore app " + appName + " does not have any environments";
});

function errType(code, msgFn) {
  msgFn = msgFn || function () {};

  return {
    code: code,
    build: function () {
      var err = new Error(msgFn.apply(this, [].slice.call(arguments)));
      err.code = this.code;
      return err;
    },
    test: function (err) {
      return err && err.code === this.code;
    }
  };
}
