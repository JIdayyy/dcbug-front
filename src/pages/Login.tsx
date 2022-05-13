/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import LoginForm from 'src/components/Forms/Login'
import RegisterForm from 'src/components/Forms/Register'

const AnimatedPannel = motion(Box)
const AnimatedButton = motion(Button)
const AnimatedText = motion(Text)

export default function Login(): JSX.Element {
  const [isLogin, setIsLogin] = useState<boolean>(true)

  const variants = {
    login: {
      left: isLogin ? 0 : undefined,
      right: !isLogin ? 0 : 100,
    },
    register: {
      right: 0,
    },
  }

  const variant2 = {
    login: {
      x: isLogin ? 100 : 0,

      opacity: isLogin ? 0 : 1,
    },
  }
  const variant3 = {
    login: {
      x: isLogin ? -0 : -100,

      opacity: !isLogin ? 0 : 1,
    },
  }

  const textVariant = {
    login: {
      opacity: isLogin ? [1, 0, 1] : [1, 0, 1],
    },
    register: {
      opacity: !isLogin ? [1, 0, 1] : [1, 0, 1],
    },
  }

  const buttonVariants = {
    animate: {
      width: isLogin ? [200, 160, 120, 100] : [200, 160, 120, 100],
      x: isLogin ? [30, -50, 0] : [30, 100, -0],
    },
    initial: {
      width: !isLogin ? [200, 120, 100] : [100, 100, 100, 100],
      x: !isLogin ? [30, 50, 0] : [0, 50, 0],
    },
  }

  return (
    <Flex direction="row" alignItems="center" h="100vh">
      <AnimatedPannel
        variants={variants}
        transition={{ default: { duration: 0.4 } }}
        initial="register"
        animate="login"
        position="absolute"
        background="#24323F"
        w="50%"
        h="100vh"
        alignItems="center"
        zIndex={100}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        {isLogin ? (
          <AnimatedText variants={textVariant} animate="login" initial="login">
            <Text my={10} textAlign="center" fontSize="4xl" color="#ffffff">
              Welcome Back!
            </Text>
            <Text textAlign="center" fontSize="xl" color="#ffffff">
              to keep connected with us please login with your infos
            </Text>
          </AnimatedText>
        ) : (
          <AnimatedText
            variants={textVariant}
            animate="register"
            initial="register"
          >
            <Text my={10} textAlign="center" fontSize="4xl" color="#ffffff">
              Hello, Friend!
            </Text>
            <Text textAlign="center" fontSize="xl" color="#ffffff">
              Enter your personnal informations and start your journey with us
            </Text>
          </AnimatedText>
        )}
        <AnimatedButton
          variants={buttonVariants}
          width="20%"
          animate={isLogin ? 'animate' : 'initial'}
          initial={isLogin ? 'initial' : 'animate'}
          transition={{ default: { duration: 0.4 } }}
          backgroundColor="transparent"
          color="white"
          border="1px solid white"
          rounded={2}
          my={10}
          onClick={() => setIsLogin((c) => !c)}
        >
          {isLogin ? 'Register' : 'Sign In'}
        </AnimatedButton>
      </AnimatedPannel>
      <AnimatedPannel
        width="50%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        variants={variant2}
        transition={{ default: { duration: 0.4 } }}
        animate="login"
      >
        <RegisterForm setIsLogin={setIsLogin} />
      </AnimatedPannel>
      <AnimatedPannel
        display="flex"
        width="50%"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        variants={variant3}
        transition={{ default: { duration: 0.4 } }}
        animate="login"
      >
        <LoginForm setIsLogin={setIsLogin} />
      </AnimatedPannel>
    </Flex>
  )
}
