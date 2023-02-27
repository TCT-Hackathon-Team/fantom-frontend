import React from "react";
import {Button, Form, Input} from "antd";

// @ts-ignore
export const ThresholdForm = ({threshold}) => {
    return (
        <Form
            name="customized_form_controls"
            layout="inline"
        >
            <Form.Item label={"Threshold"}>
                <Input value={threshold}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Change
                </Button>
            </Form.Item>
        </Form>
    )
}