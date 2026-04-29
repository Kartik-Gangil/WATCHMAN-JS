const GoogleLogin = (client_id: string, redirect_uri: string) => {
    const redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        new URLSearchParams({
            client_id,
            redirect_uri,
            response_type: 'code',
            scope: 'openid email profile',
            access_type: 'offline',
            prompt: 'consent'
        });

    return redirectUrl;
}

const GoogleCallback = async (code: string, client_id: string, client_secret: string, redirect_uri: string) => {

    try {

        // 🔁 Exchange code for token
        const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                code,
                client_id,
                client_secret,
                redirect_uri,
                grant_type: 'authorization_code'
            })
        });

        const tokenData = await tokenRes.json();

        const accessToken = tokenData.access_token;

        // 👤 Get user info
        const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });

        const user = await userRes.json();


        return { user, accessToken };
    } catch (error: any) {
        return error
    }
}

export { GoogleCallback, GoogleLogin }