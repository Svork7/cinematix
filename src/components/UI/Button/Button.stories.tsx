import Button, { Props } from './Button'
export default {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    variant: { type: 'string', description: 'Основной вариант кнопки' },
  },
}

const Template = (args: Props) => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
  buttonName: 'Button',
}
