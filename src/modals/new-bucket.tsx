import { Button, Modal, TextInput } from '@mantine/core';
import { useState } from 'react';

function NewBucket(props: { opened: boolean, close: any }) {
  const [error, setError] = useState('');
  const [nameField, setNameField] = useState('');
  const lengthError = "Name must be longer than 5 characters";
  return (
    <div>
      <Modal
        opened={props.opened}
        centered
        onClose={props.close}
        title="New Bucket"
      >
        <TextInput
          placeholder="New bucket"
          label="Name"
          mb={16}
          error={error}
          value={nameField}
          onChange={(e) => setNameField(e.target.value)}
        />
        <Button onClick={() => {
          if (!isValid(nameField)) {
            setError(lengthError)
          } else {
            setNameField('');
            props.close();
          }
        }}>Add</Button>
      </Modal>
    </div>
  )
}

function isValid(input: string) {
  return input.length > 5;
}

export default NewBucket
