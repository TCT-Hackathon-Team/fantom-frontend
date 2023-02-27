import {ColumnsType} from "antd/es/table";
import {TransactionData} from "../../common/types";
import React from "react";
import {Space, Tag} from "antd";

export const columns: ColumnsType<TransactionData> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <p>{text}</p>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, {tags}) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <p>Hello Action</p>
            </Space>
        ),
    },
];

export const data1: TransactionData[] = [
    {
        key: '1',
        name: 'TCT2001',
        age: 2001,
        address: 'New York No. 1 Lake Park',
        tags: ['COOL', 'GOOD BOY'],
    },
    {
        key: '2',
        name: 'TCT2001',
        age: 2001,
        address: 'London No. 1 Lake Park',
        tags: ['NICE'],
    },
];

export const data2: TransactionData[] = [
    {
        key: '1',
        name: 'TCT2001',
        age: 2001,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'TCT2001',
        age: 2001,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'TCT2001',
        age: 2001,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];