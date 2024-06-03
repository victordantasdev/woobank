import { Loader2 } from "lucide-react"
import { Button, ButtonProps } from "./button"

type Props = ButtonProps & {
  loading: boolean
  children: React.ReactNode
  className?: string
}

export default function LoadingButton({
  loading,
  children,
  className,
  ...props
}: Props) {
  return (
    <Button disabled={loading} className={className} {...props}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
}
