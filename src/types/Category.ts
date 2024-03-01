import ITransaction from "./Transaction";
import IUser from "./User";

export default interface ICategory {
  id?: number;
  name: string;
  color: string;
  transactions?: ITransaction[];
  user_id: IUser;
  createdAt: Date;
}
