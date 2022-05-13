import React from 'react'

type Props = {
  ref: (node?: Element | null | undefined) => void
}

export default function IntersectionObserver({ ref }: Props): JSX.Element {
  return (
    <span
      style={{
        visibility: 'hidden',
      }}
      ref={ref}
    >
      intersection observer marker
    </span>
  )
}
