import React from "react";
import {Card, Col, Row, Statistic} from "antd";
import {InfoData, truncate} from "@/common/types";

export const InfoStatistic = ({balance, address}: InfoData): JSX.Element => {
    const fullAddress = address;
    const formatAddress = truncate(fullAddress, 4, 5, 12);
    return (
        <Row gutter={16}>
            <Col span={12}>
                <Card bordered={false}>
                    <Statistic
                        title="Balance"
                        value={balance}
                        precision={5}
                        valueStyle={{color: "#3f8600"}}
                        // prefix={<ArrowUpOutlined />}
                        suffix="FTM"
                    />
                </Card>
            </Col>
            <Col span={12}>
                <Card bordered={false}>
                    <a
                        href={`https://testnet.ftmscan.com/address/${fullAddress}`}
                        target="_blank"
                    >
                        <Statistic
                            title="Address"
                            value={formatAddress}
                            valueStyle={{color: "#cf1322"}}
                            // prefix={<ArrowDownOutlined />}
                        />
                    </a>
                </Card>
            </Col>
        </Row>
    );
};
