import {ReactNode} from "react";

type Props = {
    children: ReactNode;
    name: string
}

const AdminBlock = ({children, name}: Props) => {
    return (
        <div>
            <h2>{name}</h2>
            {children}
        </div>
    );
}

export default AdminBlock;