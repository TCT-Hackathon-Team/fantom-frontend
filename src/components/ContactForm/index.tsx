import {Col, Row} from "antd";
import {withTranslation} from "react-i18next";
import {Slide, Zoom} from "react-awesome-reveal";
import {ContactProps, ValidationTypeProps} from "./types";
import {useForm} from "../../common/utils/useForm";
import validate from "../../common/utils/validationRules";
import {CustomButton} from "../../common/Button";
import Block from "../Block";
import CommonInput from "../../common/Input";
import TextArea from "../../common/TextArea";
import {ButtonContainer, ContactContainer, FormGroup, Span} from "./styles";

const Contact = ({ title, content, id, image, t}: ContactProps) => {
  const { values, errors, handleChange, handleSubmit } = useForm(
    validate
  ) as any;

  const ValidationType = ({ type }: ValidationTypeProps) => {
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
        <Col lg={12} md={11} sm={24} xs={24}>
          <Slide direction="left">
            <Block title={title} content={content} image={image}/>
          </Slide>
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <Slide direction="right">
            <h3>Verify identity</h3>
            <p>Fill your form to recover your keys</p>
            <FormGroup autoComplete="off" onSubmit={handleSubmit}>
            <Col span={24}>
                <CommonInput             
                  type="select"
                  name="License type"
                  placeholder="Example: CCCD, Driver's License, Passport"
                  options={["CCCD", "Driver's License", "Passport"]}
                  value={values.licenseType || ""}  
                  onChange={handleChange}
            
                />
                <ValidationType type="number" />
              </Col>
              <Col span={24}>
                <ValidationType type="number" />
              </Col>
              <Col span={24}>
                <CommonInput
                  type="text"
                  name="Citizen Identification"
                  placeholder="Number"
                  value={values.name || ""}
                  onChange={handleChange}
                />
                <ValidationType type="number" />
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
                <ValidationType type="message" />
              </Col>
              <Col span={24}>
                <CommonInput
                  type="number"
                  name="Give a tips (optional)"
                  placeholder="FTM"
                  value={values.name || ""}
                  onChange={handleChange}
                />
                <ValidationType type="number" />
              </Col>
              <ButtonContainer>
                <CustomButton name="submit">{t("Recovery")}</CustomButton>
              </ButtonContainer>
            </FormGroup>
          </Slide>
        </Col>
      </Row>
    </ContactContainer>
  );
};

export default withTranslation()(Contact);

