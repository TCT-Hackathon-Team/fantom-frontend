import { ProtecteeTableData } from "../../common/types";
import React from "react";
import { Table } from "antd";

export const ProtecteeList = ({ data, columns }: ProtecteeTableData) => {
  return <Table dataSource={data} columns={columns} />;
};
