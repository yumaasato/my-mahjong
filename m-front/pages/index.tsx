import React, { useEffect } from "react";
import Link from "next/link";
import utilStyles from '../styles/utils.module.css';
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import { auth } from "../src/firebase/firebase";

// utils
import { useWindowDimensions } from '../src/utils/dimensions'; // 画面サイズ 取得
import { IsWeb, IsMobile } from '../src/utils/breakpoint';

// ホーム画面
const Home: React.FC = () => {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            email: authUser.email
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unSub();
    };
  }, [dispatch]);

  return (
    <>
      {user.uid ? (
        <>
          ようこそ、{user.uid} さん
          <br />
          <Link href="player">
            <a className={utilStyles.colorInherit}>ゲーム作成へ</a>
          </Link>
          <br />
          <Link href="/">
            <a onClick={() => auth.signOut()}>Logout</a>
          </Link>
        </>
      ) : (
        <>
          <Link href="/sign_in/Auth">
            <a className={utilStyles.colorInherit}>ログインまたは登録</a>
          </Link>
        </>
      )}
    </>
  )
}

export default Home