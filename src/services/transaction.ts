import { PrismaClient } from "@prisma/client";
import { PostTransactionModel, TransactionModel } from "../entities/transaction";
import { HandleError } from "../utils/handleError";
const repository = new PrismaClient()
export class TransactionService {
    async getAll(user_id: string, startDate: Date, endDate: Date ): Promise<TransactionModel[]> {
        // const newStart = new Date( Date.now())
        
        // const newEnd = new Date( Date.now())
        // newEnd.setMonth(newStart.getMonth() - 7)
        // console.log(newStart, newEnd);
            console.log(startDate,endDate);
            
        const transactions = await repository.transaction.findMany({
            where: {
            user_id,
            date: {
                gte: startDate,
                lte: endDate,
            },
            },
            select: {
                id: true,
                title: true,
                date: true,
                value: true,
                type: true,
                category: { select: {
                    color: true,
                    id: true,

                }}
            }
        });

        return transactions
    }

    async getOneById(id: string, user_id: string): Promise<TransactionModel> {
        const transaction = await repository.transaction.findUnique({
            where: {
                id,
                user_id
            },
            select: {
                id: true,
                title: true,
                date: true,
                type: true,
                value: true,
                category: {
                    select: {
                        id: true,
                        color: true
                    }
                }
            }
        })

        if(!transaction) throw new HandleError(404, "Essa transação não existe.")

        return transaction
    }

    async postOne(dto: PostTransactionModel): Promise<string>{
        const transactionCreated = await repository.transaction.create({
            data: {
                title: dto.title,
                date: new Date(dto.date),
                value: dto.value,
                type: dto.type,
                category_id: dto.category_id,
                user_id: dto.user_id,   
            }
        })

        return transactionCreated.id
    }

    async deleteOne(id: string, user_id: string): Promise<void> {
        await repository.transaction.delete({
            where: {
                id,
                user_id
            }
        })
    }
}