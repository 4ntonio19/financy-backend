import ICategory from "./Category";
import IUser from "./User";

export default interface ITransaction {
  id?: number;
  description: string;
  cost: number;
  status: boolean;
  user_id: IUser;
  categories_id: ICategory;
  createdAt: Date;
}
