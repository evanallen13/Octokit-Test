const core = require("@actions/core");
const github = require("@actions/github");

const name = process.env.NAME.replace(/\s/g, '_') 
const value = process.env.VALUE
const token = process.env.PAT_TOKEN
const octokit = github.getOctokit(token);

const repoName = process.env.REPO;
const ownerName = process.env.OWNER;

const createVariable = (value) => {

    let url = 'POST '
    url += "/repos/" + repoName
    url += '/actions/variables'

    return octokit.request(url, {
        owner: ownerName,
        repo: repoName,
        name: name,
        value: value
    })
}

const setVariable = (value) => {

    let url = 'PATCH '
    url += "/repos/" + repoName
    url += '/actions/variables/' + name

    return octokit.request(url, {
        owner: ownerName,
        repo: repoName,
        name: name,
        value: value
    })
}

const getVariable = (varname) => {

    let url = 'GET '
    url += "/repos/" + repoName
    url += '/actions/variables/' + varname

    return octokit.request(url, {
        owner: ownerName,
        repo: repoName,
        name: name
    })
}

const exists = () => {
    getVariable(name).then((res) => {
        return true;
    }).catch((err) => {
        return false;
    }) 
}


const increment = () => {  
    if (exists()){
        let variable = getVariable(name)
        if( variable.value.match(/^[0-9]+$/) ) {
            setVariable(parseInt(variable.value) + 1)
        }
    }
    else {
        createVariable(1)
    }
}


increment()