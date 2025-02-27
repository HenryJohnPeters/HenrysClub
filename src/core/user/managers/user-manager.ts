import { UserRepository } from "../repositories";
import { User } from "../models";

export class UserManager {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  public async get(id: number): Promise<User | undefined> {
    //could cache and get here
    return await this.userRepo.get(id);
  }
}
