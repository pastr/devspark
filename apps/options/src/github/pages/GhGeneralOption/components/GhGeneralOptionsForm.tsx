import { Form, Switch } from "antd";

import { useOptions } from "@devspark/context/options";

export default function GhGeneralOptionsForm() {
  const [options, setOptions] = useOptions();

  function toggleMdImage() {
    options.github.generalOptions.mdImage = !options.github.generalOptions.mdImage;
    setOptions({ ...options });
  }

  return (
    <div>
      <Form layout="vertical">
        <div className="text-bold text-lg mb-1">
          Replace Markdown image by <code>{"<img>"}</code> tag
        </div>
        <Form.Item label={<div className="max-w-lg">Enable replacement of Markdown image <code>![alt](url)</code> by an <code>{"<img>"}</code> tag with a <code>width</code> and <code>height</code> attributes to easily set the size of your image in comments</div>}>
          <Switch checked={options.github.generalOptions.mdImage} onChange={toggleMdImage}/>
        </Form.Item>
      </Form>
    </div>
  );
}
