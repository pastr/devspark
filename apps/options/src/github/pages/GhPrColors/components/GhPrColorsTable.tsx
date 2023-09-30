import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, FormInstance, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

import { useOptions } from "@devspark/context/options";
import { IGhColorPr } from "@devspark/types/interfaces/IGhColorPr";
import { TGhColorPrType } from "@devspark/types/interfaces/TGhColorPrType";

type GhPrColorsTableProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  form: FormInstance;
  setEditIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export function GhPrColorsTable({ form, setEditIndex, setIsModalOpen }: GhPrColorsTableProps) {
  const [options, setOptions] = useOptions();
  const [savedPrColors, setSavedPrColors] = useState<IGhColorPr[]>(options?.github?.prColors || []);

  useEffect(() => {
    setSavedPrColors([...options.github.prColors]);
  }, [options, options.github.prColors]);

  const prColors = options?.github?.prColors;
  if (!prColors?.length) return;


  const columns: ColumnsType<IGhColorPr> = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (prType) => getLabelFromType(prType),
      width: 250
    },
    {
      title: "Regex",
      dataIndex: "regexString",
      key: "regexString",
      render: (regexString) => <span className="font-bold">{regexString ? `/${regexString}/` : "-"}</span>
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      render: (prColor) => <span className="font-bold" style={{ color: prColor }}>{prColor}</span>,
      width: 120
    },
    {
      title: "action",
      dataIndex: "action",
      key: "action",
      align: "center",
      width: 80,
      render: (_, record, index) =>
        <div className="flex gap-2">
          <Button type="link" className="flex justify-center items-center mr-1" icon={<EditOutlined />} onClick={() => editPrColor(index)} />
          <Button type="link" danger className="flex justify-center items-center mr-1" icon={<DeleteOutlined />} onClick={() => removePrColor(index)} />
        </div>
    }
  ];

  function editPrColor(index: number) {
    setEditIndex(index);
    form.setFieldsValue({ ruleType: prColors![index].type, color: prColors![index].color, regexString: prColors![index].regexString });
    setIsModalOpen(true);
  }

  function removePrColor(index: number) {
    const newOptions = { ...options };
    newOptions.github!.prColors!.splice(index, 1);
    setSavedPrColors(newOptions.github!.prColors!);
    setOptions(newOptions);
  }

  function getLabelFromType(type: TGhColorPrType) {
    return {
      ownPr: "Your own PR",
      titlePr: "PR's title that match this regex",
      userPr: "GitHub's user who own the PR"
    }[type];
  }

  return (
    <Table key={savedPrColors.length}
           className="max-w-3xl"
           columns={columns}
           dataSource={savedPrColors}
           pagination={false} />
  );
}
