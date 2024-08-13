export interface CategoryModel {
    id: string
    title: string
    color: string
    icon: string
    totalValue?: number
    percentage?: string
    type: boolean
}

export type CategoryPostModel = {
    title: string
    color: string
    icon: string
    type: boolean
    user_id: string
}