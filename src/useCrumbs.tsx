import { useContext } from 'react'

import { CrumbContext } from './CrumbContext'

const useCrumbs = () => {
  return useContext(CrumbContext)
}

export default useCrumbs