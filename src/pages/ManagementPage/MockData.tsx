import { ColumnsType } from "antd/es/table";
import { TransactionData } from "../../common/types";
import React from "react";
import { Space, Tag } from "antd";

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
    dataIndex: "txHash",
    key: "name",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Value",
    key: "value",
    dataIndex: "value",
    render: (_, { value }) => (
      <Space size="middle">
        <p>{value}</p>
      </Space>
    ),
  },
  {
    title: "Type",
    key: "type",
    dataIndex: "txType",
    render: (_, { txType }) => (
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
  //   {
  //     title: "Tags",
  //     key: "tags",
  //     dataIndex: "tags",
  //     render: (_, { tags }) => (
  //       <>
  //         {tags.map((tag) => {
  //           let color = "geekblue";
  //           switch (tag) {
  //             case "deposit":
  //               color = "green";
  //               break;
  //             case "withdraw":
  //               color = "volcano";
  //               break;
  //             default:
  //               break;
  //           }
  //           return (
  //             <Tag color={color} key={tag}>
  //               {tag.toUpperCase()}
  //             </Tag>
  //           );
  //         })}
  //       </>
  //     ),
  //   },
];
