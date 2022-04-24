import { Box } from '@chakra-ui/react'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGetAllBugsByQuery, SortOrder } from 'src/generated/graphql'
import useSearchState from 'src/hooks/useSearchState'
import { useInView } from 'react-intersection-observer'
import customScrollbar from 'src/theme/customScrollbar'
import SkelettonPlaceholder from '../Assets/SkelettonPLaceholder'
import BugListFilters from './Filters/BugListFilters'
import BugListItem from './ListItems/BugListItem'

const MotionBox = motion(Box)

export default function BugList(): JSX.Element {
  const { website } = useSearchState()
  const { ref, inView } = useInView()

  const { data, loading, fetchMore, refetch } = useGetAllBugsByQuery({
    // notifyOnNetworkStatusChange: true,

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
    refetch()
  }, [website])

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

  return (
    <MotionBox
      shadow="lg"
      h="80%"
      position="fixed"
      backgroundColor="#FFFFFF"
      zIndex={20}
      w="300px"
    >
      <BugListFilters />

      <MotionBox
        overflowY="auto"
        css={customScrollbar}
        width="full"
        h="80%"
        display="flex"
        flexDirection="column"
      >
        {!loading ? (
          <>
            {data?.bugs.map((bug) => (
              <BugListItem key={bug.id} bug={bug} />
            ))}
            <span
              style={{
                visibility: 'hidden',
              }}
              ref={ref}
            >
              intersection observer marker
            </span>
          </>
        ) : (
          <SkelettonPlaceholder number={20} />
        )}
      </MotionBox>
    </MotionBox>
  )
}
