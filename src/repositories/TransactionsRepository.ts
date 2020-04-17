import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
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
    const income = this.getTotal('income');
    const outcome = this.getTotal('outcome');
    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  private getTotal(type: 'income' | 'outcome'): number {
    return this.transactions
      .filter(transaction => transaction.type === type)
      .reduce((totalValue, currentValue) => {
        return totalValue + currentValue.value;
      }, 0);
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
