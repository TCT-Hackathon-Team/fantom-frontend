import {ColumnsType} from "antd/es/table";
import {TransactionData, truncate} from "@/common/types";
import React from "react";
import {Space, Tag} from "antd";

export interface TransactionDataFormat {
    txHash: string;
    txType: string;
    value: number;
}

export async function getTransactions(): Promise<ColumnsType<TransactionData>> {
    return [];
}

export const columns: ColumnsType<TransactionData> = [
    {
        title: "Tx Hash",
        key: "txHash",
        dataIndex: "txHash",
        render: (_, {txHash}) => (
            <Space size="middle">
                <p>
                    <a href={`https://testnet.ftmscan.com/tx/${txHash}`} target="_blank">
                        {truncate(txHash, 12, 5, 20)}
                    </a>
                </p>
            </Space>
        ),
    },
    {
        title: "Value",
        key: "value",
        dataIndex: "value",
        render: (_, {value}) => (
            <Space size="middle">
                <p>{value}</p>
            </Space>
        ),
    },
    {
        title: "Type",
        key: "type",
        dataIndex: "txType",
        render: (_, {txType}) => (
            <>
                <Tag
                    color={txType.toLowerCase() == "deposit" ? "green" : "volcano"}
                    key={txType}
                >
                    {txType.toUpperCase()}
                </Tag>
            </>
        ),
    },
];
