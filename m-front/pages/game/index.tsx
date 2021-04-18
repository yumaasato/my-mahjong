import React, { useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, TextField } from "@material-ui/core";

const index: React.FC = () => {
  const dispatch = useDispatch()
  const [playername, setPlayername] = useState("");

  const makePlayer = () => {

  }

  return (
    <div>
      Mリーグルール
      <br />
      参加プレイヤー一覧
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="playername"
        label="Playername"
        name="playername"
        autoComplete="playername"
        autoFocus
        value={playername}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPlayername(e.target.value);
        }}
      />
      <Button variant="contained" color="primary">プレイヤーを作成して参加させる</Button>

    </div>
  )
}

export default index
