import OptionView from "./OptionView";
import { RibbonOptions } from "../../content-script/all-hosts/environment-name/ribbon-corner";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm, SubmitHandler, SubmitErrorHandler, Controller } from "react-hook-form";
import { useOptions } from "../../common/context/options.context";
import set from "lodash.set";
import { IEnvrionmentNameState } from "../../common/types/IOptionsState";
import { Button, Input, Modal, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function OptionCardEnvironmentName() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEnvironment, setSelectedEnvironment] = useState<IEnvrionmentNameState | null>(null);
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<IEnvrionmentNameState>();
  const [options, setOptions] = useOptions();

  const onValid: SubmitHandler<RibbonOptions> = (data) => {
    console.log("🚀 ~ file: OptionCardEnvironmentName.tsx:99 ~ EnvironmentNameModal ~ data", data);
  };

  const onError: SubmitErrorHandler<RibbonOptions> = (error) => {
    console.log("🚀 ~ file: OptionCardEnvironmentName.tsx:99 ~ EnvironmentNameModal ~ error", error);
  };

  useEffect(() => {
    console.log("options", options);
  }, [options]);

  function onAddEnvironmentName() {
    setIsModalOpen(true);
    // setSelectedEnvironment(null);
    // setShowModal(true);
  }

  function onOkModal() {
    // setIsModalOpen(false);
    handleSubmit(onValid, onError)();
  }

  function onCancelModal() {
    setIsModalOpen(false);
  }

  console.log("hi");
  function deleteEnvironment(index: number) {
    console.log("delete", index);
    const localOptions = { ...options };
    localOptions.options?.environmentName?.splice(index, 1);
    setOptions(localOptions);
  }

  function editEnvironment(environment: IEnvrionmentNameState) {
  //   setSelectedEnvironment(environment);
  //   setShowModal(true);
  }

  return (
    <OptionView title="Environment Name">
      <>
        {/* {createPortal(
          <EnvironmentNameModal visibleState={[showModal, setShowModal]} defaultState={selectedEnvironment} />,
          document.body
        ) } */}
        <div className="flex justify-between">
          <div className="text-lg font-semibold">Add an environment name</div>
          <div className="flex w-8">
            <Button className="flex items-center justify-center" type="primary" onClick={onAddEnvironmentName} icon={<PlusOutlined />} />
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
        <Modal title="Basic Modal" open={isModalOpen} onOk={onOkModal} onCancel={onCancelModal}>
          <form>
            <div>
              <label htmlFor="text">Text:</label>
              {errors.text && <span>{errors.text.message}</span>}

              <Controller control={control}
                          name="text"
                          rules={{ required: false, maxLength: 10 }}
                          render={({ field: { onChange, onBlur, value, ref } }) =>
                            <Input onChange={onChange}
                                   onBlur={onBlur}
                                   value={value}
                                   ref={ref}
                                   id="text"/>
                          }/>
            </div>

            <div>
              <label htmlFor="url">URL:</label>
              {errors.text && <span>{errors.text.message}</span>}
              {/* <Input id="text" {...register("url", { required: true })} /> */}
              <Controller control={control}
                          name="url"
                          rules={{ required: true }}
                          render={({ field: { onChange, onBlur, value, ref } }) =>
                            <Input onChange={onChange}
                                   onBlur={onBlur}
                                   value={value}
                                   ref={ref}
                                   id="url"/>
                          }/>
            </div>

            <div>
              <label htmlFor="horizontalAlign">Right or left of the screen:</label>
              <div>
                <Controller control={control}
                            name="horizontalAlign"
                            defaultValue="right"
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur, value, ref } }) =>
                              <Select options={[{ value: "right", label: "Top right" }, { value: "left", label: "Top left" }]}
                                      onChange={onChange}
                                      onBlur={onBlur}
                                      value={value}
                                      style={{ width: 100 }}
                                      ref={ref}
                                      defaultValue="right"
                                      id="horizontalAlign"/>
                            }/>
              </div>
            </div>

            <div>
              <label htmlFor="position">Position:</label>
              <div>
                <Controller control={control}
                            name="position"
                            defaultValue="absolute"
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur, value, ref } }) =>
                              <Select options={[{ value: "absolute", label: "Absolute" }, { value: "fixed", label: "Fixed" }]}
                                      onChange={onChange}
                                      onBlur={onBlur}
                                      value={value}
                                      style={{ width: 100 }}
                                      ref={ref}
                                      defaultValue="absolute"
                                      id="position"/>
                            }/>
              </div>
            </div>

            <div>
              <label htmlFor="shape">Shape:</label>
              <div>
                <Controller control={control}
                            name="shape"
                            defaultValue="triangle"
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur, value, ref } }) =>
                              <Select onChange={onChange}
                                      onBlur={onBlur}
                                      value={value}
                                      style={{ width: 100 }}
                                      ref={ref}
                                      defaultValue="triangle"
                                      id="shape"
                                      options={[
                                        { value: "ribbon", label: "Ribbon" },
                                        { value: "triangle", label: "Triangle" },
                                        { value: "square", label: "Square" },
                                        { value: "line", label: "Line" }
                                      ]}/>
                            }/>
              </div>
            </div>

            <div>
              <label htmlFor="textColor">Text Color:</label>
              <div>
                <Controller control={control}
                            name="textColor"
                            defaultValue="#000000"
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur, value, ref } }) =>
                              <Input onChange={onChange}
                                     onBlur={onBlur}
                                     value={value}
                                     ref={ref}
                                     style={{ width: 50 }}
                                     type="color"
                                     defaultValue={"#000000"}
                                     id="textColor"/>
                            }/>
              </div>
            </div>
            <div>
              <label htmlFor="backgroundColor">Background Color:</label>
              <div>
                <Controller control={control}
                            name="backgroundColor"
                            defaultValue="#878787"
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur, value, ref } }) =>
                              <Input onChange={onChange}
                                     onBlur={onBlur}
                                     value={value}
                                     ref={ref}
                                     style={{ width: 50 }}
                                     type="color"
                                     defaultValue={"#878787"}
                                     id="backgroundColor"/>
                            }/>
              </div>
            </div>
          </form>
        </Modal>

      </>
    </OptionView>
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

