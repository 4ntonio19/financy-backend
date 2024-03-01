import ICategory from "./Category";
import ITransaction from "./Transaction";

export default interface IUser {
  id?: number;
  fullName: string;
  email: string;
  password: string;
  birthDay: string;
  categories?: ICategory[];
  transactions?: ITransaction[];
  createdAt: Date;
}
