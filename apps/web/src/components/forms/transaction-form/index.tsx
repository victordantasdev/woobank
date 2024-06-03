import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation } from "react-relay"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import MoneyInput from "@/components/ui/money-input"
import { toast } from "@/components/ui/use-toast"

import { useAuth } from "@/hooks/useAuth"
import { formatCpfCnpj } from "@/utils/formatCpfCnpj"
import { type TransactionData, TransactionSchema } from "./validationSchema"
import { TOAST_DURATION } from "@/utils/constants"
import { CreateTransaction } from "@/graphql/mutations/CreateTransactionMutation"
import { CreateTransactionMutation } from "@/__generated__/CreateTransactionMutation.graphql"
import LoadingButton from "@/components/ui/loading-button"

type Props = {
  fetchAccountData: () => void
  isLoading: boolean
}

export default function TransactionForm({
  fetchAccountData,
  isLoading,
}: Props) {
  const { user } = useAuth()

  const form = useForm<TransactionData>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      receiverTaxId: "",
      value: 0,
    },
  })

  const [TransactionMutation] =
    useMutation<CreateTransactionMutation>(CreateTransaction)

  function onSubmit(input: TransactionData) {
    TransactionMutation({
      variables: {
        input: {
          receiverTaxId: input.receiverTaxId,
          senderTaxId: user?.taxId as string,
          value: Number(input.value),
        },
      },
      onCompleted: (_, errors) => {
        if (errors && errors.length > 0) {
          toast({
            title: "Woops, ocorreu um erro!",
            description: errors[0].message,
            variant: "destructive",
            duration: TOAST_DURATION,
          })

          return
        }

        toast({
          title: "Transferência realizada com sucesso!",
          duration: TOAST_DURATION,
        })

        fetchAccountData()
      },
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="receiverTaxId"
          render={({ field: { onChange, ...props } }) => (
            <FormItem>
              <FormLabel>CPF/CNPJ</FormLabel>
              <FormControl>
                <Input
                  placeholder="CPF/CNPJ do destinatário"
                  onChange={(e) => {
                    const { value } = e.target
                    e.target.value = formatCpfCnpj(value)
                    onChange(e)
                  }}
                  {...props}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <MoneyInput
          form={form}
          name="value"
          label="Valor"
          placeholder="R$ 0,00"
        />

        <div className="w-full flex justify-center">
          <LoadingButton
            onClick={form.handleSubmit(onSubmit)}
            variant="default"
            className="text-white bg-emerald-600 hover:bg-emerald-700"
            loading={isLoading}
          >
            Realizar transferência
          </LoadingButton>
        </div>
      </form>
    </Form>
  )
}
