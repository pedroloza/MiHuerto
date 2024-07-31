import React, { ReactElement } from "react";
import { Card, CardBody } from "reactstrap";
import SvgIcon from "./Icons/SvgIcon";

type propstype = {
  data: {
    title: string;
    total: number | string;
    color: string;
    icon: ReactElement;
  };
};

const WidgetsStatistic = ({ data }: propstype) => {
  return (
    <Card className="widget-1">
      <CardBody>
        <div className="widget-content">
          <div className={`widget-round ${data.color}`}>
            <div className="bg-round">
              {data.icon}
              <SvgIcon className="half-circle svg-fill" iconId="halfcircle" />
            </div>
          </div>
          <div>
            <h4>{data.total}</h4>
            <span className="f-light">{data.title}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default WidgetsStatistic;
