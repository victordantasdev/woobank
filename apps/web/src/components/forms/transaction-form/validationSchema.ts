import z from "zod"

export const TransactionSchema = z.object({
  receiverTaxId: z
    .string({
      required_error: "CPF/CNPJ é obrigatório.",
    })
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, "")
      return replacedDoc.length >= 11
    }, "CPF/CNPJ deve conter no mínimo 11 caracteres.")
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, "")
      return replacedDoc.length <= 14
    }, "CPF/CNPJ deve conter no máximo 14 caracteres.")
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, "")
      return !!Number(replacedDoc)
    }, "CPF/CNPJ deve conter apenas números."),

  value: z
    .number({
      required_error: "Valor é obrigatório.",
    })
    .min(1, "Valor deve ser maior que 0."),
})

export type TransactionData = z.infer<typeof TransactionSchema>
