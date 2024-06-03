import { useMemo } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import { Ledger } from "@/types"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => {
          return Intl.NumberFormat("pt-BR", {
            currency: "BRL",
            currencyDisplay: "symbol",
            currencySign: "standard",
            style: "currency",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(Number(tooltipItem.formattedValue.replace(",", "")))
        },
      },
    },
  },
}

type Props = {
  ledger?: Ledger
}

export default function LedgerChart({ ledger }: Props) {
  const labels: string[] = []
  const expenses: number[] = []
  const revenues: number[] = []

  for (const register of ledger || []) {
    if (register.type === "revenue") {
      revenues.push(register.value / 100)
      expenses.push(0)
    } else {
      expenses.push(register.value / 100)
      revenues.push(0)
    }

    labels.push(
      new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(new Date(register.date))
    )
  }

  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          fill: true,
          label: "Entradas",
          data: revenues,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
          tension: 0.2,
        },

        {
          fill: true,
          label: "Saídas",
          data: expenses,
          borderColor: "rgb(248, 113, 113)",
          backgroundColor: "rgb(248, 113, 113, 0.5)",
          tension: 0.2,
        },
      ],
    }),
    [revenues, expenses]
  )

  return <Line options={options} data={data} />
}
