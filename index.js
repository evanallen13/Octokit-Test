import { EnvironmentVariable } from "./src/environmentVariable.js";

// const name = process.env.NAME.replace(/\s/g, '_')
// const value = process.env.VALUE
// const token = process.env.PAT_TOKEN
// const octokit = github.getOctokit(token);

// const repoName = process.env.REPO;
// const ownerName = process.env.OWNER;

// const createVariable = (value) => {

//     let url = 'POST '
//     url += "/repos/" + repoName
//     url += '/actions/variables'

//     return octokit.request(url, {
//         owner: ownerName,
//         repo: repoName,
//         name: name,
//         value: value
//     })
// }

// const setVariable = (value) => {

//     let url = 'PATCH '
//     url += "/repos/" + repoName
//     url += '/actions/variables/' + name

//     return octokit.request(url, {
//         owner: ownerName,
//         repo: repoName,
//         name: name,
//         value: value
//     })
// }

// const getVariable = (varname) => {

//     let url = 'GET '
//     url += "/repos/" + repoName
//     url += '/actions/variables/' + varname
//     console.log(url)

//     return octokit.request(url, {
//         owner: ownerName,
//         repo: repoName,
//         name: name
//     })
// }

// const exists = async () => {
//     let exists = false;

//     try {
//         const response = await getVariable(name)
//         exists = (response.status === 200) ? true : false
//     } catch (error) {
//         exists = false
//     }

//     return exists
// }


// const increment = async () => {
//     const doesExist = await exists()

//     if (doesExist) {
//         let variable = await getVariable(name)
//         variable = variable.data.value
//         if (variable.match(/^[0-9]+$/)) {
//             variable = (parseInt(variable) + 1).toString()
//             setVariable(variable)
//         }
//     }
//     else {
//         createVariable((1).toString())
//     }
// }



// increment()
const run = async () => {
    const ev = new EnvironmentVariable();
    // const response = await ev.getEnvironmentVariable()
    // console.log(response.data)
    
    ev.incrementEnvironmentVariable()
}

run()
