import { context, getOctokit } from "@actions/github";

export class EnvironmentVariable {
    
    constructor(ownerName, repoName, repoId, name) {
        this.ownerName = ownerName;
        this.repoName = repoName;
        this.repoId = repoId;
        this.name = name;
    }

    existsEnvironmentVariable = async () => {
        let exists = false;
    
        try {
          const response = await this.getEnvironmentVariable(this.name);
          exists = response.status === 200;
        } catch (error) {
          exists = false;
        }
    
        return exists;
      };
    
      getEnvironmentVariable = async (environmentName) => {
        let url = `/repositories/${this.repoId}/environments/${environmentName}/variables/${this.name}`;
    
        return octokit.request(url, {
          owner: this.ownerName,
          repo: this.repoName,
          name: this.name,
        });
      };
    
      updateEnvironmentVariable = async (environmentName, value) => {
        let url = `/repositories/${this.repoId}/environments/${environmentName}/variables/${this.name}`;
    
        return octokit.request(url, {
          owner: this.ownerName,
          repo: this.repoName,
          name: this.name,
          value: value,
        });
      };
    
      createEnvironmentVariable = async (environmentName, value) => {
        let url = `/repositories/${this.repoId}/environments/${environmentName}/variables`;
    
        return octokit.request(url, {
          owner: this.ownerName,
          repo: this.repoName,
          name: this.name,
          value: value,
        });
      };
    
      incrementEnvironmentVariable = async () => {
        const doesExist = await this.existsEnvironmentVariable();
    
        if (doesExist) {
          let variable = await this.getEnvironmentVariable(this.name);
          variable = variable.data.value;
          if (variable.match(/^[0-9]+$/)) {
            variable = (parseInt(variable) + 1).toString();
            await this.updateEnvironmentVariable(this.name, variable);
          }
        } else {
          await this.createEnvironmentVariable(this.name, '1');
        }
      };
}