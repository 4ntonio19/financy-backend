import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./User";
import Transaction from "./Transaction";

@Entity("categories")
export default class Category {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column("varchar", { length: 45, nullable: false })
  name!: string;

  @Column("varchar", { length: 45, nullable: false })
  color!: string;

  @ManyToOne(() => User, (user) => user.id)
  user_id!: User;

  @OneToMany(() => Transaction, (transaction) => transaction.categories_id)
  transactions!: Transaction[];

  @Column("date", { nullable: false })
  createdAt!: Date;
}
