import { Row, Col } from "antd";

import GhGeneralOptionsForm from "./components/GhGeneralOptionsForm";

export default function GhGeneralOptions() {
  return (
    <div>
      <Row gutter={[48, 16]}>
        <Col span={8}>
          {/* TODO: Create a component or change the structure to have a style consistent subtitle between all pages */}
          <h1 className="text-xl font-semibold">General Options</h1>
        </Col>

        <Col span={16} />
      </Row>
      <Row className="mt-6">
        <Col span={24}>
          <GhGeneralOptionsForm />
        </Col>
      </Row>
    </div>
  );
}
