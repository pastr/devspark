import OptionView from "./OptionView";
import { useState } from "react";
import { useForm, SubmitHandler, SubmitErrorHandler, Controller } from "react-hook-form";
import { useOptions } from "../../common/context/options.context";
import set from "lodash.set";
import { IEnvrionmentNameState } from "../../common/types/IOptionsState";
import { Button, Col, Divider, Input, Modal, Popconfirm, Row, Select } from "antd";
import { ErrorMessage } from "@hookform/error-message";

export default function OptionCardEnvironmentName() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editEnvironmentIndex, setEditEnvironmentIndex] = useState<number | null>(null);
  const { handleSubmit, control, reset, formState: { errors, touchedFields } } = useForm<IEnvrionmentNameState>();
  const [options, setOptions] = useOptions();

  const onValid: SubmitHandler<IEnvrionmentNameState> = (data) => {
    const newOptions: typeof options = { ...options };

    if (newOptions.options?.environmentName) {
      if (editEnvironmentIndex !== null) {
        newOptions.options.environmentName[editEnvironmentIndex] = data;
      } else {
        newOptions.options.environmentName.push(data);
      }
    } else {
      set(newOptions, "options.environmentName", [data]);
    }

    setOptions(newOptions);
    setIsModalOpen(false);
  };

  const onError: SubmitErrorHandler<IEnvrionmentNameState> = (error) => {
    console.log("🚀 ~ file: OptionCardEnvironmentName.tsx:99 ~ EnvironmentNameModal ~ error", error);
    console.log("touchedFields ERrorr", touchedFields);
  };

  function addEnvironmentName() {
    reset();
    setEditEnvironmentIndex(null);
    setIsModalOpen(true);
  }

  function onOkModal() {
    handleSubmit(onValid, onError)();
  }

  function onCancelModal() {
    setIsModalOpen(false);
  }

  function deleteEnvironment(index: number) {
    const localOptions = { ...options };
    localOptions.options?.environmentName?.splice(index, 1);
    setOptions(localOptions);
  }

  function editEnvironment(index: number) {
    reset();
    setEditEnvironmentIndex(index);
    setIsModalOpen(true);
  }

  const defaultValues = editEnvironmentIndex !== null ? options?.options?.environmentName?.[editEnvironmentIndex] : undefined;
  console.log("🚀 ~ file: OptionViewEnvironment.tsx:65 ~ OptionCardEnvironmentName ~ defaultValues", defaultValues);

  return (
    <OptionView title="Environment Name">
      <>
        <Row gutter={[32, 16]}>
          <Col span={8}>
            <h1 className="text-lg font-semibold">
              {editEnvironmentIndex !== null ? "Edit" : "Add"} an environment name
            </h1>
            <p className="text-gray-600 text-md">
              Add a visual identifier to recognize website running in different environments.
            </p>
          </Col>
          <Col span={16} >
            <div className="mb-4">
              <Button className="flex items-center justify-center" type="primary" onClick={addEnvironmentName} >Add environment identifier</Button>
            </div>
            <div>
              <p className="text-base font-semibold mb-2 pb-2 border-b-[1px]">Existing Environments</p>
              {
                options?.options?.environmentName?.map((environment, index) => {
                  return (
                    <>
                      <EnvironmentLine key={`${environment.url}-${environment.text}`}
                                       environment={environment}
                                       index={index}
                                       onEdit={editEnvironment}
                                       onDelete={deleteEnvironment} />
                    </>
                  );
                })
              }
            </div>
          </Col>
        </Row>


        <Modal title={editEnvironmentIndex !== null ? "Edit Environment" : "Add Environment"}
               open={isModalOpen}
               onOk={onOkModal}
               onCancel={onCancelModal}
               destroyOnClose>
          <form>
            <div className="mb-3">
              <label htmlFor="text">Text:</label>

              <Controller control={control}
                          name="text"
                          defaultValue={defaultValues?.text}
                          rules={{ required: false, maxLength: { value: 10, message: "Maximum 10 characters" } }}
                          render={({ field: { onChange, onBlur, value, ref } }) =>
                            <Input onChange={onChange}
                                   onBlur={onBlur}
                                   value={value}
                                   status={errors.text ? "error" : undefined}
                                   defaultValue={defaultValues?.text}
                                   ref={ref}
                                   id="text"/>
                          }/>
              <ErrorMessage errors={errors} name="text" render={({ message }) => <p className="text-red-600">{message}</p>}/>
            </div>

            <div className="mb-3">
              <label htmlFor="url">URL:</label>
              <Controller control={control}
                          name="url"
                          rules={{ required: "This field is required" }}
                          defaultValue={defaultValues?.url}
                          render={({ field: { onChange, onBlur, value, ref } }) =>
                            <Input onChange={onChange}
                                   onBlur={onBlur}
                                   value={value}
                                   status={errors.url ? "error" : undefined}
                                   defaultValue={defaultValues?.url}
                                   ref={ref}
                                   id="url"/>
                          }/>
              <ErrorMessage errors={errors} name="url" render={({ message }) => <p className="text-red-600">{message}</p>}/>
            </div>

            <div className="mb-3">
              <label htmlFor="horizontalAlign">Right or left of the screen:</label>
              <div>
                <Controller control={control}
                            name="horizontalAlign"
                            defaultValue={defaultValues?.horizontalAlign ?? "right"}
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur, value, ref } }) =>
                              <Select options={[{ value: "right", label: "Top right" }, { value: "left", label: "Top left" }]}
                                      onChange={onChange}
                                      onBlur={onBlur}
                                      value={value}
                                      style={{ width: 100 }}
                                      ref={ref}
                                      defaultValue={defaultValues?.horizontalAlign ?? "right"}
                                      id="horizontalAlign"/>
                            }/>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="position">Position:</label>
              <div>
                <Controller control={control}
                            name="position"
                            defaultValue={defaultValues?.position ?? "absolute"}
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur, value, ref } }) =>
                              <Select options={[{ value: "absolute", label: "Absolute" }, { value: "fixed", label: "Fixed" }]}
                                      onChange={onChange}
                                      onBlur={onBlur}
                                      value={value}
                                      style={{ width: 100 }}
                                      ref={ref}
                                      defaultValue={defaultValues?.position ?? "absolute"}
                                      id="position"/>
                            }/>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="shape">Shape:</label>
              <div>
                <Controller control={control}
                            name="shape"
                            defaultValue={defaultValues?.shape ?? "triangle"}
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur, value, ref } }) =>
                              <Select onChange={onChange}
                                      onBlur={onBlur}
                                      value={value}
                                      style={{ width: 100 }}
                                      ref={ref}
                                      defaultValue={defaultValues?.shape ?? "triangle"}
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

            <div className="mb-3">
              <label htmlFor="textColor">Text Color:</label>
              <div>
                <Controller control={control}
                            name="textColor"
                            defaultValue={defaultValues?.textColor ?? "#000000"}
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur, value, ref } }) =>
                              <Input className="p-1 w-10"
                                     onChange={onChange}
                                     onBlur={onBlur}
                                     value={value}
                                     ref={ref}
                                     type="color"
                                     defaultValue={defaultValues?.textColor ?? "#000000"}
                                     id="textColor"/>
                            }/>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="backgroundColor">Background Color:</label>
              <div>
                <Controller control={control}
                            name="backgroundColor"
                            defaultValue={ defaultValues?.backgroundColor ?? "#878787"}
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur, value, ref } }) =>
                              <Input className="p-1 w-10"
                                     onChange={onChange}
                                     onBlur={onBlur}
                                     value={value}
                                     ref={ref}
                                     type="color"
                                     defaultValue={defaultValues?.backgroundColor ?? "#878787"}
                                     id="backgroundColor" />
                            }/>
              </div>
            </div>
          </form>
        </Modal>
      </>
    </OptionView>
  );
}

type EnvironmentLineProps = {
  environment: IEnvrionmentNameState;
  index: number;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

function EnvironmentLine({ environment, index, onEdit, onDelete }: EnvironmentLineProps) {
  return (
    <div className="flex justify-between items-center mb-4 hover:bg-blue-50">
      <div className="flex items-center gap-4">
        <div>
          {environment.url}
        </div>
        <div className="text-sm rounded-md py-1 px-2" style={{ backgroundColor: environment.backgroundColor, color: environment.textColor }}>
          {environment.text}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button type="primary" onClick={() => onEdit(index)} className="mr-2">Edit</Button>


        <Popconfirm title="Are you sure you want to delete this environment?"
                    onConfirm={() => onDelete(index)}
                    placement="topRight"
                    okText="Yes"
                    cancelText="No">
          <Button danger>Delete</Button>
        </Popconfirm>

      </div>
    </div>
  );
}