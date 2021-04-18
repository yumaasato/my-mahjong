import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from '../../helper/firebaseAuthHelper';
import Image from 'next/image';
import axios from 'axios';
import { auth, storage, provider } from "../../src/firebase/firebase";
import { useRouter } from 'next/router'
import styles from "./login.module.css";

// material-ui
import {
  Button,
  makeStyles
} from "@material-ui/core";

import CameraIcon from "@material-ui/icons/Camera";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginPage() {
  const classes = useStyles();
  const [user, loading] = useAuthState(getAuth());
  const router = useRouter();

  if (loading) {
    return <div className='py-20 text-center'>Loading...</div>;
  }

  if (!loading && user) {
    router.push('/');
  }

  // google認証
  const signInGoogle = async () => {
    await auth.signInWithPopup(provider).catch((err) => alert(err.message));
    router.push('/')
  };

  const handleGoogleLogin = () => {
    const request = async () => {
      const user = await signInGoogle();
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (auth && auth.currentUser) {
        const token = await currentUser.getIdToken(true);
        const config = { token };
        try {
          await axios.post('/api/v1/auth/users', config);
        } catch (error) {
          console.log(error);
        }
      }
    };
    request();
  };

  return (
    <div className='w-2/3 py-20 mx-auto'>
      <p className='font-bold text-4xl py-5 text-center'>Login</p>
      <Button
        fullWidth
        variant="contained"
        color="default"
        className={classes.submit}
        startIcon={<CameraIcon />}
        onClick={handleGoogleLogin}
      >
        SignIn with Google
            </Button>
    </div>
  );
}