import {Col, Row} from "antd";
import {withTranslation} from "react-i18next";
import {SvgIcon} from "@/common/SvgIcon";
import Container from "../../common/Container";

import i18n from "i18next";
import {Extra, FooterContainer, LogoContainer, NavLink,} from "./styles";

interface SocialLinkProps {
    href: string;
    src: string;
}

const Footer = ({t}: any): JSX.Element => {
    const handleChange = (language: string) => {
        i18n.changeLanguage(language);
    };

    const SocialLink = ({href, src}: SocialLinkProps) => {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                key={src}
                aria-label={src}
            >
                <SvgIcon src={src} width="25px" height="25px"/>
            </a>
        );
    };

    return (
        <>
            <Extra>
                <Container border={true}>
                    <Row
                        justify="space-between"
                        align="middle"
                        style={{paddingTop: "3rem"}}

                        
                    >
                        <Col lg={8} md={12} sm={12} xs={24}>
                        <NavLink to="#">
                            <LogoContainer>
                               ABOUT US
                            </LogoContainer>
                        </NavLink>
                        <NavLink to="#">
                            <LogoContainer>
                               Our Documentations
                            </LogoContainer>
                        </NavLink>
                    
                    
                        <NavLink to="#">
                            <LogoContainer>
                               Our pitch deck
                            </LogoContainer>
                        </NavLink>
                    
                        <FooterContainer>
                            <SocialLink
                                href="https://github.com/TCT-Hackathon-Team"
                                src="githubbb.svg"
                            />
                            <SocialLink
                                href="#"
                                src="bluefb.svg"
                            />
                            <SocialLink
                                href="#"
                                src="twitt.svg"
                            />
                            <SocialLink
                                href="#"
                                src="linkedin-2.svg"
                            />
                            {/* <a href="https://fantomq12023.devpost.com/">
                                <img
                                    src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=adrinlol&button_colour=FF5F5F&font_colour=ffffff&font_family=Lato&outline_colour=000000&coffee_colour=FFDD00"
                                    alt="Buy me a coffee"
                                />
                            </a> */}
                        </FooterContainer>
                        </Col>
                        <Col lg={8} md={12} sm={12} xs={24}>
                        <NavLink to="#">
                            <LogoContainer>
                               CONTACT US
                            </LogoContainer>
                        </NavLink>
                        <NavLink to="#">
                            <LogoContainer>
                                144 Xuan Thuy, Cau Giay, Ha Noi
                            </LogoContainer>
                        </NavLink>
                        <NavLink to="#">
                            <LogoContainer>
                                Hotline: 0962173195
                            </LogoContainer>
                        </NavLink>
                        <NavLink to="#">
                            <LogoContainer>
                                felicenguyen2001@gmail.com
                            </LogoContainer>
                        </NavLink>
                        </Col>
                        <Col lg={8} md={12} sm={12} xs={24}>
                        <NavLink to="#">
                            <LogoContainer>
                                ABOUT FANTOM
                            </LogoContainer>
                        </NavLink>
                        <NavLink to="https://docs.fantom.foundation/smart-contract/deploy-a-smart-contract">
                            <LogoContainer>
                                Fantom Documentations
                            </LogoContainer>
                        </NavLink>
                        <NavLink to="https://forum.fantom.network/">
                            <LogoContainer>
                               Fantom Forum Network
                            </LogoContainer>
                        </NavLink>
                        <NavLink to="https://discord.com/invite/zS4Ek4WByA/">
                            <LogoContainer>
                               Fantom Offical Discord
                            </LogoContainer>
                        </NavLink>
                        </Col>
                        
                    </Row>
                </Container>
            </Extra>
        </>
    );
};

export default withTranslation()(Footer);
