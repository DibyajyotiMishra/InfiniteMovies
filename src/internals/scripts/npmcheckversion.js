const { exec } = require("child_process");

exec("npm -v", (error, version) => {
  if (error) {
    throw error;
  }
  if (parseFloat(version) < 5) {
    throw new Error(
      `[ERROR]: You are using an old version of npm. Please update to the recent version to continue.\n Your CURRENT VERSION: ${version}`
    );
  }
});