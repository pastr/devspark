import OptionCard from "./OptionCard";
import { RibbonOptions } from "../../content-script/all-hosts/environment-title/ribbon-corner";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import Modal from "./Modal";

export default function OptionCardEnvironmentName() {
  const [showModal, setShowModal] = useState<boolean>(false);

  function onAddEnvironmentName() {
    setShowModal(true);
  }

  function onModalClose() {
    console.log("CLOSE modal");
    setShowModal(false);
  }


  return (
    <OptionCard title="Environment name">
      <>
        {createPortal(
          <Modal visible={showModal}
                 onCancel={onModalClose}
                 onOk={onModalClose}
                 okText="Add"
                 cancelText="Cancel"
                 renderChildren={
                   (registerCb, onOk) => {
                     return (
                       <EnvironmentNameForm registerCb={registerCb} onOk={onOk} />
                     );
                   }
                 } />,
          document.body
        ) }
        <div className="flex justify-between">
          <div className="text-lg font-semibold">Add an environment name</div>
          <div className="flex w-8">
            <button onClick={onAddEnvironmentName} className="btn-primary">+</button>
          </div>
        </div>
      </>
    </OptionCard>
  );
}


type EnvironmentNameFormProps = {
  registerCb: (cb: () => void) => void;
  onOk?: () => void;
}

const EnvironmentNameForm = ({ registerCb, onOk }: EnvironmentNameFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<RibbonOptions>();

  useEffect(() => {
    const onError: SubmitErrorHandler<RibbonOptions> = (errors) => {
      console.log("my error", errors);
    };
    const onSubmit: SubmitHandler<RibbonOptions> = (data) => {
      console.log("dataa", data);
      onOk?.();
    };
    registerCb(async () => {
      await handleSubmit(onSubmit, onError)();
    });
  }, [handleSubmit, onOk, registerCb]);


  return (
    <form >
      <div>
        <label htmlFor="text">Text:</label>
        {errors.text && <span>{errors.text.message}</span>}
        <input id="text" {...register("text", { required: "Text is required", maxLength: 10 })} />
      </div>

      <div>
        <label htmlFor="horizontalAlign">Position:</label>
        <select id="horizontalAlign" {...register("horizontalAlign", { required: true })}>
          <option value={"right"}>Top right</option>
          <option value={"left"}>Top left</option>
        </select>
      </div>

      <div>
        <label htmlFor="horizontalAlign">Position:</label>
        <select id="horizontalAlign" {...register("horizontalAlign", { required: true })}>
          <option value={"right"}></option>
          <option value={"left"}>Top left</option>
        </select>
      </div>

      <div>
        <label htmlFor="textColor">Text color</label>
        <input type="color" id="textColor" {...register("textColor", { required: true })} />
      </div>
      <div>
        <label htmlFor="backgroundColor">Background color</label>
        <input type="color" id="backgroundColor" {...register("backgroundColor", { required: true })} />
      </div>
    </form>
  );
};

