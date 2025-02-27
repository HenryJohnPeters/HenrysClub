export interface Balance {
  amount: number;
  currencyCode: string;
}

export interface UserBalance extends Balance {
  userId: number;
}
