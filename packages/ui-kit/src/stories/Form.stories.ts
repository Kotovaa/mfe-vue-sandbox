import type { Meta, StoryObj } from '@storybook/vue3';
import PfInput from '../components/PfInput.vue';

const meta = {
  title: 'Components/Input',
  component: PfInput,
  args: { label: 'Имя', modelValue: '' },
} satisfies Meta<typeof PfInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};
export const Filled: Story = { args: { modelValue: 'Саша' } };
