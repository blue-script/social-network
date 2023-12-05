import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import {DialogItem} from './DialogItem';

export default {
  title: 'DialogItemUI',
  decorators: [
    (DialogItem: React.ComponentType) => (
      <MemoryRouter>
        <DialogItem />
      </MemoryRouter>
    ),
  ],
};

export const DialogItemUI = () => {
  const obj = {name: 'Alex', id: '1'}
  return <DialogItem name={obj.name} id={obj.id}/>
}