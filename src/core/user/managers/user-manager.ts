import { UserRepository } from "../repositories";
import { User } from "../models";

export class UserManager {
  constructor(private userRepo: UserRepository) {}

  public async get(id: number): Promise<User | undefined> {
    //could cache and get here
    return await this.userRepo.get(id);
  }
}
