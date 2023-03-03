import React, {useState} from "react";
import {Col, Drawer, Row} from "antd";
import {withTranslation} from "react-i18next";
import Container from "../../common/Container";
import {CustomButton} from "@/common/Button";
import {useNavigate} from "react-router-dom";

import {
    Burger,
    CustomNavLinkSmall,
    HeaderSection,
    Label,
    LogoContainer,
    Menu,
    NotHidden,
    Outline,
    Span,
} from "./styles";
import {selectAccount} from "@/stores/auth/authSlice";
import {useDispatch, useSelector} from "react-redux";
import Profile from "../Profile";
import {ConnectModal} from "../Login/ConnectModal";

const Header = ({t}: any): JSX.Element => {
    const [visible, setVisibility] = useState(false);
    const navigate = useNavigate();

    const showDrawer = () => {
        setVisibility(!visible);
    };

    const onClose = () => {
        setVisibility(!visible);
    };

    const account = useSelector(selectAccount);
    const dispatch = useDispatch();

    const MenuItem = () => {
        const [isModalOpen, setIsModalOpen] = useState(false);
        const handleCancel = () => {
            setIsModalOpen(false);
        };
        const scrollTo = (id: string) => {
            const element = document.getElementById(id) as HTMLDivElement;
            element.scrollIntoView({
                behavior: "smooth",
            });
            setVisibility(false);
        };

        return (
            <>
                <ConnectModal isOpen={isModalOpen} onClose={handleCancel}/>
                {account === null ? (
                    <>
                        <CustomNavLinkSmall
                            style={{width: "180px"}}
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Span>
                                <CustomButton>{t("Connect")}</CustomButton>
                            </Span>
                        </CustomNavLinkSmall>
                    </>
                ) : (
                    <>
                        <CustomNavLinkSmall onClick={() => navigate("/management")}>
                            <Span>{t("Money management")}</Span>
                        </CustomNavLinkSmall>
                        <CustomNavLinkSmall onClick={() => navigate("/recovery")}>
                            <Span>{t("Recovery")}</Span>
                        </CustomNavLinkSmall>
                        <CustomNavLinkSmall onClick={() => navigate("/guardian")}>
                            <Span>{t("Guardians")}</Span>
                        </CustomNavLinkSmall>
                        <Profile/>
                    </>
                )}
            </>
        );
    };

    return (
        <HeaderSection>
            <Container>
                <Row justify="space-between">
                    <LogoContainer to="/" aria-label="homepage">
                        {/*<SvgIcon src="logo.svg" width="101px" height="64px" />*/}
                        Logo here
                    </LogoContainer>
                    <NotHidden>
                        <MenuItem/>
                    </NotHidden>
                    <Burger onClick={showDrawer}>
                        <Outline/>
                    </Burger>
                </Row>
                <Drawer closable={false} open={visible} onClose={onClose}>
                    <Col style={{marginBottom: "2.5rem"}}>
                        <Label onClick={onClose}>
                            <Col span={12}>
                                <Menu>Menu</Menu>
                            </Col>
                            <Col span={12}>
                                <Outline/>
                            </Col>
                        </Label>
                    </Col>
                    <MenuItem/>
                </Drawer>
            </Container>
        </HeaderSection>
    );
};

// @ts-ignore
export default withTranslation()(Header);