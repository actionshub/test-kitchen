const core = require('@actions/core');
const exec = require('@actions/exec')

async function main() {
  try {
    // Get the variables we care about
    const os = core.getInput('os')
    const suite = core.getInput('suite')
    const action = core.getInput('action')

    await exec.exec(`kitchen ${action} ${suite}-${os}`)
  } catch (error){
    core.setFailed(error.message);
  }
}
main()
