import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: string;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: Request): Transaction {
    if(type !== 'income' && type !== 'outcome') {
      throw Error('Transaction type not valid')
    }

    if(type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();

      if(balance.total < value) {
        throw Error('Value is higher than total balance')
      }
    }
    
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type
    })

    return transaction;
  }
}

export default CreateTransactionService;
