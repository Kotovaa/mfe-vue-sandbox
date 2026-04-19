import type { Meta, StoryObj } from '@storybook/vue3';
import PfButton from '../components/PfButton.vue';

const meta = {
  title: 'Components/Button',
  component: PfButton,
  args: { variant: 'primary', default: 'Сохранить' },
} satisfies Meta<typeof PfButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: 'secondary', default: 'Отмена' } };
export const Ghost: Story = { args: { variant: 'ghost', default: 'Подробнее' } };
export const Danger: Story = { args: { variant: 'danger', default: 'Удалить' } };
export const Loading: Story = { args: { loading: true, default: 'Сохраняю…' } };
export const Disabled: Story = { args: { disabled: true, default: 'Недоступно' } };
