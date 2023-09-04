import { Row, Col } from "antd";
import { Outlet } from "react-router-dom";

import { GhColoredPrForm } from "../components/GhColoredPrForm";
import { GhColoredPrTable } from "../components/GhColoredPrTable";

export default function GhPrColors() {
  return (
    <div>
      <Row gutter={[48, 16]}>
        <Col span={8}>
          <h1 className="text-lg font-semibold">Customize PR Color</h1>
          <p className="text-gray-600 text-md">Change the colors of the pull requests in the pull request list page.</p>
          <p className="text-gray-600 text-md">The order matter, if a PR match two rules then only the latest one will be applied</p>
        </Col>

        <Col span={16}>
          <GhColoredPrForm />
        </Col>
      </Row>
      <Row className="mt-6">
        <Col span={24}>
          <GhColoredPrTable />
          <Outlet />
        </Col>
      </Row>
    </div>
  );
}
