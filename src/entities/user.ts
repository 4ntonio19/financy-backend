import { CategoryModel } from "./category"
import { Transaction } from "./transaction"

export interface UserModel {
    id: string
    name: string
    email: string
    created_at: Date
    updated_at: Date
    transactions: Transaction[]
    categories: CategoryModel[]
}

export type userCredentialsModel = {
    name: string
    email: string
}