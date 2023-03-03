import React, {lazy, useState} from "react";
import {Content, ContentWrapper} from "@/components/MiddleBlock/styles";
import {Col, Modal, Row} from "antd";
import {CustomButton} from "@/common/Button";
import {RightBlockContainer} from "@/components/ContentBlock/RightContentBlock/styles";
import {Fade} from "react-awesome-reveal";
import {SvgIcon} from "@/common/SvgIcon";
import {ConnectModal} from "@/components/Login/ConnectModal";

const Container = lazy(() => import("../../common/Container"));

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
                                <div style={{fontWeight: "bold", fontSize: 30}}>Everyone find name for the app
                                    <p>slogan here</p>
                                </div>
                                <Content>A "trustless" key recovery solution, using Fantom blockchain 
                                    to link the ID info (indentity card, driver's license,...) 
                                    with user account and using assistance of social recovery partner (guardians, …) to validate identity</Content>
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
};

export default WelcomePage;