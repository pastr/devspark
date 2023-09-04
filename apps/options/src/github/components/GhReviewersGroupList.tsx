import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, FormInstance } from "antd";

import { useOptions } from "@devspark/context/options";
import { IGhReviewersGroup } from "@devspark/types/interfaces/IGhReviewersGroup";

import { GhUserTag } from "./GhUserTag";

type GhReviewersGroupListProps = {
  setIsModalOpen: (isModalOpen: boolean) => void;
  form: FormInstance;
  setEditIndex: (index: number) => void;
}

export function GhReviewersGroupList({ setIsModalOpen, form, setEditIndex }: GhReviewersGroupListProps) {
  const [options, setOptions] = useOptions();

  const reviewersGroup = options?.github?.reviewersGroup;
  if (!reviewersGroup?.length) return;

  function editReviewersGroup(index: number, reviewersGroup: IGhReviewersGroup) {
    setEditIndex(index);
    form.setFieldsValue({ groupName: reviewersGroup.groupName, users: reviewersGroup.users.map((user) => user.login) });
    setIsModalOpen(true);
  }

  function deleteReviewersGroup(index: number) {
    const copyOptions = { ...options };
    copyOptions.github?.reviewersGroup.splice(index, 1);
    setOptions(copyOptions);
  }


  return (
    <div className="flex flex-wrap gap-3">
      {
        reviewersGroup.map((reviewersGroup, index) =>
          <GhReviewersGroupCard key={index}
                                index={index}
                                reviewersGroup={reviewersGroup}
                                deleteReviewersGroup={deleteReviewersGroup}
                                editReviewersGroup={editReviewersGroup}/>
        )
      }
    </div>
  );
}


type GhReviewersGroupCardProps = {
  index: number,
  reviewersGroup: IGhReviewersGroup;
  editReviewersGroup: (index:number, reviewersGroup: IGhReviewersGroup) => void;
  deleteReviewersGroup: (index:number) => void;
}

function GhReviewersGroupCard({ index, reviewersGroup, deleteReviewersGroup, editReviewersGroup }: GhReviewersGroupCardProps) {
  return (
    <article className="border border-gray-300 rounded-lg pb-3 shadow w-[200px] bg-slate-50">
      <div className="m-2 flex justify-between mb-1 ">
        <h1 className="font-bold text-xl">{reviewersGroup.groupName}</h1>
        <div>
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => editReviewersGroup(index, reviewersGroup)} />
          <Button type="link" size="small" danger icon={<DeleteOutlined />} onClick={() => deleteReviewersGroup(index)} />
        </div>
      </div>

      <div className="border-b border-gray-300 shadow mb-5"></div>

      <div className="flex m-2 gap-2 flex-wrap">
        {reviewersGroup.users.map((ghUser, index) =>
          <GhUserTag key={index} ghUser={ghUser} />
        )}
      </div>
    </article>
  );
}
