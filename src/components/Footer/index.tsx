import React from "react";
// import one from "./1-modified.png";
// import two from "./2-modified.png";
import { Img } from '@chakra-ui/react';
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
  Name
} from "./FooterStyles";
import styles from './Footer.module.scss';
import {
  // BsEnvelopeOpenFill,
  // BsFillHouseDoorFill,
  // BsFillTelephoneInboundFill,
  BsFacebook,
  BsYoutube,
  BsInstagram,
  BsTwitter
} from 'react-icons/bs';


  
const Footer = () => {
  return (
  <div>
    <Box>
  
      <Container>
        <Row>
          <Column>
            <Name>👻Fantom</Name>
  
            <div className={styles.socialicons}>
            <a href="#"><BsFacebook/></a>
            <a href="#"><BsTwitter/></a>
            <a href="#"><BsYoutube/></a>
            <a href="#"><BsInstagram/></a>
           
          </div>
        
          </Column>
          <Column>
            <Heading>About us</Heading>
            <FooterLink href="#">Safe, fast recovery service</FooterLink>
            <FooterLink href="#">Ultimate & Truthless solution</FooterLink>
            <FooterLink href="#">Terms of use</FooterLink>
            <FooterLink href="#">Privacy Policy</FooterLink>
          </Column>
          <Column>
            <Heading>Contact</Heading>
          
            <FooterLink href="#">144 Xuan Thuy, Dich Vong Hau, Cau Giay, Ha Noi</FooterLink>
            <FooterLink href="#">uetvnu@gmail.com</FooterLink>
            <FooterLink href="#">024354461</FooterLink>
            

  
            {/* <FooterLink href="#">Mumbai</FooterLink> */}
          </Column>
          <Column>
            <Heading>Download</Heading>
         
            {/* <FooterLink href="#"><Img src="https://www.linkpicture.com/q/1-modified.png" /> </FooterLink>
           
            <FooterLink href="#"><Img src="https://www.linkpicture.com/q/2-modified.png"/> </FooterLink> */}
         
            {/* <FooterLink href="#">
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>
                  Facebook
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>
                  Instagram
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>
                  Twitter
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-youtube">
                <span style={{ marginLeft: "10px" }}>
                  Youtube
                </span>
              </i>
            </FooterLink> */}
          </Column>
        </Row>
      </Container>
    </Box>
    </div>
  );
};
export default Footer;