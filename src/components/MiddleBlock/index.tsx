import {Col, Row} from "antd";
import {Slide} from "react-awesome-reveal";
import {CustomButton} from "../../common/Button";
import {Content, ContentWrapper, MiddleBlockSection} from "./styles";

interface MiddleBlockProps {
    title: string;
    content: string;
    button: string;
    t: any;
}

const MiddleBlock = ({title, content, button, t}: MiddleBlockProps) => {
    const scrollTo = (id: string) => {
        const element = document.getElementById(id) as HTMLDivElement;
        element.scrollIntoView({
            behavior: "smooth",
        });
    };
    return (
        <MiddleBlockSection>
            <Slide direction="up">
                <Row justify="center" align="middle">
                    <ContentWrapper>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <h6>{t(title)}</h6>
                            <Content>{t(content)}</Content>
                            {button && (
                                <CustomButton name="submit" onClick={() => scrollTo("mission")}>
                                    {t(button)}
                                </CustomButton>
                            )}
                        </Col>
                    </ContentWrapper>
                </Row>
            </Slide>
        </MiddleBlockSection>
    );
};

export default (MiddleBlock);
