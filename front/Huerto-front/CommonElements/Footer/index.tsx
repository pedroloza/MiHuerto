import React from "react";
import { Col, Container, Row } from "reactstrap";
import { Footertext } from "utils/Constant";

const Footer = () => {
  return (
    <footer className="footer">
      <Container fluid={true}>
        <Row>
          <Col md={12} className="footer-copyright text-center">
            <p className="mb-0">
              © Copyright 2024, Todos los derechos reservados - Mi Huerto{" "}
              <br />
              Manta - Manabí - Ecuador
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
