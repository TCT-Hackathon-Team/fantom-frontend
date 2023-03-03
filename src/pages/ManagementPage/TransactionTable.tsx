import {TransactionTableData} from "@/common/types";
import React from "react";
import {Table} from "antd";

export const TransactionTable = ({columns, data, rowKey}: TransactionTableData): JSX.Element => {
    return (
        <>
            {rowKey ? (
                <Table rowKey={rowKey} columns={columns} dataSource={data}/>
            ) : (
                <Table columns={columns} dataSource={data}/>
            )}
        </>
    )
}