import { FormInstance } from "antd";
import { useRef, useEffect } from "react";

export const useResetFormOnCloseModal = ({ form, open }: { form: FormInstance; open: boolean }) => {
  const prevOpenRef = useRef<boolean>();
  useEffect(() => {
    prevOpenRef.current = open;
  }, [open]);
  const prevOpen = prevOpenRef.current;

  useEffect(() => {
    if (!open && prevOpen) {
      console.log("HEHEE RESET", form.getFieldsValue());
      form.resetFields();
    }
  }, [form, prevOpen, open]);
};
