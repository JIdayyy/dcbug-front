/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import { Button, Center, Flex, FormControl, Text } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Dispatch, KeyboardEvent, SetStateAction } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import useAppState from 'src/hooks/useAppState'
import { useRegisterMutation } from '../../../generated/graphql'
import CustomInput from '../CustomInput'
import registerSchema from '../Resolvers/register.resolver.schema'

interface IProps {
  setIsLogin: Dispatch<SetStateAction<boolean>>
}

export default function RegisterForm({ setIsLogin }: IProps): JSX.Element {
  const navigate = useNavigate()
  const { dispatchLogin } = useAppState()
  const [registerNewUser, { loading }] = useRegisterMutation({
    onCompleted: (data) => {
      dispatchLogin(data.register)
      navigate('/')
    },

    onError: (error) => {
      console.error(error)
    },
  })

  const { handleSubmit, register, formState } = useForm({
    criteriaMode: 'all',
    resolver: yupResolver(registerSchema),
  })

  const onSubmit = async ({
    email,
    password,
    first_name,
    last_name,
    secret_key,
  }: FieldValues): Promise<void> => {
    registerNewUser({
      variables: {
        data: { email, password, first_name, last_name, secret_key },
      },
    })
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit(onSubmit)()
    }
  }

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      w={['90%', '80%', '80', '70%', '70%', '70%']}
      shadow="2xl"
      rounded={8}
      p={10}
      h="50%"
    >
      <Text textStyle="titleLogin">Register to Dc Reports</Text>
      <Text textStyle="loginText">We need some informations</Text>

      <FormControl mt={10} w="100%">
        <CustomInput
          autoComplete="email"
          label="Email"
          fontSize={14}
          id="email-register"
          placeholder="Email"
          register={register}
          errors={formState.errors}
          name="email"
          type="text"
        />

        <CustomInput
          autoComplete="given-name"
          label="First Name"
          fontSize={14}
          id="first_name"
          placeholder="First Name"
          register={register}
          errors={formState.errors}
          name="first_name"
          type="text"
        />

        <CustomInput
          autoComplete="family-name"
          label="Last Name"
          fontSize={14}
          id="last-name"
          placeholder="First Name"
          register={register}
          errors={formState.errors}
          name="last_name"
          type="text"
        />

        <CustomInput
          label="Password"
          autoComplete="password"
          fontSize={14}
          onKeyPress={handleKeyDown}
          id="password-login"
          placeholder="Password"
          register={register}
          errors={formState.errors}
          name="password"
          type="password"
        />

        <CustomInput
          label="Password"
          fontSize={14}
          onKeyPress={handleKeyDown}
          id="confirm-password-login"
          placeholder="Confirm Password"
          register={register}
          errors={formState.errors}
          name="confirmPassword"
          type="password"
        />

        <CustomInput
          type="text"
          label="Acces Key"
          fontSize={14}
          onKeyPress={handleKeyDown}
          id="acces-key"
          placeholder="Acces key"
          register={register}
          errors={formState.errors}
          name="secret_key"
        />
      </FormControl>

      <Button
        my={5}
        isLoading={loading}
        w="full"
        variant="action"
        onClick={handleSubmit(onSubmit)}
      >
        SIGN IN
      </Button>

      <Center w="full">
        <Text>Allready got an account ?</Text>
        <Text
          _hover={{ textDecoration: 'underline' }}
          cursor="pointer"
          onClick={() => setIsLogin((c) => !c)}
          fontWeight="bold"
          mx={2}
        >
          Sign in
        </Text>
      </Center>
    </Flex>
  )
}
