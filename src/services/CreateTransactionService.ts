import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TrasactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: TrasactionDTO): Transaction {
    const balance = this.transactionsRepository.getBalance().total;
    if (type === 'outcome') {
      if (value > balance) {
        throw new Error('Error! Outcome operation value larger than balance');
      }
    }
    return this.transactionsRepository.create({ title, value, type });
  }
}

export default CreateTransactionService;
