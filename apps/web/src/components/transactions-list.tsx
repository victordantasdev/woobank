import { Loader } from "lucide-react"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table"
import { formatDate } from "@/utils/formatDate"
import { formatMoney } from "@/utils/formatMoney"

export type Transaction = {
  senderTaxId: string
  receiverTaxId: string
  value: number
  status: string
  completedAt: string
}

type Props = {
  transactions?: Transaction[]
  loadingTransactions: boolean
}

export default function TransactionsList({
  transactions,
  loadingTransactions,
}: Props) {
  const parsedTransactions = transactions?.map((transaction) => {
    return {
      senderTaxId: transaction.senderTaxId,
      receiverTaxId: transaction.receiverTaxId,
      value: formatMoney(transaction.value),
      status: transaction.status === "completed" ? "Concluído" : "Pendente",
      completedAt: formatDate(transaction.completedAt),
    }
  })

  console.log({ loadingTransactions })

  if (loadingTransactions) {
    return (
      <div className="flex items-center justify-center">
        <Loader className="animate-spin-slow" />
      </div>
    )
  }

  if (!transactions?.length) {
    return (
      <div className="flex items-center justify-center gap-2">
        <p>Ainda não há registros.</p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Data</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">CPF/CNPJ do recebedor</TableHead>
          <TableHead className="text-center">Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {parsedTransactions?.map((transaction) => (
          <TableRow key={Math.random()}>
            <TableCell className="text-center">
              {transaction.completedAt}
            </TableCell>
            <TableCell className="text-center">{transaction.status}</TableCell>
            <TableCell className="text-center">
              {transaction.receiverTaxId}
            </TableCell>
            <TableCell className="text-center">{transaction.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
