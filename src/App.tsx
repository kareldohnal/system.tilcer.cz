import './App.css'
import {useAtomValue} from "jotai/react";
import {tokenAtom} from "./atomStore.ts";
import Login from "./components/Login.tsx";
import AdminBlock from "./components/AdminBlock.tsx";
import ActionBlock from "./components/ActionBlock.tsx";
import {fetchJidloRebuild} from "./api/api.ts";
import {isJwtValid} from "./utils/isJwtValid.ts";

function App() {
    const token = useAtomValue(tokenAtom);

    const tokenValid = isJwtValid(token);
    return (
        <>
            {!token || !tokenValid
                ? <Login/>
                : <div className={"app"}>
                    <AdminBlock name={"jidlo.tilcer.cz"}>
                        <ActionBlock
                            apiCall={fetchJidloRebuild}
                            buttonText={"Rebuild"}
                            label={"Rebuild jidlo.tilcer.cz"}
                        />
                    </AdminBlock>
                </div>
            }
        </>
    )
}

export default App
