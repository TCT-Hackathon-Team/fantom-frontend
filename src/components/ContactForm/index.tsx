import {Col, Row, Select} from "antd";
import {withTranslation} from "react-i18next";
import {Slide, Zoom} from "react-awesome-reveal";
import {ContactProps, ValidationTypeProps} from "./types";
import {useForm} from "../../common/utils/useForm";
import validate from "../../common/utils/validationRules";
import {CustomButton} from "../../common/Button";
import CommonInput from "../../common/Input";
import TextArea from "../../common/TextArea";
import {ButtonContainer, ContactContainer, FormGroup, Span} from "./styles";
import {SvgIcon} from "@/common/SvgIcon";

const Contact = ({title, content, id, t}: ContactProps) => {
    const {values, errors, handleChange, handleSubmit} = useForm(
        validate
    ) as any;

    const ValidationType = ({type}: ValidationTypeProps) => {
        const ErrorMessage = errors[type];
        return (
            <Zoom direction="left">
                <Span erros={errors[type]}>{ErrorMessage}</Span>
            </Zoom>
        );
    };

    return (
        <ContactContainer id={id}>
            <Row justify="space-between" align="middle">

                <Col lg={12} md={12} sm={24} xs={24}>
                    <Slide direction="right">
                        <h3>Verify identity</h3>
                        <p>Fill your form to recover your keys</p>
                        <FormGroup autoComplete="off" onSubmit={handleSubmit}>
                            <Col span={24}>
                                <label>License type</label>
                                <br/>
                                <Select
                                    showSearch
                                    // style={{ width: 200 }}

                                    placeholder="Search to Select"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        (option?.label ?? "").includes(input)
                                    }
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? "")
                                            .toLowerCase()
                                            .localeCompare((optionB?.label ?? "").toLowerCase())
                                    }
                                    options={[
                                        {
                                            value: "1",
                                            label: "CCCD",
                                        },
                                        {
                                            value: "2",
                                            label: "Driver's License",
                                        },
                                        {
                                            value: "3",
                                            label: "Passport",
                                        },
                                        // {
                                        //   value: "4",
                                        //   label: "Identified",
                                        // },
                                        // {
                                        //   value: "5",
                                        //   label: "Resolved",
                                        // },
                                        // {
                                        //   value: "6",
                                        //   label: "Cancelled",
                                        // },
                                    ]}
                                />
                            </Col>
                            <Col span={24}>
                                <ValidationType type="number"/>
                            </Col>
                            <Col span={24}>
                                <CommonInput
                                    type="text"
                                    name="Citizen Identification"
                                    placeholder="Number"
                                    value={values.name || ""}
                                    onChange={handleChange}
                                />
                                <ValidationType type="number"/>
                            </Col>
                            <Col span={24}>
                                {/* <CommonInput
                  type="text"
                  name="Message for Guardians"
                  placeholder="Note"
                  value={values.email || ""}
                  onChange={handleChange}
                /> */}
                                {/* <ValidationType type="message" /> */}
                            </Col>
                            <Col span={24}>
                                <TextArea
                                    placeholder="Optional (You can patse link of your meeting) "
                                    value={values.message || ""}
                                    name="Message for Guardians"
                                    onChange={handleChange}
                                />
                                <ValidationType type="message"/>
                            </Col>
                            <Col span={24}>
                                <CommonInput
                                    type="number"
                                    name="Give a tips (optional)"
                                    placeholder="FTM"
                                    value={values.name || ""}
                                    onChange={handleChange}
                                />
                                <ValidationType type="number"/>
                            </Col>
                            <ButtonContainer>
                                <CustomButton name="submit">{t("Recovery")}</CustomButton>
                            </ButtonContainer>
                        </FormGroup>
                    </Slide>
                </Col>
                {/* TODO: object-fit: fill */}
                <Col lg={12} md={11} sm={24} xs={24}>
                    <SvgIcon
                        src={"verify-identity.svg"}
                        width="90%"
                        height="100%"
                        object-fit="fill"
                    />
                </Col>
            </Row>
        </ContactContainer>
    );
};

export default withTranslation()(Contact);
