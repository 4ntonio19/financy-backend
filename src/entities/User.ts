import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Column("date", { nullable: false })
  createdAt!: Date;
}
