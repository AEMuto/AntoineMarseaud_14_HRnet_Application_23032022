import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store/store'

// Use throughout the app instead of plain `useDispatch` and `useSelector`
// in order to get typescript work effectively
// cf: https://redux-toolkit.js.org/tutorials/typescript
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector