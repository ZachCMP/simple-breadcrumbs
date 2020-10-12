import React, { useContext, useEffect } from 'react'

import { CrumbContextDispatchContext, CrumbType } from './CrumbContext'

export type CrumbProps = CrumbType

const Crumb: React.FC<CrumbProps> = ({ children, ...crumb }) => {
  const dispatch = useContext(CrumbContextDispatchContext)

  useEffect(() => {
    dispatch({ type: 'mount', crumb })
    return () => dispatch({ type: 'unmount', name: crumb.name })
  })

  return null
}

export default Crumb