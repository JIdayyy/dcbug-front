/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  Button,
  FormLabel,
  Input,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import useLocalStorage from 'src/components/Hook/useLocalStorage'
import {
  GetAllBugsByDocument,
  useCreateCustomBugMutation,
} from 'src/generated/graphql'
import useAppState from 'src/hooks/useAppState'
import useCreateBugState from 'src/hooks/useCreateBugState'
import useUploadFileState from 'src/hooks/useUploadFileState'
import customScrollBar from 'src/theme/scrollbar'
import useSound from 'use-sound'
import sendSound from '../../../static/sounds/send.mp3'
import FormError from '../InputError'
import RadioGroup from '../RadioGroup'
import createBugSchema from '../Resolvers/createBug.resolver.schema'

export const severityOptions = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']
export const priorityOptions = ['LOW', 'MEDIUM', 'HIGH']

interface IProps {
  websiteId: string | undefined
  onClose: () => void
}

export default function CreateBugForm({
  websiteId,
  onClose,
}: IProps): JSX.Element {
  const [isMute] = useLocalStorage('isMute', false)
  const [play] = useSound(sendSound, {
    volume: 0.5,
    soundEnabled: !isMute,
  })
  const { control, handleSubmit, register, formState } = useForm({
    criteriaMode: 'all',
    resolver: yupResolver(createBugSchema),
  })
  const {
    selectedCategory,
    dispatchSelectedCategory,
    dispatchSelectedWebsite,
  } = useCreateBugState()
  const { dispatchSetSelectedBug } = useUploadFileState()
  const toast = useToast()
  const navigate = useNavigate()
  const { user, dispatchLogout } = useAppState()

  if (!user) {
    dispatchLogout()
    navigate('/login')
  }

  const [mutate, { loading }] = useCreateCustomBugMutation({
    onCompleted: (data) => {
      play()
      toast({
        title: 'Bug sent.',
        description: 'Thanks for this report.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      dispatchSetSelectedBug(data.createBugCustom.id)
      dispatchSelectedCategory('')
      dispatchSelectedWebsite('')
      onClose()
      navigate(`/bugs/${data.createBugCustom.id}`)
    },
    refetchQueries: () => [GetAllBugsByDocument],
  })

  if (!user) return <div>You must be logged in to create a bug</div>

  const onSubmit = async (data: FieldValues) => {
    mutate({
      variables: {
        data: {
          ...data,
          Category: {
            connect: {
              id: selectedCategory,
            },
          },
          description: data.description,
          title: data.title,
          severity: data.severity,
          Website: {
            connect: {
              id: websiteId,
            },
          },
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      },
    })
  }

  return (
    <Box width="full" p={1} rounded={5} overflow="scroll" css={customScrollBar}>
      <FormError name="title" errors={formState.errors} />
      <Text color="#747474" fontWeight="normal" fontSize={15}>
        What’s the severity :
      </Text>

      <RadioGroup
        options={severityOptions}
        isRequired
        control={control}
        name="severity"
        label="severity"
      />

      <Text color="#747474" fontWeight="normal" fontSize={15}>
        How do you define the priority of this bug for our team ?
      </Text>

      <RadioGroup
        options={priorityOptions}
        isRequired
        control={control}
        name="priority"
        label="priority"
      />

      <FormLabel color="#747474" fontWeight="normal">
        Please give a title to this bug :
      </FormLabel>
      <Input my={2} color="black" {...register('title')} placeholder="Title" />

      <FormLabel color="#747474" fontWeight="normal">
        Now describe it precisely, in as much detail as possible :
      </FormLabel>
      <Textarea
        my={2}
        minH={200}
        color="black"
        {...register('description')}
        placeholder="Description"
      />
      <FormError name="description" errors={formState.errors} />

      <Button
        w="full"
        variant="action"
        isLoading={loading}
        onClick={handleSubmit(onSubmit)}
      >
        SUBMIT
      </Button>
    </Box>
  )
}
