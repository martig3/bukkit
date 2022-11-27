import { Button, Modal, TextInput } from '@mantine/core';
import { useState } from 'react';
import { useDebouncedState } from '@mantine/hooks';

function NewBucket(props: { opened: boolean, close: any }) {
  const [name, setName] = useState('');
  const [nameDebounced, setNameDebounced] = useDebouncedState('', 500);
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
          error={errorText(nameDebounced)}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNameDebounced(e.target.value);
          }}
        />
        <Button
          disabled={!maxLength(name)}
          onClick={() => {
            const error = errorText(name);
            if (error) {
            } else {
              setName('');
              setNameDebounced('');
              props.close();
            }
          }}>Add</Button>
      </Modal>
    </div>
  )
}

function errorText(input: string): string | null {
  const lengthError = "Name must be longer than 5 characters";
  if (!maxLength(input)) {
    return lengthError;
  }
  return null;
}

function maxLength(input: string) {
  return input.length >= 5;
}

export default NewBucket
