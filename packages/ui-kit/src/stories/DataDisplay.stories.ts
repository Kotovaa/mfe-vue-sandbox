import type { Meta, StoryObj } from '@storybook/vue3';
import PfTable from '../components/PfTable.vue';

const meta = {
  title: 'Components/Table',
  component: PfTable,
  args: {
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Имя' },
      { key: 'role', label: 'Роль' },
    ],
    rows: [
      { id: '1', name: 'Саша', role: 'admin' },
      { id: '2', name: 'Кира', role: 'manager' },
      { id: '3', name: 'Лёша', role: 'member' },
    ],
  },
} satisfies Meta<typeof PfTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
