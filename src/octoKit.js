import { context, getOctokit } from "@actions/github";

const octokit = getOctokit(token);

class OctoKit {

    makeRequest = async (url, data) => {
        return octokit.request(url, data)
    }
    

}

export default OctoKit;