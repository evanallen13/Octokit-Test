const core = require("@actions/core");
const github = require("@actions/github");

const name = process.env.NAME
const value = process.env.VALUE
const token = process.env.PAT_TOKEN
const octokit = github.getOctokit(token);

const repoName = "ActionContainer";
const ownerName = "evanallen13";

const createVariable = (data) => {

    let url = 'POST '
    url += "/repos/" + ownerName + "/" + repoName
    url += '/actions/variables'

    return octokit.request(url, {
        owner: ownerName,
        repo: repoName,
        name: name,
        value: data
    })
}

const setVariable = (data) => {

    let url = 'PATCH '
    url += "/repos/" + ownerName + "/" + repoName
    url += '/actions/variables/' + name

    return octokit.request(url, {
        owner: ownerName,
        repo: repoName,
        name: name,
        value: data
    })
}

const getVariable = (varname) => {

    let url = 'GET '
    url += "/repos/" + ownerName + "/" + repoName
    url += '/actions/variables/' + varname

    return octokit.request(url, {
        owner: ownerName,
        repo: repoName,
        name: name
    })
}


console.log("Setting variable: " + name)
getVariable(name).then((res) => {
    setVariable(value)
}).catch((err) => {
    createVariable(value)
})