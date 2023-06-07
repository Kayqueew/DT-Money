import { Summary } from '../../components/Summary'
import { Header } from '../../components/header'
import { TransactionsContenxt } from '../../contexts/TransctionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { SearchForm } from '../components/SearchForm'
import { useContextSelector } from 'use-context-selector'
import {
  CardTransaction,
  PriceHighLight,
  TransactionList,
  TransactionsContainer,
  TransactionsTable,
} from './styles'
import { CalendarBlank } from 'phosphor-react'

export function Transactions() {
  const transactions = useContextSelector(TransactionsContenxt, (context) => {
    return context.transactions
  })

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions.map((transactions) => {
              return (
                <tr key={transactions.id}>
                  <td width="50%">{transactions.description}</td>
                  <td>
                    <PriceHighLight variant={transactions.type}>
                      {transactions.type === 'outcome' && '- '}{' '}
                      {priceFormatter.format(transactions.price)}
                    </PriceHighLight>
                  </td>
                  <td>{transactions.category}</td>
                  <td>
                    {dateFormatter.format(new Date(transactions.createdAt))}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </TransactionsTable>

        <TransactionList> {/* mobile */}
          {transactions.map((transaction) => (
            <CardTransaction key={transaction.id}>
              <header>
                <span>{transaction.description}</span>
                <PriceHighLight variant={transaction.type}>
                  {transaction.type === 'outcome' && '- '}
                  {priceFormatter.format(transaction.price)}
                </PriceHighLight>
              </header>
              <footer>
                <div>{transaction.category} </div>
                <div>
                  <CalendarBlank size={16} />
                  {dateFormatter.format(new Date(transaction.createdAt))}
                </div>
              </footer>
            </CardTransaction>
          ))}
        </TransactionList>
      </TransactionsContainer>
    </div>
  )
}
