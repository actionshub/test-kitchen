const core = require('@actions/core');
const exec = require('@actions/exec')
const os = require('os')

async function main() {
  try {
    // Get the variables we care about
    // const os = core.getInput('os')
    const suite = core.getInput('suite')
    const action = core.getInput('action')
    var suiteName = ''
    if (suite)
    {
       suiteName += `${suite}`
    }
    if (os)
    {
      suiteName += `-${os}`
    }

    if (os.platform() != 'win32')
    {
      await exec.exec(`kitchen ${action} ${suiteName}`)
    }
    else
      await exec.exec(`powershell.exe -command "kitchen ${action} ${suiteName}"`)
  } catch (error){
    core.setFailed(error.message);
  }
}
main()
