import React, { useContext } from "react";
import { Row } from "reactstrap";
import Rightbar from "./Rightbar.tsx";
import layoutContext from "helper/Layout";
import Leftbar from "./Leftbar";

const Header = () => {
    const { sideBarToggle } = useContext(layoutContext);

    return (
        <div className={`page-header ${sideBarToggle ? "close_icon" : ""}`}>
            <Row className="header-wrapper m-0">
                <Leftbar />
                <Rightbar />
            </Row>
        </div>
    );
};

export default Header;
