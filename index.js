import { EnvironmentVariable } from "./src/environmentVariable.js";

const run = async () => {
    const ev = new EnvironmentVariable();
    // const response = await ev.getEnvironmentVariable()
    // console.log(response.data)
    // ev.incrementEnvironmentVariable()
    const allEv = await ev.getAllEnvironments()
    console.log(allEv.data.environments)
}

const run2 = async () => {  
    console.log('run2')
}


module.exports = { run, run2 }