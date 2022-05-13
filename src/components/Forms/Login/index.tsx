/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Button,
  Center,
  Flex,
  FormControl,
  Spinner,
  Text,
} from '@chakra-ui/react'
import { Dispatch, KeyboardEvent, SetStateAction } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import useAppState from 'src/hooks/useAppState'
import { useMutateLoginMutation } from '../../../generated/graphql'
import loginSchema from '../Resolvers/login.resolver.shema'
import CustomInput from '../CustomInput'

interface IProps {
  setIsLogin: Dispatch<SetStateAction<boolean>>
}

export default function LoginForm({ setIsLogin }: IProps): JSX.Element {
  const navigate = useNavigate()

  const { dispatchLogin } = useAppState()

  const [login, { loading }] = useMutateLoginMutation({
    onCompleted: (data) => {
      dispatchLogin(data.login)
      navigate('/')
    },

    onError: (error) => {
      console.error(error)
    },
  })

  const { handleSubmit, register, formState } = useForm({
    resolver: yupResolver(loginSchema),
    criteriaMode: 'all',
  })

  const onSubmit = async ({ email, password }: FieldValues): Promise<void> => {
    login({
      variables: { data: { email, password } },
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
      w={['90%', '80%', '80', '70%', '60%', '50%']}
      h="50%"
      shadow="2xl"
      rounded={8}
      p={10}
    >
      <Text textStyle="titleLogin">Log In to Dc Reports</Text>
      <Text textStyle="loginText">Enter your email and password below</Text>
      <FormControl mt={10} w="100%">
        <CustomInput
          label="Email"
          autoComplete="email"
          fontSize={14}
          id="email-login"
          placeholder="Email"
          register={register}
          errors={formState.errors}
          name="email"
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
      </FormControl>
      <Button my={5} w="full" variant="action" onClick={handleSubmit(onSubmit)}>
        {loading ? <Spinner /> : 'Sign In'}
      </Button>

      <Center w="full">
        <Text>Don’t have an account?</Text>
        <Text
          _hover={{ textDecoration: 'underline' }}
          cursor="pointer"
          onClick={() => setIsLogin((c) => !c)}
          fontWeight="bold"
          mx={2}
        >
          Sign up
        </Text>
      </Center>
    </Flex>
  )
}
