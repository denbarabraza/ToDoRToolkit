import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {InputItemForm} from "../components/common/InputItemForm";
import {action} from "@storybook/addon-actions";


export default {
  title: 'TODO/InputItemForm',
  component: InputItemForm,

  argTypes: {
    callback: { description: 'Enter value' },
  },
} as ComponentMeta<typeof InputItemForm>;


const Template: ComponentStory<typeof InputItemForm> = (args) => <InputItemForm {...args} />;

export const InputItemFormStory = Template.bind({});

InputItemFormStory.args = {
  callback:action('Input value')
};
