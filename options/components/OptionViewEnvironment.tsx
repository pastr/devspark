import OptionView from "./OptionView";
import { useState } from "react";
import { useForm, SubmitHandler, SubmitErrorHandler, Controller } from "react-hook-form";
import { useOptions } from "../../common/context/options.context";
import set from "lodash.set";
import { IEnvrionmentNameState } from "../../common/types/IOptionsState";
import { Button, Input, Modal, Popconfirm, Select } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

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
        <div className="flex justify-between">
          <div className="text-lg font-semibold">
            {editEnvironmentIndex !== null ? "Edit" : "Add"} an environment name
          </div>
          <div className="flex w-8">
            <Button className="flex items-center justify-center" type="primary" onClick={addEnvironmentName} icon={<PlusOutlined />} />
          </div>
        </div>
        <div>
          {
            options?.options?.environmentName?.map((environment, index) => {
              return (
                <div key={`${environment.url}-${environment.text}`} className="flex items-center gap-3">
                  <div className="">
                    {environment.text}
                  </div>
                  <Button type="link" className="" icon={<EditOutlined />} onClick={() => editEnvironment(index)} />
                  <Popconfirm title="Are you sure you want to delete this environment?"
                              onConfirm={() => deleteEnvironment(index)}
                              okText="Yes"
                              cancelText="No">
                    <Button type="link" danger className="" icon={<DeleteOutlined />} />
                  </Popconfirm>

                </div>
              );
            })
          }
        </div>


        <Modal title={editEnvironmentIndex !== null ? "Edit Environment" : "Add Environment"}
               open={isModalOpen}
               onOk={onOkModal}
               onCancel={onCancelModal}
               destroyOnClose>
          <form>
            <div>
              <label htmlFor="text">Text:</label>
              {errors.text && <span>{errors.text.message}</span>}

              <Controller control={control}
                          name="text"
                          defaultValue={defaultValues?.text}
                          rules={{ required: false, maxLength: { value: 10, message: "Maximum 10 characters" } }}
                          render={({ field: { onChange, onBlur, value, ref } }) =>
                            <Input onChange={onChange}
                                   onBlur={onBlur}
                                   value={value}
                                   defaultValue={defaultValues?.text}
                                   ref={ref}
                                   id="text"/>
                          }/>
            </div>

            <div>
              <label htmlFor="url">URL:</label>
              {errors.url && <span>{errors.url?.message}</span>}
              <Controller control={control}
                          name="url"
                          rules={{ required: "This field is required" }}
                          defaultValue={defaultValues?.url}
                          render={({ field: { onChange, onBlur, value, ref } }) =>
                            <Input onChange={onChange}
                                   onBlur={onBlur}
                                   value={value}
                                   defaultValue={defaultValues?.url}
                                   ref={ref}
                                   id="url"/>
                          }/>
            </div>

            <div>
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

            <div>
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

            <div>
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

            <div>
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
            <div>
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