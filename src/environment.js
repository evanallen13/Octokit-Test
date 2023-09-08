// import { getInput, setFailed } from "@actions/core";
import { context, getOctokit } from "@actions/github";

const name = process.env.NAME.replace(/\s/g, '_')
const value = process.env.VALUE
const token = process.env.PAT_TOKEN
const octokit = getOctokit(token);

const repoName = process.env.REPO;
const ownerName = process.env.OWNER;
const repoId = process.env.REPO_ID;

export const getEnvironmentVariable = async () => {

    let url = `GET /repositories/${repoId}/environments/${environmentName}/variables/${name}`

    return octokit.request(url, {
        owner: ownerName,
        repo: repoName,
        name: name
    })
}