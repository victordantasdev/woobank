import { Loader } from "lucide-react"
import { useEffect, useState } from "react"
import { fetchQuery } from "relay-runtime"

import LedgerChart from "@/components/ledger-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { AccountData } from "./HomePage"

import { FindAccountByUserId } from "@/graphql/queries/FindAccountByUserId"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"
import { environment } from "@/relay"
import { TOAST_DURATION } from "@/utils/constants"
import { formatDate } from "@/utils/formatDate"
import { formatMoney } from "@/utils/formatMoney"

import type { Ledger } from "@/types"

export default function LedgerPage() {
  const { user } = useAuth()
  const [accountData, setAccountData] = useState<AccountData>()
  const [rawLedgerData, setRawLedgerData] = useState<Ledger>([])
  const [isLoading, setIsLoading] = useState(true)

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
        setRawLedgerData(account.ledger)

        const parsedDataLedger = account.ledger.map((ledgerEntry: any) => {
          return {
            ...ledgerEntry,
            date: formatDate(ledgerEntry.date),
            type: ledgerEntry.type === "revenue" ? "Entrada" : "Saída",
            value: formatMoney(ledgerEntry.value),
          }
        })

        const data = {
          accountNumber: account.accountNumber,
          balance: formatMoney(account.balance),
          ledger: parsedDataLedger.reverse(),
        }

        setAccountData(data)
      },
    })
  }

  useEffect(() => {
    fetchAccountData()
  }, [])

  if (isLoading) {
    return (
      <main className="h-[calc(100dvh-80px)] flex items-center justify-center">
        <Loader className="animate-spin-slow" />
      </main>
    )
  }

  return (
    <main className="p-6 flex gap-4">
      <Card className="h-fit flex-1">
        <CardContent className="flex items-center justify-center mt-4">
          <LedgerChart ledger={rawLedgerData} />
        </CardContent>
      </Card>

      <Card className="h-fit flex-1">
        <CardHeader>
          <CardTitle className="text-center">Fluxo de caixa</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Data</TableHead>
                <TableHead className="text-center">Tipo</TableHead>
                <TableHead className="text-center">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accountData?.ledger.map((ledgerEntry) => (
                <TableRow key={Math.random()}>
                  <TableCell className="text-center">
                    {ledgerEntry.date}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-center",
                      (ledgerEntry.type as string) === "Entrada"
                        ? "text-sky-500"
                        : "text-red-400"
                    )}
                  >
                    {ledgerEntry.type}
                  </TableCell>
                  <TableCell className="text-center">
                    {ledgerEntry.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  )
}
