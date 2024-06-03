import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation } from "react-relay"
import { useNavigate } from "react-router-dom"

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

import { ACCESS_TOKEN, TOAST_DURATION, USER_KEY } from "@/utils/constants"
import { formatCpfCnpj } from "@/utils/formatCpfCnpj"
import { Login } from "@/graphql/mutations/LoginMutation"
import { type LoginData, LoginSchema } from "./validationSchema"

import type { LoginMutation } from "@/__generated__/LoginMutation.graphql"

export default function LoginPage() {
  const navigate = useNavigate()

  const form = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      taxId: "",
      password: "",
    },
  })

  const [login] = useMutation<LoginMutation>(Login)

  function onSubmit(input: LoginData) {
    login({
      variables: {
        input: {
          taxId: input.taxId,
          password: input.password,
        },
      },
      onCompleted: ({ LoginMutation }, errors) => {
        if (errors && errors.length > 0) {
          toast({
            title: "Woops, ocorreu um erro!",
            description: errors[0].message,
            variant: "destructive",
            duration: TOAST_DURATION,
          })
          return
        }

        if (LoginMutation) {
          localStorage.setItem(ACCESS_TOKEN, LoginMutation?.token as string)
          localStorage.setItem(USER_KEY, JSON.stringify(LoginMutation?.me))

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
        <h2 className="text-4xl mb-8">Acesse sua conta</h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
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

            <Button type="submit" variant="default" className="w-full">
              Continuar
            </Button>

            <Button
              variant="ghost"
              className="w-full"
              onClick={() => navigate("/register")}
            >
              Criar nova conta
            </Button>
          </form>
        </Form>
      </div>
    </section>
  )
}
