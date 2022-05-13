/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import { FormLabel, Input, InputProps } from '@chakra-ui/react'
import { FieldError, FieldValues, UseFormRegister } from 'react-hook-form'
import FormError from './InputError'

type Props = {
  register: UseFormRegister<FieldValues>
  name: string
  errors: {
    [x: string]: FieldError
  }
  label: string
  type: string
  placeholder?: string
} & InputProps

export default function InputWithError({
  register,
  placeholder,
  name,
  label,
  type,
  errors,
  ...rest
}: Props): JSX.Element {
  const isError = () => errors[name] !== undefined

  return (
    <>
      <FormLabel mb={1} mt={3} fontStyle="formPlaceholder">
        {label}
      </FormLabel>

      <Input
        {...rest}
        placeholder={placeholder ? placeholder : undefined}
        type={type}
        isInvalid={isError()}
        aria-label={name}
        {...register(name)}
      />
      <FormError name={name} errors={errors} />
    </>
  )
}
