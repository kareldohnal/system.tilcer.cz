import "./login.scss"
import {fetchToken} from "../api/api.ts";
import {useSetAtom} from "jotai/react";
import {tokenAtom} from "../atomStore.ts";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";

const Login = () => {
    const setToken = useSetAtom(tokenAtom);
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");

    const { data: token, error: tokenError, refetch } = useQuery({
        queryKey: ['fetchToken'],
        queryFn: () => fetchToken(identifier, password),
        enabled: false,
        retry: false,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        setIdentifier(target.identifier.value)
        setPassword(target.password.value)
        refetch();
    }

    useEffect(() => {
        if (token) {
            setToken(token);
        }
    }, [token])

    return (
        <div className={"login"}>
            <form onSubmit={handleSubmit} className={"login__form"}>
                <label className={"login__label"}>
                    Username:
                    <input type="text" name={"identifier"} />
                </label>
                <label className={"login__label"}>
                    Password:
                    <input type="password" name={"password"} />
                </label>
                <div className={`login__error${tokenError ? " shake" : ""}`}>{tokenError && tokenError.message}</div>
                <button type={"submit"}>Login</button>
            </form>
        </div>
    );
}

export default Login;