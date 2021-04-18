import React from 'react'
import { Provider, ContextValueType } from './Context'
import Router from 'next/router'
import { postSignin } from '../features/ApiClient'
import Auth from './Auth'
import { swalAlert } from '../../components/base/alert'

export class Page extends React.Component<ContextValueType> {
  state: ContextValueType = {
    email: '',
    password: '',
    isPosting: false,
    errorMessage: ''
  }

  onChangeEmail = (email: string) => this.setState({ email })

  onChangePassword = (password: string) => this.setState({ password })

  onSubmit = () => {
    localStorage.clear()
    this.setState({ isPosting: true })
    this.signInFetch()
  }

  signInFetch = async () => {
    const result = await postSignin({
      email: this.state.email,
      password: this.state.password
    })
    if (result.success) {
      Router.push('/')
      return
    }
    this.setState({ isPosting: false })
    swalAlert('ログインできません', 'error')
  }

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          onChangeEmail: this.onChangeEmail,
          onChangePassword: this.onChangePassword,
          onSubmit: this.onSubmit
        }}
      >
        <Auth />
      </Provider>
    )
  }
}
