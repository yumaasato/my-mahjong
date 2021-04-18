import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface Player {
  name: string;
}

export type PlayerState = {
  player: Player;
};

export type UpdatePlayerPayload = Player;
export type AddHistoryPayload = string;

const initialState: PlayerState = {
  player: {
    name: "",
  },
};

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    player: { name: "" },
  },
  reducers: {
    createPlayer: (state, action) => {
      state.player = action.payload;
    },
    updatePlayer: (state, action: PayloadAction<UpdatePlayerPayload>) => {
      state.player = action.payload;
    },
    reset(): PlayerState {
      return initialState;
    },
  },
});

export const { updatePlayer, reset } = playerSlice.actions;
export const selectPlayer = (state: RootState) => state.player.player;
export default playerSlice.reducer;
