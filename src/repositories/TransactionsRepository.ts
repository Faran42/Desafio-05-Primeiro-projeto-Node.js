import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TrasactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (acc, cur) => {
        if (cur.type === 'income') {
          acc.income += cur.value;
        } else {
          acc.outcome += cur.value;
        }
        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      } as Balance,
    );
    balance.total = balance.income - balance.outcome;
    return balance;
  }

  public create({ title, value, type }: TrasactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
