export interface TransactionModel {
    id: string
    title: string
    date: Date
    value: number
    category_id: string
    user_id?: string
    created_at?: Date
    updated_at?: Date
}