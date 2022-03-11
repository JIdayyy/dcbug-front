/* eslint-disable react/jsx-props-no-spreading */
import { Button, Flex, FormControl, Input, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import useAppState from 'src/hooks/useAppState'
import mainTheme from 'src/theme/mainTheme'
import {
  useMutateLoginMutation,
  useMutateMeMutation,
} from '../generated/graphql'

export default function Login(): JSX.Element {
  const navigate = useNavigate()

  const { dispatchLogin, dispatchLogout } = useAppState()
  const [login] = useMutateLoginMutation({
    onCompleted: (data) => {
      dispatchLogin(data.login)
      navigate('/')
    },

    onError: (error) => {
      console.error(error)
    },
  })

  const [me] = useMutateMeMutation({
    onCompleted: (data) => {
      dispatchLogin(data.me)
    },
    onError: () => {
      dispatchLogout()
    },
  })

  useEffect(() => {
    me()
  }, [])

  const { handleSubmit, register } = useForm()

  const onSubmit = async ({ email, password }: FieldValues): Promise<void> => {
    login({
      variables: { data: { email, password } },
    })
  }

  return (
    <Flex direction="row" alignItems="center">
      <Flex background="#24323F" w="100%" h="100vh" alignItems="center">
        <Text
          textAlign="center"
          textStyle="titleLogin"
          color="#ffffff"
          padding={121}
        >
          DC BUG REPORT
        </Text>
      </Flex>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        w="full"
        h="100vh"
      >
        <Text textStyle="loginText">Login now</Text>
        <FormControl p={10} w={['90%', '80%', '60%', '50%']}>
          <Input
            id="email"
            placeholder="Email"
            my={1}
            type="text"
            {...register('email')}
          />
          <Input
            id="password"
            placeholder="Password"
            my={1}
            type="password"
            {...register('password')}
          />
        </FormControl>
        <Button
          my={3}
          w={['65%', '55%', '35%', '25%']}
          backgroundColor={mainTheme.colors.orange}
          color="#ffffff"
          onClick={handleSubmit(onSubmit)}
        >
          SIGN IN
        </Button>
      </Flex>
    </Flex>
  )
}