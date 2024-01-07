import React, {ReactNode} from 'react';
import {StoreType} from './redux/redux-store';

export const StoreContext = React.createContext({} as StoreType)

type ProviderType = {
  store: StoreType
  children: ReactNode
}
export const Provider: React.FC<ProviderType> = (props) => {
  return (
    <StoreContext.Provider value = {props.store} >
      {props.children}
    </StoreContext.Provider>
  )
}
// export default StoreContext