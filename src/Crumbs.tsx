import React, { ReactNode } from 'react'

import { CrumbType } from './CrumbContext'
import useCrumbs from './useCrumbs'

export type CrumbsProps = {
  renderCrumb?: (crumb: CrumbType) => ReactNode
  renderSeparator?: (index: number) => ReactNode
}

const defaultRenderCrumb = (crumb: CrumbType) => (
  <a
    key={crumb.name}
    href={'href' in crumb ? crumb.href : '#'}
    onClick={() => 'onClick' in crumb && crumb.onClick()}
  >
    {crumb.label || crumb.name}
  </a>
)

const defaultRenderSeparator = (index: number) => <span key={index}> &gt; </span>

const Crumbs: React.FC<CrumbsProps> = ({
  renderCrumb = defaultRenderCrumb,
  renderSeparator = defaultRenderSeparator
}) => {
  const crumbs = useCrumbs()

  return (
    <>
      {
        crumbs
        .map(renderCrumb)
        .reduce((acc: ReactNode[], elem, i, arr) => {
          if (!renderSeparator) return [ ...acc, elem ]
          return i < arr.length - 1 ? [ ...acc, elem, renderSeparator(i) ] : [ ...acc, elem ]
        }, [])
      }
    </>
  )
}

export default Crumbs