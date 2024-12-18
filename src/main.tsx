import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ConfigProvider} from "antd";
import "./utils.scss"

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ConfigProvider
            theme={{
                token: {
                    // Seed Token
                    colorPrimary: 'green',
                    borderRadius: 4,
                },
            }}
        >
        <QueryClientProvider client={queryClient}>
            <App/>
        </QueryClientProvider>
        </ConfigProvider>
    </StrictMode>,
)
