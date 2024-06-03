import { Loader } from "lucide-react"
import { useEffect, useState } from "react"
import { fetchQuery } from "react-relay"

import TransactionForm from "@/components/forms/transaction-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"
import { environment } from "@/relay"
import { TOAST_DURATION } from "@/utils/constants"
import { formatMoney } from "@/utils/formatMoney"

import { FindAccountByUserId } from "@/graphql/queries/FindAccountByUserId"
import { FindAllTransactionsBySenderTaxId } from "@/graphql/queries/FindAllTransactionsBySenderTaxId"
import TransactionsList, {
  type Transaction,
} from "@/components/transactions-list"
import type { Ledger } from "@/types"

export type AccountData = {
  accountNumber: string
  balance: string
  ledger: Ledger
}

export default function HomePage() {
  const { user } = useAuth()
  const [accountData, setAccountData] = useState<AccountData>()
  const [transactionsData, setTransactionsData] = useState<Transaction[]>()
  const [isLoading, setIsLoading] = useState(true)
  const [loadingTransactions, setLoadingTransactions] = useState(true)

  function fetchTransactionsData() {
    const variables = {
      senderTaxId: user?.taxId,
    }

    fetchQuery(
      environment,
      FindAllTransactionsBySenderTaxId,
      variables
    ).subscribe({
      start: () => {
        setLoadingTransactions(true)
      },
      complete: () => {
        setLoadingTransactions(false)
      },
      error: (error) => {
        toast({
          title: "Woops, ocorreu um erro!",
          description: error.message,
          variant: "destructive",
          duration: TOAST_DURATION,
        })
      },
      next: (response: any) => {
        const transactions = response.FindAllTransactionsBySenderTaxId
        setTransactionsData(transactions)
      },
    })
  }

  function fetchAccountData() {
    const variables = {
      userId: user?._id,
    }

    fetchQuery(environment, FindAccountByUserId, variables).subscribe({
      start: () => {
        setIsLoading(true)
      },
      complete: () => {
        setIsLoading(false)
      },
      error: (error) => {
        toast({
          title: "Woops, ocorreu um erro!",
          description: error.message,
          variant: "destructive",
          duration: TOAST_DURATION,
        })
      },
      next: (response: any) => {
        const account = response.FindAccountByUserId

        const data = {
          accountNumber: account.accountNumber,
          balance: formatMoney(account.balance),
          ledger: account.ledger,
        }

        fetchTransactionsData()
        setAccountData(data)
      },
    })
  }

  useEffect(() => {
    fetchAccountData()
  }, [])

  return (
    <main className="m-8">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="flex-1 mb-4">
              <CardHeader>
                <CardTitle className="text-center">Número da conta</CardTitle>
              </CardHeader>

              <CardContent className="flex items-center justify-center gap-4">
                {isLoading ? (
                  <Loader className="animate-spin-slow" />
                ) : (
                  <span className="text-2xl text-slate-400">
                    {accountData?.accountNumber}
                  </span>
                )}
              </CardContent>
            </Card>

            <Card className="flex-1 h-fit mb-4">
              <CardHeader>
                <CardTitle className="text-center">Balanço da conta</CardTitle>
              </CardHeader>

              <CardContent
                className={cn(
                  "flex items-center justify-center gap-4",
                  accountData?.balance.includes("-")
                    ? "text-red-500"
                    : "text-emerald-500"
                )}
              >
                {isLoading ? (
                  <Loader className="animate-spin-slow text-card-foreground" />
                ) : (
                  <span className="text-2xl font-bold">
                    {accountData?.balance}
                  </span>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="w-full">
            <CardHeader>
              <h3 className="text-lg font-bold">Criar transação</h3>
              <p className="text-sm text-slate-400">
                Preencha os dados com atenção
              </p>
            </CardHeader>

            <CardContent>
              <TransactionForm
                fetchAccountData={fetchAccountData}
                isLoading={isLoading || loadingTransactions}
              />
            </CardContent>
          </Card>
        </div>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-center">
              Histórico de Transações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionsList
              transactions={transactionsData}
              loadingTransactions={loadingTransactions}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
