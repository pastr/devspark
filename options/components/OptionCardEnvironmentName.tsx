import OptionCard from "./OptionCard";
import { RibbonOptions } from "../../content-script/all-hosts/environment-name/ribbon-corner";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import Modal from "./Modal";
import { useOptions } from "../../common/context/options.context";
import set from "lodash.set";
import { IEnvrionmentNameState } from "../../common/types/IOptionsState";

export default function OptionCardEnvironmentName() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedEnvironment, setSelectedEnvironment] = useState<IEnvrionmentNameState | null>(null);
  const [options, setOptions] = useOptions();

  useEffect(() => {
    console.log("options", options);
  }, [options]);

  function onAddEnvironmentName() {
    setSelectedEnvironment(null);
    setShowModal(true);
  }
  console.log("hi");
  function deleteEnvironment(index: number) {
    console.log("delete", index);
    const localOptions = { ...options };
    localOptions.options?.environmentName?.splice(index, 1);
    setOptions(localOptions);
  }

  function editEnvironment(environment: IEnvrionmentNameState) {
    setSelectedEnvironment(environment);
    setShowModal(true);
  }

  return (
    <OptionCard title="Environment name">
      <>
        {createPortal(
          <EnvironmentNameModal visibleState={[showModal, setShowModal]} defaultState={selectedEnvironment} />,
          document.body
        ) }
        <div className="flex justify-between">
          <div className="text-lg font-semibold">Add an environment name</div>
          <div className="flex w-8">
            <button onClick={onAddEnvironmentName} className="btn-primary">+</button>
          </div>
        </div>
        <div>
          {
            options?.options?.environmentName?.map((environment, index) => {
              return (
                <div key={`${environment.url}-${environment.text}`} className="flex gap-2">
                  <button onClick={() => deleteEnvironment(index)}>X</button>
                  <div>
                    {environment.text}
                  </div>
                  <button onClick={() => editEnvironment(environment)}>Edit</button>
                </div>
              );
            })
          }
        </div>
      </>
    </OptionCard>
  );
}

type EnvironmentNameModalProps = {
  visibleState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  defaultState?: IEnvrionmentNameState;
  // onCancel?: () => void;
  // onOk?: () => void;
}

const EnvironmentNameModal = ({ visibleState, defaultState }: EnvironmentNameModalProps) => {
  const [options, setOptions] = useOptions();
  const [visible, setVisible] = visibleState;
  const { register, handleSubmit, reset, formState: { errors } } = useForm<IEnvrionmentNameState>();

  const onValid: SubmitHandler<IEnvrionmentNameState> = (data) => {
    const newOptions: typeof options = { ...options };

    if (newOptions.options?.environmentName) {
      newOptions.options?.environmentName?.push(data);
    } else {
      set(newOptions, "options.environmentName", [data]);
    }

    setOptions(newOptions);
    setVisible(false);
  };

  const onError: SubmitErrorHandler<RibbonOptions> = (error) => {
    console.log("🚀 ~ file: OptionCardEnvironmentName.tsx:99 ~ EnvironmentNameModal ~ error", error);
  };

  useEffect(() => {
    if (defaultState) {
      reset(defaultState);
    }
  }, [defaultState, reset]);

  useEffect(() => {
    if (!visible) {
      reset();
    }
  }, [reset, visible]);

  return (
    <Modal visible={visible}
           onCancel={() => setVisible(false)}
           onOk={() => handleSubmit(onValid, onError)()}
           okText="Add"
           cancelText="Cancel">
      <form>
        <div>
          <label htmlFor="text">Text:</label>
          {errors.text && <span>{errors.text.message}</span>}
          <input id="text" {...register("text", { required: true, maxLength: 10 })} />
        </div>

        <div>
          <label htmlFor="text">URL:</label>
          {errors.text && <span>{errors.text.message}</span>}
          <input id="text" {...register("url", { required: true })} />
        </div>

        <div>
          <label htmlFor="horizontalAlign">Right or left of the screen:</label>
          <select id="horizontalAlign" {...register("horizontalAlign", { required: true })}>
            <option value={"right"}>Top right</option>
            <option value={"left"}>Top left</option>
          </select>
        </div>

        <div>
          <label htmlFor="position">Position:</label>
          <select id="position" {...register("position", { required: true })}>
            <option value={"absolute"}>Absolute</option>
            <option value={"fixed"}>Fixed</option>
          </select>
        </div>

        <div>
          <label htmlFor="shape">Shape:</label>
          <select id="shape" defaultValue={"triangle"} {...register("shape", { required: true })}>
            <option value={"ribbon"}>Ribbon</option>
            <option value={"triangle"}>Triangle</option>
            <option value={"square"}>Square</option>
            <option value={"line"}>Line</option>
          </select>
        </div>

        <div>
          <label htmlFor="textColor">Text Color:</label>
          <input type="color" id="textColor" {...register("textColor", { required: true })} />
        </div>
        <div>
          <label htmlFor="backgroundColor">Background Color:</label>
          <input type="color" id="backgroundColor" {...register("backgroundColor", { required: true })} />
        </div>
      </form>
    </Modal>

  );
};

