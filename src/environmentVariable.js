// import { getInput, setFailed } from "@actions/core";
import { context, getOctokit } from "@actions/github";

const name = process.env.NAME.replace(/\s/g, '_')
const value = process.env.VALUE
const token = process.env.PAT_TOKEN
const octokit = getOctokit(token);

const repoName = process.env.REPO;
const ownerName = process.env.OWNER;
const repoId = process.env.REPO_ID;
const environmentName = process.env.ENVIRONMENT_NAME;

export class EnvironmentVariable {

    getAllEnvironments = async () => {
        let url = `GET /repos/evanallen13/Octokit-Test/environments`

        return octokit.request(url, {
            owner: ownerName,
            repo: repoName,
            name: name
        })
    }

    existsEnvironmentVariable = async () => {
        let exists = false;

        try {
            const response = await this.getEnvironmentVariable()
            exists = (response.status === 200) ? true : false
        } catch (error) {
            exists = false
        }

        return exists
    }

    getEnvironmentVariable = async () => {

        let url = `GET /repositories/${repoId}/environments/${environmentName}/variables/${name}`

        return octokit.request(url, {
            owner: ownerName,
            repo: repoName,
            name: name
        })
    }

    updateEnvironmentVariable = async (value=name) => {

        let url = `PATCH /repositories/${repoId}/environments/${environmentName}/variables/${name}`

        return octokit.request(url, {
            owner: ownerName,
            repo: repoName,
            name: name,
            value: value
        })
    }

    createEnvironmentVariable = async () => {

        let url = `POST /repositories/${repoId}/environments/${environmentName}/variables`

        return octokit.request(url, {
            owner: ownerName,
            repo: repoName,
            name: name,
            value: value
        })
    }

    incrementEnvironmentVariable = async () => {
        const doesExist = await this.existsEnvironmentVariable()

        if (doesExist) {
            let variable = await this.getEnvironmentVariable(name)
            variable = variable.data.value
            if (variable.match(/^[0-9]+$/)) {
                variable = (parseInt(variable) + 1).toString()
                this.updateEnvironmentVariable(variable)
            }
        }
        else {
            this.createEnvironmentVariable((1).toString())
        }
    }
}