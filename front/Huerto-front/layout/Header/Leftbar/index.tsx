import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useContext } from "react";
import { Col } from "reactstrap";
import { AlignCenter } from "react-feather";
import { ImgPath } from "utils/Constant";
import layoutContext from "helper/Layout";

const Leftbar = () => {
    const { sideBarToggle, setSideBarToggle } = useContext(layoutContext);
    return (
        <Fragment>
            <Col className="header-logo-wrapper col-auto p-0">
                <div className="logo-wrapper">
                    <Link href={"/dashboard/default"}>
                        <Image
                            className="img-fluid for-light"
                            src={`${ImgPath}/logo/logo.png`}
                            alt="logo"
                            width={100}
                            height={100}
                        />
                        <Image
                            className="img-fluid for-dark"
                            src={`${ImgPath}/logo/logo_dark.png`}
                            alt="logo"
                            width={100}
                            height={100}
                        />
                    </Link>
                </div>
                <div
                    className="toggle-sidebar"
                    onClick={() => setSideBarToggle(!sideBarToggle)}
                >
                    <AlignCenter
                        className="status_toggle middle sidebar-toggle"
                        id="sidebar-toggle"
                    />
                </div>
            </Col>
        </Fragment>
    );
};

export default Leftbar;
