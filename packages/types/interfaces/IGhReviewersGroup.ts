import { IGhUser } from "./IGhUser";

export interface IGhReviewersGroup {
  groupName: string;
  users: IGhUser[];
}
