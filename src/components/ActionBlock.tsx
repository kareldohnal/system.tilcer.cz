import {useQuery} from "@tanstack/react-query";
import {useAtomValue} from "jotai/react";
import {tokenAtom} from "../atomStore.ts";
import {Button, Flex} from "antd";
import "./actionBlock.scss"
import {useEffect, useState} from "react";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";

type Props = {
    apiCall: (token: string) => Promise<boolean>;
    buttonText: string;
    label: string;
    apiCallName: string;
}

const ActionBlock = ({apiCall, apiCallName, buttonText, label}: Props) => {
    const [success, setSuccess] = useState<boolean|null>(null);
    const token = useAtomValue(tokenAtom)

    const { data, error, refetch, isFetching } = useQuery({
        queryKey: [apiCallName, apiCall],
        queryFn: () => apiCall(token),
        enabled: false,
        retry: false,
    })

    const handleClick = () => {
        refetch();
    }

    useEffect(() => {
        setSuccess(null);
        if (data !== undefined) {
            setSuccess(data);
        }
    }, [data])

    console.log(data, success)
    console.log(error)

    return (
        <Flex justify={"space-between"} align={"center"} className={"actionBlock p-16"}>
            <div>{label}</div>
            <Button type={"primary"}
                    icon={success === null ? undefined : success ? <CheckOutlined /> : <CloseOutlined />}
                    loading={isFetching}
                    onClick={handleClick}
            >
                {buttonText}
            </Button>
        </Flex>
    );
}

export default ActionBlock;