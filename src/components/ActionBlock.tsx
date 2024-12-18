import {useQuery} from "@tanstack/react-query";
import {fetchJidloRebuild} from "../api/api.ts";
import {useAtomValue} from "jotai/react";
import {tokenAtom} from "../atomStore.ts";
import {Button, Flex} from "antd";
import "./actionBlock.scss"

type Props = {
    apiCall: (token: string) => Promise<boolean>;
    buttonText: string;
    label: string;
}

const ActionBlock = ({apiCall, buttonText, label}: Props) => {
    const token = useAtomValue(tokenAtom)

    const { data, error, refetch, isLoading } = useQuery({
        queryKey: ['fetchJidloRebuild'],
        queryFn: () => apiCall(token),
        enabled: false,
        retry: false,
    })

    const handleClick = () => {
        refetch();
    }
    console.log(data)
    console.log(error)
    return (
        <Flex justify={"space-between"} align={"center"} className={"actionBlock p-16"}>
            <div>{label}</div>
            <Button type={"primary"} loading={isLoading} onClick={handleClick}>{buttonText}</Button>
        </Flex>
    );
}

export default ActionBlock;