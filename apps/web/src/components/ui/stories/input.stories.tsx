import { Meta, StoryFn } from "@storybook/react"
import { Input, InputProps } from "@/components/ui/input"

export default {
  title: "Components/Input",
  component: Input,
  argTypes: {
    type: {
      control: {
        type: "select",
        options: ["text", "password", "number", "email", "tel", "date"],
      },
    },
  },
} as Meta

const Template: StoryFn<InputProps> = (args) => <Input {...args} />

export const Default = Template.bind({})
Default.args = {
  type: "text",
  placeholder: "Enter your text...",
}
