import {TransactionTableData} from "../../common/types";
import React from "react";
import {Table} from "antd";

export const TransactionTable = ({columns, data}: TransactionTableData): JSX.Element => {
    return (
        <Table columns={columns} dataSource={data}/>
    )
}