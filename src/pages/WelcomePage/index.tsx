import React, {lazy, useState} from "react";
import {Content, ContentWrapper} from "../../components/MiddleBlock/styles";
import {Col, Modal, Row} from "antd";
import {CustomButton} from "../../common/Button";
import {RightBlockContainer} from "../../components/ContentBlock/RightContentBlock/styles";
import {Fade} from "react-awesome-reveal";
import {SvgIcon} from "../../common/SvgIcon";
import {ConnectModal} from "../../components/Login/ConnectModal";

const Contact = lazy(() => import("../../components/ContactForm"));
const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));

// @ts-ignore
const ThisModal = ({isModalOpen, handleCancel, onButton}): JSX.Element => {
    return (
        <Modal style={{textAlign: "center"}} footer={null} open={isModalOpen} onCancel={handleCancel}>
            <h5>Connect your wallet</h5>
            <p>You need to connect your wallet first</p>
            <CustomButton onClick={onButton}>Connect</CustomButton>
        </Modal>
    )
}

const WelcomePage = (): JSX.Element => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenConnect, setIsModalOpenConnect] = useState(false);
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancelConnect = () => {
        setIsModalOpenConnect(false);
    };

    const showModalConnect = () => {
        handleCancel()
        setIsModalOpenConnect(true);
    };

    return (
        <Container>
            <ConnectModal isOpen={isModalOpenConnect} onClose={handleCancelConnect}/>
            <ThisModal onButton={showModalConnect} isModalOpen={isModalOpen} handleCancel={handleCancel}/>
            <RightBlockContainer>
                <Fade direction="right">
                    <Row align="middle" id="1">
                        <Col lg={11} md={11} sm={11} xs={24}>
                            <ContentWrapper style={{textAlign: "center",}}>
                                <p style={{fontWeight: "bold"}}>Secure Private Key Management with
                                    <p>Owner Recovery</p>
                                </p>
                                <Content>Never lose access to your wallet again. Social recovery for any EVM compatible
                                    chain. Implemented using a trustless infrastructure leveraging smart contracts,
                                    decentralized storage, and threshold cryptography.</Content>
                                <CustomButton
                                    fixedWidth={true}
                                    onClick={showModal}
                                >
                                    Recovery
                                </CustomButton>
                            </ContentWrapper>
                        </Col>
                        <Col lg={13} md={13} sm={13} xs={24}>
                            <SvgIcon src={"BG.svg"} width="100%" height="100%"/>
                        </Col>
                    </Row>
                </Fade>
            </RightBlockContainer>
        </Container>
    )
        ;
};

export default WelcomePage;