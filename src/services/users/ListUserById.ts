import { User } from "../../entities/user"
import { ListUserByIdModel } from "../../models/UserModel"
import { UserRepository } from "../../repositories/UserRepository"
import { HandleError } from "../../utils/handleError"
const repository = new UserRepository()
export class ListUserById implements ListUserByIdModel {
  async findById(id: string): Promise<User> {
    const user = await repository.getOneById(id)
    if (!user) throw new HandleError(404, "Usuário não encontrado.")
    return user
  }
}
