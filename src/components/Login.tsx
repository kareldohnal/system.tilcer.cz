import "./login.scss"
import {fetchToken} from "../api/api.ts";
import {useSetAtom} from "jotai/react";
import {tokenAtom} from "../atomStore.ts";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {Alert, Button, Form, FormProps, Input} from "antd";

type FieldType = {
    username: string;
    password: string;
};

const Login = () => {
    const setToken = useSetAtom(tokenAtom);
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");

    const {data: token, error: tokenError, refetch, isLoading} = useQuery({
        queryKey: ['fetchToken'],
        queryFn: () => fetchToken(identifier, password),
        enabled: false,
        retry: false,
    })


    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        setIdentifier(values.username)
        setPassword(values.password)
        refetch();
    };

    useEffect(() => {
        if (token) {
            setToken(token);
        }
    }, [token])

    return (
        <div className={"login"}>
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item<FieldType>

                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password autoComplete={"off"}/>
                </Form.Item>

                {tokenError && (
                    <Form.Item label={null}>
                        <Alert type={"error"} message={tokenError.message} className={"w-full"}/>
                    </Form.Item>
                )}

                <Form.Item label={null}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}
                        className={"w-full"}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;