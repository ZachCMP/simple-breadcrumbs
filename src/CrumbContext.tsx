import React, { createContext, useReducer, Reducer, Dispatch } from 'react'

export type CrumbBaseType = {
	name: string
	label?: string
	meta?: any
}

export type CrumbWithHrefType = {
	href: string,
} & CrumbBaseType

export type CrumbWithOnClickType = {
	onClick: VoidFunction,
} & CrumbBaseType

export type CrumbType = CrumbWithHrefType | CrumbWithOnClickType

export type CrumbContextStateType = CrumbType[]

type CrumbContextActionType = (
	{ type: 'mount', crumb: CrumbType } |
	{ type: 'unmount', crumb: CrumbType, name?: string } |
	{ type: 'unmount', name: string, crumb?: CrumbType }
)

type ReducerType = Reducer<CrumbContextStateType, CrumbContextActionType>

const reducer: ReducerType = (state, action) => {
	switch(action.type) {
		case 'mount':
			return state.find(({ name }) => name === action.crumb.name) ? state : [ ...state, action.crumb ]
		case 'unmount':
			return state.filter(({ name }) => {
				if (action.crumb) return name !== action.crumb.name
				if (action.name) return name !== action.name
			})
		default:
			return state
	}
}

export const CrumbContext = createContext<CrumbContextStateType>([])
export const CrumbContextDispatchContext = createContext<Dispatch<CrumbContextActionType>>(() => {})

type CrumbContextProviderProps = {
	group?: string
}

export const CrumbContextProvider: React.FC<CrumbContextProviderProps> = ({ children, group }) => {
	const [crumbs, dispatch] = useReducer(reducer, [])
	
	return (
		<CrumbContext.Provider value={crumbs}>
			<CrumbContextDispatchContext.Provider value={dispatch}>
				{children}
			</CrumbContextDispatchContext.Provider>
		</CrumbContext.Provider>
	)
}

export default CrumbContextProvider