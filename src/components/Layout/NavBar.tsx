import { Button, Flex, useDisclosure, useToast } from '@chakra-ui/react'
import {
  GetAllBugsByDocument,
  GetAllNotificationsDocument,
  useAllNotificationsSubscription,
} from 'src/generated/graphql'
import customClient from 'src/services/graphql'
import useSound from 'use-sound'
import CreateBugModal from '../Modals/CreateBug.modal'
import Notifications from '../Notifications'
import notificationSound from '../../static/sounds/bell.mp3'
import useLocalStorage from '../Hook/useLocalStorage'

const NavBar = (): JSX.Element => {
  const [isMute] = useLocalStorage('isMute', false)
  const [play] = useSound(notificationSound, {
    volume: 0.5,
    soundEnabled: !isMute,
  })
  const { isOpen, onOpen, onClose } = useDisclosure()

  const toast = useToast()

  useAllNotificationsSubscription({
    onSubscriptionComplete: async () => {
      toast({
        title: 'You just received a notification',
        status: 'info',
      })
    },

    shouldResubscribe: true,
    onSubscriptionData: async (r) => {
      play()

      await customClient.refetchQueries({
        include: [GetAllBugsByDocument, GetAllNotificationsDocument],
      })

      toast({
        title: `${r.subscriptionData.data?.normalSubscription.message}`,
        status: 'info',
      })
    },
  })

  return (
    <Flex
      width="full"
      shadow="md"
      h="100px"
      zIndex={100}
      justifyContent="flex-end"
      alignContent="center"
      position="relative"
      alignItems="center"
      px={5}
      backgroundColor="white"
    >
      <Button variant="action" mx={2} onClick={onOpen}>
        Report a new Bug 🐛
      </Button>

      <CreateBugModal isOpen={isOpen} onClose={onClose} />
      <Notifications />
    </Flex>
  )
}

export default NavBar
