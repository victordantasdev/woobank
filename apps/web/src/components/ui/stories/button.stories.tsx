import { Meta, StoryFn } from "@storybook/react"
import { Button, ButtonProps } from "@/components/ui/button"

export default {
  title: "Components/Button",
  component: Button,
} as Meta

const Template: StoryFn<ButtonProps> = (args) => (
  <Button {...args}>Button</Button>
)

export const Default = Template.bind({})
Default.args = {}

export const Destructive = Template.bind({})
Destructive.args = { variant: "destructive" }

export const Outline = Template.bind({})
Outline.args = { variant: "outline" }

export const Secondary = Template.bind({})
Secondary.args = { variant: "secondary" }

export const Ghost = Template.bind({})
Ghost.args = { variant: "ghost" }

export const Link = Template.bind({})
Link.args = { variant: "link" }

export const Icon = Template.bind({})
Icon.args = { size: "icon" }

export const Small = Template.bind({})
Small.args = { size: "sm" }

export const Large = Template.bind({})
Large.args = { size: "lg" }

export const Disabled = Template.bind({})
Disabled.args = { disabled: true }
