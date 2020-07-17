import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface GetTransactionDTO {
  transactions: Transaction[];
  balance: Balance;
}

class GetTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): GetTransactionDTO {
    return {
      transactions: this.transactionsRepository.all(),
      balance: this.transactionsRepository.getBalance(),
    } as GetTransactionDTO;
  }
}

export default GetTransactionService;
