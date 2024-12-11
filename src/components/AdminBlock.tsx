import {ReactNode} from "react";
import "./adminBlock.scss"

type Props = {
    children: ReactNode;
    name: string
}

const AdminBlock = ({children, name}: Props) => {
    return (
        <div className={"adminBlock"}>
            <div className={"adminBlock__heading"}>
                <hr className={"adminBlock__preHeading"}/>
                <h2>{name}</h2>
                <hr className={"adminBlock__postHeading"}/>
            </div>
            {children}
        </div>
    );
}

export default AdminBlock;