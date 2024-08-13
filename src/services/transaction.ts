import { PrismaClient } from "@prisma/client";
import { TransactionModel } from "../entities/transaction";
const repository = new PrismaClient()
export class TransactionService {
    async getAll(user_id: string, startDate: Date, endDate: Date ): Promise<TransactionModel[]> {
        const newStart = new Date( Date.now())
        // contagem dos últimos 6 meses
        const newEnd = new Date( Date.now())
        newEnd.setMonth(newStart.getMonth() - 7)
        console.log(newStart, newEnd);
        
        const transactions = await repository.transaction.findMany({
            where: {
            user_id,
            date: {
                gte: newEnd,
                lte: newStart,
            },
            },
        });

        return transactions
    }
}