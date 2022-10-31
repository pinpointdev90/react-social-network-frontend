import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import useForm, { useFormType } from '../../../hooks/useForm';

type InputProps = {
  name: string;
  sendValue: React.Dispatch<React.SetStateAction<{}>>;
  lastFormValue: {};
  formType: string;
  pattern?: string;
  initialValue?: string
};

const Input = styled.input`
  height: 2rem;
  background-color: rgb(232, 239, 245);
  box-shadow: 7px 7px 15px #bbcfda, -4px -4px 13px #fff,
  inset 4px 4px 8px rgba(209, 217, 230, 0.2),
    inset -8px -8px 8px rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  border: none;
  outline: none;
  font-size: 1rem;
  color: #333333;
  font-weight: bold;
  margin: 0.75rem;
  padding: 1rem;
  max-width: calc(31.25rem - 2rem);
  width: calc(100% - 3.5rem);
  transition: .1s all;

  ::placeholder {
    color: rgba(51, 51, 51, 0.8);
  }

  :hover{
    box-shadow: 4px 2px 18px #bbcfda, -4px -4px 13px #fff,
    inset 6px 6px 16px rgba(209, 217, 230, 0.8),
      inset -8px -8px 8px rgba(255, 255, 255, 0.2);
    transform: translateY(2px);
  }
`;

const InputAtom: React.FC<InputProps> = ({
  name,
  sendValue,
  lastFormValue,
  formType,
    pattern,
    initialValue
}) => {
  const { value, handleInputChange } = useForm({
    [name]: initialValue || "",
  });

  let inputValue = (value as any)[name];

  useEffect(() => {
    sendValue({
      ...lastFormValue,
      [name]: inputValue,
    });
  }, [inputValue]);

  return (
    <Input
      placeholder={name}
      onChange={handleInputChange}
      name={name}
      value={inputValue}
      type={formType}
      pattern={pattern}
    />
  );
};

export default InputAtom;
