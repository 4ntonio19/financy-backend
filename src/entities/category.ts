import { Transaction } from "./transaction"

export interface CategoryModel {
    id: string
    title: string
    color: string
    icon: string
    percentage?: string
    type: boolean
}