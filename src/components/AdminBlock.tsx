import {ReactNode} from "react";
import "./adminBlock.scss"
import {Divider} from "antd";

type Props = {
    children: ReactNode;
    name: string
}

const AdminBlock = ({children, name}: Props) => {
    return (
        <div className={"adminBlock"}>
            <div className={"adminBlock__heading"}>
                <Divider style={{ borderColor: '#ffffff' }} orientation={"left"}>
                    <h2 className={"adminBlock__heading"}>{name}</h2>
                </Divider>
            </div>
            {children}
        </div>
    );
}

export default AdminBlock;