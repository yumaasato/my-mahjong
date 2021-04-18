import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Player = {
  name: string | null
  token: string | null
  history: string[]
}

export type PlayerState = {
  player : Player
}

export type UpdatePlayerPayload = Player
export type AddHistoryPayload = string

const initialState: PlayerState = {
  player: {
    name: null,
    token: null,
    history: [],
  }
}

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    updatePlayer(state, action: PayloadAction<UpdatePlayerPayload>) {
      state.player = action.payload
    },
    addHistory(state, action: PayloadAction<AddHistoryPayload>) {
      state.player.history.push(action.payload)
    },
    reset(): PlayerState {
      return initialState
    },
  },
})