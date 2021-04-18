import React, { useEffect, useState, useContext, useReducer } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { selectPlayer } from "../../features/playerSlice";
import { getAuth } from '../../../helper/firebaseAuthHelper';

// material-ui
import {
  Button,
  TextField
} from "@material-ui/core";

const Player = () => {
  // 作成したplayersを入れておくためのstate
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const player = useSelector(selectPlayer);

  // playerのAPIからデータを取得
  const fetchData = async () => {
    const auth = getAuth();
    auth.currentUser;
    // ユーザー認証
    const request = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await auth.currentUser.getIdToken(true);
        try {
          const response = await fetch('http://localhost:3000/api/v1/players', {
            headers: {
              'Authorization': `Basic ${token}`
            }
          })
          const data = await response.json();
          // const [item] とすると配列が外れるので要注意
          const item = data.data
          setPlayers(item)
          setLoading(false)
        } catch (error) {
          console.log(error);
        }
      }
      request();
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Playerを追加する
  const addPlayer = () => {
    // formの内容が空白の場合はalertを出す
    if (name === "") {
      alert("文字を入力してください");
      return;
    }
    console.log(name)
    setPlayers([...players, name])
    setName("")
  }

  // Playerを追加後Rails側にリクエストを送る
  const handleAddPlayer = () => {
    const request = async () => {
      await addPlayer();
      const auth = getAuth();
      auth.currentUser;
      // 認証をかける
      if (auth && auth.currentUser) {
        const token = await auth.currentUser.getIdToken(true);
        const player = {
          name: name
        }
        try {
          await axios.post('api/v1/players', player, {
            headers: {
              'Authorization': `Basic ${token}`
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
    request();
  }

  //OKとキャンセルのどちらかを選択させる
  const deletePlayer = index => {
    const result = window.confirm(
      `playerを本当に削除していいですか？`
    );
    if (result) {
      const newPlayers = players.filter((player, playerIndex) => {
        return index !== playerIndex;
      });
      setPlayers(newPlayers);
    }
  };

    // Playerを削除後Rails側にリクエストを送る
  const handleDeletePlayer = () => {
    const request = async () => {
      deletePlayer;
      const auth = getAuth();
      auth.currentUser;
      if (auth && auth.currentUser) {
        const token = await auth.currentUser.getIdToken(true);
        const player = {
          name: name
        }
        try {
          await axios.delete('api/v1/players/{id}', {
            headers: {
              'Authorization': `Basic ${token}`
            }
          })
        } catch (error) {
          console.log(error);
        }
      }
    }
    request();
  }

  return (
    <div>
      <h1>player一覧</h1>
      <div className="form">
        <TextField
          variant="outlined"
          margin="normal"
          required
          id="playername"
          label="playername"
          name="playername"
          autoComplete="playername"
          autoFocus
          // formの入力値をtmpplayerで持っておく
          onChange={e => setName(e.target.value)}
          value={name}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddPlayer}
          className="btn btn-primary"
        >
          プレイヤーを作成する
        </Button>
      </div>
      <ul>
        {players.map((player) => {
          return <li key={player.id}>
            {player.name}
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDeletePlayer}
            >
              x
              </Button>
          </li>;
        })}
      </ul>
      <style>{`
        h1 {
          text-align: center;
        }
        .form {
          display: flex;
          justify-content: center;
        }
        ul {
          width: 200px;
          margin: 10px auto;
        }
      `}</style>
    </div>
  )
}

export default Player;
