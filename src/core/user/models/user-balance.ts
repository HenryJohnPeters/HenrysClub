export interface Balance {
  balance: number;
  currencyCode: string;
}

export interface UserBalance extends Balance {
  userId: number;
}
