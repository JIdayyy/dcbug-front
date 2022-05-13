import { Box, Flex } from '@chakra-ui/react'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGetAllBugsByQuery, SortOrder } from 'src/generated/graphql'
import useSearchState from 'src/hooks/useSearchState'
import { useInView } from 'react-intersection-observer'
import customScrollbar from 'src/theme/customScrollbar'
import BugListFilters from './Filters/BugListFilters'
import BugListItem from './ListItems/BugListItem'
import IntersectionObserver from '../Assets/IntersectionObserver'

const MotionBox = motion(Box)

export default function BugList(): JSX.Element {
  const { website } = useSearchState()
  const { ref, inView } = useInView()

  const { data, fetchMore, refetch } = useGetAllBugsByQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      orderBy: {
        number: 'desc' as SortOrder,
      },
      skip: 0,
      take: 20,

      where: {
        Website: {
          is: {
            id: {
              equals: website || undefined,
            },
          },
        },
      },
    },
  })

  useEffect(() => {
    if (inView) {
      fetchMore({
        variables: {
          orderBy: {
            number: 'desc' as SortOrder,
          },
          skip: data?.bugs.length,
          take: 20,
          cursor: {
            number: data?.bugs[0]?.number,
          },
          where: {
            Website: {
              is: {
                id: {
                  equals: website || undefined,
                },
              },
            },
          },
        },
      })
    }
  }, [inView])

  useEffect(() => {
    refetch()
  }, [website])

  return (
    <Flex
      direction="column"
      shadow="lg"
      flexGrow={1}
      backgroundColor="#FFFFFF"
      zIndex={20}
      w="300px"
      maxW="300px"
      minW="300px"
      h="full"
    >
      <BugListFilters />

      <MotionBox
        overflowY="auto"
        css={customScrollbar}
        width="full"
        h="full"
        flexGrow={1}
        display="flex"
        flexDirection="column"
      >
        {data?.bugs.map((bug) => (
          <BugListItem key={bug.id} bug={bug} />
        ))}
        <IntersectionObserver ref={ref} />
      </MotionBox>
    </Flex>
  )
}
