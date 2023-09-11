// import { getInput, setFailed } from "@actions/core";
import { context, getOctokit } from "@actions/github";

export class EnvironmentVariable {
    constructor() { 
        this.name = process.env.NAME.replace(/\s/g, '_');
        this.value = process.env.VALUE;
        this.token = process.env.PAT_TOKEN;
        this.octokit = getOctokit(token);
        this.repoName = process.env.REPO_NAME;
        this.ownerName = process.env.OWNER;
        this.repoId = process.env.REPO_ID;
        this.environmentName = process.env.ENVIRONMENT_NAME;
    }

    getAllEnvironments = async () => {
        let url = `GET /repos/${repoName}/environments`

        return octokit.request(url, {
            owner: ownerName,
            repo: repoName,
            name: name
        })
    }

    setVariableInAllEnvironments = async (value = this.value) => {

        const allEnvironments = await this.getAllEnvironments()

        for (const environment of allEnvironments.data.environments) {
            this.updateEnvironmentVariable(environment.name, value)
        }

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

    getEnvironmentVariable = async (environmentName = this.environmentName) => {

        let url = `GET /repositories/${repoId}/environments/${environmentName}/variables/${name}`

        return octokit.request(url, {
            owner: ownerName,
            repo: repoName,
            name: name
        })
    }

    updateEnvironmentVariable = async (environmentName = this.environmentName, value = this.value) => {

        let url = `PATCH /repositories/${repoId}/environments/${environmentName}/variables/${name}`

        return octokit.request(url, {
            owner: ownerName,
            repo: repoName,
            name: name,
            value: value
        })
    }

    createEnvironmentVariable = async (environmentName = this.environmentName, value=this.value) => {

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