const core = require("@actions/core");
const exec = require("@actions/exec");

async function main() {
  try {
    // Get the variables we care about
    const os = core.getInput("os");
    const suite = core.getInput("suite");
    const action = core.getInput("action");
    const workingDirectory = core.getInput("working-directory");

    var suiteName = "";
    if (suite) {
      suiteName += suite;
    }
    if (os) {
      suiteName += `-${os}`;
    }

    const options = {
      cwd: workingDirectory,
    };

    await exec.exec(`kitchen ${action} ${suiteName}`, [], options);
  } catch (error) {
    core.setFailed(error.message);
  }
}
main();
