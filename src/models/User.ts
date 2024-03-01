import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Transaction from "./Transaction";
import Category from "./Category";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column("varchar", { length: 90, nullable: false })
  fullName!: string;

  @Column("varchar", { length: 90, nullable: false })
  email!: string;

  @Column("varchar", { length: 90, nullable: false })
  password!: string;

  @Column("varchar", { length: 45, nullable: false })
  birthDay!: string;

  @OneToMany(() => Transaction, (transaction) => transaction.user_id)
  transactions!: Transaction[];

  @OneToMany(() => Category, (category) => category.user_id)
  categories!: Category[];

  @Column("date", { nullable: false })
  createdAt!: Date;
}
