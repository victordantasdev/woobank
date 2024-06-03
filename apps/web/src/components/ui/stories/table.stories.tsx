import { Meta, StoryFn } from "@storybook/react"
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table"

export default {
  title: "Components/Table",
  component: Table,
} as Meta

const Template: StoryFn = (args) => (
  <Table {...args}>
    <TableCaption>This is a table caption</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Age</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>John Doe</TableCell>
        <TableCell>30</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Jane Smith</TableCell>
        <TableCell>25</TableCell>
      </TableRow>
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell>Total:</TableCell>
        <TableCell>2</TableCell>
      </TableRow>
    </TableFooter>
  </Table>
)

export const Default = Template.bind({})
Default.args = {}
