import { FaGithub, FaLinkedin, FaReact } from "react-icons/fa";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterWrap>
        <SocialLogo to="/">Happy To Help!</SocialLogo>
        <WebsiteRights>
          Releaf © {new Date().getFullYear()} All rights reserved.{" "}
        </WebsiteRights>
        <SocialIcons>
          {/* <SocialIconLink
            href="https://github.com/jaydjhangiani"
            target="_blank"
            aria-label="Github"
          >
            <FaGithub />
          </SocialIconLink> */}
          <SocialIconLink aria-label="MADE WITH REACT">
            <FaReact />
          </SocialIconLink>
          {/* <SocialIconLink
            href="https://linkedin.com/in/jayjhangiani"
            target="_blank"
            aria-label="Linkedin"
          >
            <FaLinkedin />
          </SocialIconLink> */}
        </SocialIcons>
      </FooterWrap>
    </FooterContainer>
  );
};

export default Footer;

export const FooterContainer = styled.footer`
  background-color: #101522;
`;

export const FooterWrap = styled.div`
  padding: 30px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
`;

// export const FooterLinksContainer = styled.div`
//   display: flex;
//   justify-content: center;

//   @media screen and (max-width: 760px) {
//     padding-top: 32px;
//   }
// `;

// export const FooterLinkWrapper = styled.div`
//   display: flex;

//   @media screen and (max-width: 760px) {
//     flex-direction: column;
//   }
// `;

// export const FooterLinkItems = styled.div`
//   display: flex;
//   flex-direction: column;
//   /* align-items: flex-start; */
//   margin: 16px;
//   text-align: left;
//   width: 150px;
//   box-sizing: border-box;
//   color: white;

//   @media screen and (max-width: 760px) {
//     margin: 0;
//     padding: 10px 60px;
//     width: 100%;
//   }
// `;

// export const FooterLinkTitle = styled.h1`
//   font-size: 14px;
//   margin-bottom: 16px;
// `;

// export const FooterLink = styled.a`
//   color: #fff;
//   text-decoration: none;
//   font-size: 14px;
//   margin-bottom: 0.5rem;

//   &:hover {
//     color: #01bf71;
//     transition: 0.3s ease-out;
//   }
// `;

const SocialLogo = styled(Link)`
  color: #fff;
  justify-self: start;
  cursor: pointer;
  text-decoration: none;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-weight: bold;
`;

const WebsiteRights = styled.small`
  color: #fff;
  margin-bottom: 16px;
`;

const SocialIcons = styled.div`
  display: flex;
  /* justify-content: space-between; */
  justify-content: center;
  align-items: center;
  width: 240px;
`;

const SocialIconLink = styled.a`
  color: #fff;
  font-size: 24px;
  text-align: center;
`;
