import {useState} from "react";

type Props = {
    apiCall: (token: string) => Promise<boolean>;
    buttonText: string;
    label: string;
}

const ActionBlock = ({apiCall, buttonText, label}: Props) => {
    const [loading, setLoading] = useState(false);



    return (
        <div className={"actionBlock"}>
            <div>{label}</div>
            <button>{buttonText}</button>
        </div>
    );
}

export default ActionBlock;