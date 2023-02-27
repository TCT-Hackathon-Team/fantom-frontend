import {Row} from "antd";
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
                        <NavLink to="/">
                            <LogoContainer>
                                Social Recovery
                            </LogoContainer>
                        </NavLink>
                        <FooterContainer>
                            <SocialLink
                                href="https://github.com/Adrinlol/create-react-app-adrinlol"
                                src="github.svg"
                            />
                            <SocialLink
                                href="https://twitter.com/Adrinlolx"
                                src="twitter.svg"
                            />
                            <SocialLink
                                href="https://www.linkedin.com/in/lasha-kakabadze/"
                                src="linkedin.svg"
                            />
                            <a href="https://fantomq12023.devpost.com/">
                                <img
                                    src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=adrinlol&button_colour=FF5F5F&font_colour=ffffff&font_family=Lato&outline_colour=000000&coffee_colour=FFDD00"
                                    alt="Buy me a coffee"
                                />
                            </a>
                        </FooterContainer>
                    </Row>
                </Container>
            </Extra>
        </>
    );
};

export default withTranslation()(Footer);
