const STRAPI_URL = "https://tilcer.cz";
// const STRAPI_URL = "http://localhost:1337";
const SYSTEM_URL = "https://system.tilcer.cz";
// const SYSTEM_URL = "http://localhost:9000";

export const fetchToken = async (identifier: string, password: string) => {
    try {
        const response = await fetch(`${STRAPI_URL}/api/auth/local`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                identifier,
                password
            }),
        });

        if (!response.ok) {
            throw new Error("Invalid credentials");
        }

        const data = await response.json();

        return data.jwt;
    }
    catch (error) {
        throw error
    }
}

export const fetchJidloRebuild = async (token: string) => {
    try {
        await fetch(`${SYSTEM_URL}/build-jidlo`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}

export const fetchSystemFeRebuild = async (token: string) => {
    try {
        await fetch(`${SYSTEM_URL}/build-system-fe`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}