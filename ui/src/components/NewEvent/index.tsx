import React from 'react';

import Modal from '../../components/Modal';
import Input from '../../components/Input';
import UserIcon from '../../assets/icons/person-outline.svg';
import EmailIcon from '../../assets/icons/email-outline.svg';
import MsgIcon from '../../assets/icons/message-square-outline.svg';

const NewEvent = () => {
  return (
    <Modal
      title="New appointment"
      subtitle="Thu 17 Sep 2020 9:00 AM - 9:55 AM"
      enableSend={true}
      sendBtn={{ text: 'Send', onclick: 'hi' }}
    >
      <Input icon={UserIcon} placeholder="Tom Cruise" label="Your Name" type="text" />
      <Input icon={EmailIcon} placeholder="tom@cruise.com" label="Your E-mail" type="e-mail" />
      <Input icon={MsgIcon} placeholder="Let's talk about project" label="Agenda" type="text" />
    </Modal>
  );
};

export default NewEvent;
