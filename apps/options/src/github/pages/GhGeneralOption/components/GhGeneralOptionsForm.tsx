import { Form, Switch } from "antd";

export default function GhGeneralOptionsForm() {
  return (
    <div>
      <Form layout="vertical">
        <div className="text-bold text-lg mb-1">
          Replace Markdown image by <code>{"<img>"}</code> tag
        </div>
        <Form.Item label={<div className="max-w-lg">Enable replacement of Markdown image <code>![alt](url)</code> by an <code>{"<img>"}</code> tag with a <code>width</code> and <code>height</code> attributes to easily set the size of your image in comments</div>}>
          <Switch />
        </Form.Item>
      </Form>
    </div>
  );
}
