import { Transaction } from "./transaction"

export type Category = {
    id: string
    title: string
    color: string
    icon: string
    transactions: {
        value: number
    }[]
    type: boolean
}

export type CategoryResponse = {
    id: string
    title: string
    color: string
    icon: string
    type: boolean
    totalValue: number
    percentage: string
}

export type CategoryRequestBody = {
    title: string
    color: string
    icon: string
    type: boolean
    user_id: string
}