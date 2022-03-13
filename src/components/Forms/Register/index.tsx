/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import { Button, Flex, FormControl, Input, Text } from '@chakra-ui/react'
import { FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import useAppState from 'src/hooks/useAppState'
import { useRegisterMutation } from '../../../generated/graphql'

export default function RegisterForm(): JSX.Element {
  const navigate = useNavigate()

  const { dispatchLogin } = useAppState()
  const [registerNewUser] = useRegisterMutation({
    onCompleted: (data) => {
      dispatchLogin(data.register)
      navigate('/')
    },

    onError: (error) => {
      console.error(error)
    },
  })

  const { handleSubmit, register } = useForm()

  const onSubmit = async ({
    email,
    password,
    first_name,
    last_name,
  }: FieldValues): Promise<void> => {
    registerNewUser({
      variables: { data: { email, password, first_name, last_name } },
    })
  }

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      w="full"
      h="100vh"
    >
      <Text fontFamily="Poppins" fontSize={30} fontWeight="bold">
        Register to Dc bug report
      </Text>
      <FormControl p={10} w={['90%', '80%', '80%', '80%']}>
        <Input
          id="email"
          placeholder="Email"
          my={1}
          type="text"
          {...register('email')}
        />
        <Input
          id="first_name"
          placeholder="First Name"
          my={1}
          type="text"
          {...register('first_name')}
        />
        <Input
          id="last_name"
          placeholder="Last Name"
          my={1}
          type="text"
          {...register('last_name')}
        />
        <Input
          id="password"
          placeholder="Password"
          my={1}
          type="password"
          {...register('password')}
        />
        <Input
          id="confirmPassword"
          placeholder="Confirm password"
          my={1}
          type="password"
          {...register('confirmPassword')}
        />
        <Input
          id="accesKey"
          placeholder="Acces key"
          my={1}
          type="password"
          {...register('accesKey')}
        />
      </FormControl>
      <Button
        my={3}
        w={['65%', '55%', '35%', '25%']}
        backgroundColor="#24323F"
        color="#ffffff"
        onClick={handleSubmit(onSubmit)}
      >
        SIGN IN
      </Button>
    </Flex>
  )
}