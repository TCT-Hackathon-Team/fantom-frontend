import React from "react";
import { Card, Col, Row, Statistic } from "antd";
import { InfoData } from "../../common/types";

export const InfoStatistic = ({ balance, address }: InfoData): JSX.Element => {
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Card bordered={false}>
          <Statistic
            title="Balance"
            value={balance}
            precision={5}
            valueStyle={{ color: "#3f8600" }}
            // prefix={<ArrowUpOutlined />}
            suffix="FTM"
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card bordered={false}>
          <Statistic
            title="Address"
            value={address}
            valueStyle={{ color: "#cf1322" }}
            // prefix={<ArrowDownOutlined />}
          />
        </Card>
      </Col>
    </Row>
  );
};
