import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation } from "react-relay"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import LoadingButton from "@/components/ui/loading-button"

import { type RegisterData, RegisterSchema } from "./validationSchema"
import { ACCESS_TOKEN, TOAST_DURATION, USER_KEY } from "@/utils/constants"
import { RegisterMutation } from "@/__generated__/RegisterMutation.graphql"
import { Register } from "@/graphql/mutations/RegisterMutation"
import { formatCpfCnpj } from "@/utils/formatCpfCnpj"

export default function RegisterPage() {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<RegisterData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      taxId: "",
      password: "",
    },
  })

  const [registerMutation] = useMutation<RegisterMutation>(Register)

  async function onSubmit(input: RegisterData) {
    setIsLoading(true)
    registerMutation({
      variables: {
        input: {
          firstName: input.firstName,
          taxId: input.taxId,
          password: input.password,
        },
      },
      onCompleted: ({ RegisterMutation }, errors) => {
        setIsLoading(false)
        if (errors && errors.length > 0) {
          toast({
            title: "Woops, ocorreu um erro!",
            description: errors[0].message,
            variant: "destructive",
            duration: TOAST_DURATION,
          })
          return
        }

        if (RegisterMutation) {
          localStorage.setItem(ACCESS_TOKEN, RegisterMutation?.token as string)
          localStorage.setItem(USER_KEY, JSON.stringify(RegisterMutation?.me))

          toast({
            title: "Conta criada com sucesso!",
            duration: TOAST_DURATION,
          })
          navigate("/", { replace: true })
        }
      },
    })
  }

  return (
    <section className="h-full flex">
      <div className="h-dvh p-10 w-1/2 from-emerald-500 to-slate-700 bg-gradient-to-br">
        <h1 className="text-5xl font-bold">
          <span className="text-emerald-500 bg-white px-1 rounded-sm">WOO</span>
          <span>BANK</span>
        </h1>
      </div>

      <div className="h-dvh p-10 w-1/2 flex flex-col justify-center items-center gap-4">
        <h2 className="text-4xl mb-8">Crie sua conta</h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Primeiro nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="taxId"
              render={({ field: { onChange, ...props } }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="CPF/CNPJ"
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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Senha" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton
              type="submit"
              variant="default"
              className="w-full"
              loading={isLoading}
            >
              Continuar
            </LoadingButton>

            <Button
              variant="ghost"
              className="w-full"
              onClick={() => navigate("/login")}
            >
              Acessar minha conta
            </Button>
          </form>
        </Form>
      </div>
    </section>
  )
}
