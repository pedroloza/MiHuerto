import React from "react";
import { Col, Container, Row } from "reactstrap";
import Link from "next/link";
import SvgIcon from "CommonElements/Icons/SvgIcon";

type varTypes = {
  title?: string;
  mainTitle: string;
  parent?: string;
  parentElement?: { title: string; url: string };
  subParent?: string;
};

const Breadcrumbs = ({ mainTitle, parentElement, subParent }: varTypes) => {
  return (
    <div>
      <Container fluid={true}>
        <div className="page-title">
          <Row>
            <Col xs={6} className="p-0">
              <h4>{mainTitle}</h4>
            </Col>
            <Col xs={6} className="p-0">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href={`/dashboard/home`}>
                    <SvgIcon iconId="stroke-home" />
                  </Link>
                </li>
                {parentElement && (
                  <Link href={parentElement?.url} className="breadcrumb-item">
                    {parentElement?.title}
                  </Link>
                )}
                {subParent ? (
                  <li className="breadcrumb-item">{subParent}</li>
                ) : (
                  ""
                )}
                {/*<li className="breadcrumb-item active">{title}</li>*/}
              </ol>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Breadcrumbs;
