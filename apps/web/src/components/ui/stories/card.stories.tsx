import { Meta, StoryFn } from "@storybook/react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

export default {
  title: "Components/Card",
  component: Card,
} as Meta

const Template: StoryFn = (args) => (
  <Card {...args}>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>This is a card description.</CardDescription>
    </CardHeader>
    <CardContent>This is the card content.</CardContent>
    <CardFooter>This is the card footer.</CardFooter>
  </Card>
)

export const Default = Template.bind({})
Default.args = {}
