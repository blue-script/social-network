import {Message} from './Message';
import React from 'react';

export default {
  title: 'MessageForDialogs',
  components: Message
}

export const MessageUI = () => {
  const exampleText = "example message"
  return <Message message={exampleText}/>
}