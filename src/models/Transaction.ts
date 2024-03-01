import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";
import Category from "./Category";

@Entity("transactions")
export default class Transaction {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column("varchar", { length: 90, nullable: false })
  description!: string;

  @Column("decimal", { nullable: false })
  cost!: number;

  @Column("tinyint", { nullable: false })
  status!: boolean;

  @ManyToOne(() => User, (user) => user.id)
  user_id!: User;

  @ManyToOne(() => Category, (category) => category.id)
  categories_id!: Category;

  @Column("date", { nullable: false })
  createdAt!: Date;
}
