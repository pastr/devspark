import { IGhUser } from "@devspark/types/interfaces/IGhUser";

type GhUserTagProps = {
  ghUser: IGhUser;
}

export function GhUserTag({ ghUser }: GhUserTagProps) {
  return (
    <div className="flex border border-blue-200 bg-blue-100 text-blue-700 rounded-full text-sm h-4 pr-2">
      <a href={`https://github.com/${ghUser.login}`} className="flex items-center gap-1 ">
        <img src={ghUser.avatarUrl} alt="" className="h-[14px] rounded-r-none rounded-l-full"/>
        <span className="text-xs">{ghUser.login}</span>
      </a>
    </div>
  );
}
