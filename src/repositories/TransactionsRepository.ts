import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
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
    let income = 0, total = 0, outcome = 0;

    this.transactions.map(transaction => {
      if(transaction.type === 'income') {
        income += transaction.value;
        total += transaction.value;
      }

      if(transaction.type === 'outcome') {
        outcome += transaction.value;
        total -= transaction.value;
      }
    })

    return {
      income,
      outcome,
      total
    };
  }

  public create({title, value, type}: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type})

    this.transactions.push(transaction);

    return transaction
  }
}


export default TransactionsRepository;
