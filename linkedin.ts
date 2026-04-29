import { URLSearchParams } from "node:url";

const LinkedInLogin = (client_id: string, redirect_uri: string) => {
    const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=openid%20profile%20email`;

    return url;
}

const LinkedInCallback = async (code: string, client_id: string, client_secret: string, redirect_uri: string) => {
    try {
        // 1. Get access token
        const tokenRes = await fetch(
            "https://www.linkedin.com/oauth/v2/accessToken",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    grant_type: "authorization_code",
                    code,
                    redirect_uri,
                    client_id,
                    client_secret,
                }),
            }
        );

        const data = await tokenRes.json();
        const accessToken = data.access_token;

        // 2. Get user info
        const userRes = await fetch(
            "https://api.linkedin.com/v2/userinfo",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        const user = await userRes.json();

        // 3. Save or login user in DB
        return user;

    } catch (error: any) {
        return error;
    }
}


export { LinkedInLogin, LinkedInCallback }