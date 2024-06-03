import z from "zod"

export const RegisterSchema = z.object({
  firstName: z
    .string({
      required_error: "Nome é obrigatório.",
    })
    .min(3, "Nome deve conter pelo menos 3 caracteres."),

  taxId: z
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

  password: z
    .string({
      required_error: "Senha é obrigatória.",
    })
    .min(8, "Senha deve conter pelo menos 8 caracteres."),
})

export type RegisterData = z.infer<typeof RegisterSchema>
