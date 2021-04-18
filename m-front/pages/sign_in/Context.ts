import React from 'react'

export interface ContextValueType {
  email: string
  password: string
  isPosting: boolean
  errorMessage?: string
}

interface ContextActionType {
  onChangeEmail: (email: string) => void
  onChangePassword: (password: string) => void
  onSubmit: () => void
}

export const { Consumer, Provider } = React.createContext<
  ContextValueType & ContextActionType
>({} as any)
