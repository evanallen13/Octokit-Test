import { EnvironmentVariable } from "./src/environmentVariable.js";


const run = async () => {
    const environmentVariable = new EnvironmentVariable()
    await environmentVariable.setVariableInAllEnvironments()
}

run()