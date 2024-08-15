export interface TransactionModel {
    id: string
    title: string
    date: Date
    value: number
    category: {
        id: string
        color: string
    }
    type: boolean
    user_id?: string
    created_at?: Date
    updated_at?: Date
}

export interface PostTransactionModel {
    title: string
    date: Date
    value: number
    category_id: string
    user_id: string
    type: boolean
}