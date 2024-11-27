import styled from "styled-components";

const Footer = () => {
    return (
        <StyledFooter>
            <div>
                <h3>HEE</h3>
            </div>
        </StyledFooter>
    );
};

export default Footer;

const StyledFooter = styled.footer`
  background: #333;
  color: white;
  text-align: center;
  padding: 10px 0;
  h3 {
    margin: 0;
    font-size: 1rem;
  }
`;

