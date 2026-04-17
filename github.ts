const jwt = require('jsonwebtoken');

const github = async (baseURL: string) => {
    const clientId = process.env.GITHUB_CLIENT_ID!;
    const redirectUrl =
        `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user&redirect_uri=${baseURL}/api/auth/github/callback`
    return redirectUrl;
}

const githubCallback = async (code: string, time: string) => {
    const response = await fetch(`https://github.com/login/oauth/access_token`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                client_id: process.env.GITHUB_CLIENT_ID!,
                client_secret: process.env.GITHUB_CLIENT_SECRET!,
                code: code
            })
        }
    )
    const accessToken = response?.data?.access_token;
    // get user data

    const user = await fetch("https://api.github.com/user", {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    })
    const githubUser = user?.data;


    return { user: githubUser, accessToken }

}

export { github, githubCallback }