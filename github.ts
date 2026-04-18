
const GithubLogin = async (redirectURL: string, clientId: string) => {

    const redirectUrl =
        `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user&redirect_uri=${redirectURL}`
    return redirectUrl;
}

const GithubCallback = async (code: string, client_id: string, client_secret: string) => {
    const response = await fetch(`https://github.com/login/oauth/access_token`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                client_id,
                client_secret,
                code
            })
        }
    )
    const data = await response.json();
    const accessToken = data?.access_token;
    // get user data

    const user = await fetch("https://api.github.com/user", {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    })
    const userdata = await user.json();
    const githubUser = userdata;


    return { user: githubUser, accessToken }

}

export { GithubLogin, GithubCallback }