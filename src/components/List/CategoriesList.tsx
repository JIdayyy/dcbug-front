import { Radio, RadioGroup, Spinner } from '@chakra-ui/react'
import { useGetAllCategoriesQuery } from 'src/generated/graphql'
import useCreateBugState from 'src/hooks/useCreateBugState'

export default function CategoriesList(): JSX.Element {
  const { data, loading } = useGetAllCategoriesQuery()
  const { dispatchSelectedCategory } = useCreateBugState()

  if (loading) return <Spinner />
  if (!data || !data.categories) return <>Error</>

  return (
    <RadioGroup
      my={5}
      w="full"
      justifyContent="flex-start"
      alignItems="flex-start"
      flexDir="row"
      display="flex"
      flexWrap="wrap"
      onChange={(e: string) => dispatchSelectedCategory(e)}
    >
      {data.categories.map((category) => (
        <Radio mx={4} value={category.id}>
          {category.name}
        </Radio>
      ))}
    </RadioGroup>
  )
}
