const STRAPI_URL = "https://tilcer.cz";
const SYSTEM_URL = "https://system.tilcer.cz/api";

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
        const response = await fetch(`${SYSTEM_URL}/build-jidlo`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            console.error("Rebuild failed");
            return false
        }

        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}

export const fetchSystemFeRebuild = async (token: string) => {
    try {
        const response = await fetch(`${SYSTEM_URL}/build-system-fe`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            console.error("Rebuild failed");
            return false
        }

        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}