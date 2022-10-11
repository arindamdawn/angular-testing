import { Meta, Story } from '@storybook/angular/types-6-0';
import { TimelineComponent } from './timeline.component';

export default {
  component: TimelineComponent,
  title: 'Timeline',
} as Meta;

export const actionsData = {};

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});

export const Default = Template.bind({});
Default.args = {};
