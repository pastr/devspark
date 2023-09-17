import { Row, Col } from "antd";

import GhOptionPageTitle from "../../components/GhOptionPageTitle";

import GhGeneralOptionsForm from "./components/GhGeneralOptionsForm";

export default function GhGeneralOptions() {
  return (
    <div>
      <GhOptionPageTitle title="General Options" />

      <Row>
        <Col span={24}>
          <GhGeneralOptionsForm />
        </Col>
      </Row>
    </div>
  );
}
