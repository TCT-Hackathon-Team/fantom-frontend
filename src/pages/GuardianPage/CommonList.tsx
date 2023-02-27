import {GuardianTableData} from "../../common/types";
import React from "react";
import {Table} from "antd";

export const CommonList = ({data, columns}: GuardianTableData) => {
    return (
        <Table dataSource={data} columns={columns}/>
    )
}