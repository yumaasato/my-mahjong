import React, { useState } from "react";
import { getAuth } from '../../helper/firebaseAuthHelper';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from "./Auth.module.css";
import { auth, provider } from "../../src/firebase/firebase";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Grid,
  Typography,
  makeStyles,
  Modal,
  IconButton,
  Box,
} from "@material-ui/core";

import SendIcon from "@material-ui/icons/Send";
import CameraIcon from "@material-ui/icons/Camera";
import EmailIcon from "@material-ui/icons/Email";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  modal: {
    outline: "none",
    position: "absolute",
    width: 400,
    borderRadius: 10,
    backgroundColor: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(10),
  },
  image: {
    backgroundImage:
      "url(https://unsplash.com/photos/OeyXsONO9l4)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Auth: React.FC = () => {
  const classes = useStyles();
  const [user, loading] = useAuthState(getAuth());
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [openModal, setOpenModal] = React.useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setAvatarImage(e.target.files![0]);
      e.target.value = "";
    }
  };

  // Emailをリセットする
  const sendResetEmail = async (e: React.MouseEvent<HTMLElement>) => {
    await auth
      .sendPasswordResetEmail(resetEmail)
      .then(() => {
        setOpenModal(false);
        setResetEmail("");
      })
      .catch((err) => {
        alert(err.message);
        setResetEmail("");
      });
  };

  // google認証でユーザー登録
  const signInGoogle = async () => {
    await auth.signInWithPopup(provider).catch((err) => alert(err.message));
    router.push('/')
  };

  const handleGoogleLogin = () => {
    const request = async () => {
      await signInGoogle();
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

  // Eメールログイン
  const signInEmail = async () => {
    await auth.signInWithEmailAndPassword(email, password).catch((err) => alert(err.message));
    router.push('/')
  };

  const handleEmailLogin = () => {
    const request = async () => {
      await signInEmail();
      const auth = getAuth();
      auth.currentUser;
      if (auth && auth.currentUser) {
        const token = await auth.currentUser.getIdToken(true);
        const config = { token };
        try {
          await axios.post('/api/v1/auth/users', config);
        } catch (error) {
          console.log(error);
        }
      }
    }
    request();
  };

  // Eメール認証
  const signUpEmail = async () => {
    await auth.createUserWithEmailAndPassword(email, password).catch((err) => alert(err.message));
    router.push('/')
  };

  // 認証後Rails側にリクエストを送る
  const handleEmailsignUp = () => {
    const request = async () => {
      await signUpEmail();
      const auth = getAuth();
      const currentUser = auth.currentUser;
      // Firebase Authの認証
      if (auth && auth.currentUser) {
        const token = await currentUser.getIdToken(true);
        const config = { token };
        // Rails側にリクエストを送る
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
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} />
      <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isLogin ? "Login" : "Register"}
          </Typography>
          <form className={classes.form} noValidate>
            {!isLogin && (
              <>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUsername(e.target.value);
                  }}
                />
                <Box textAlign="center">
                  <IconButton>
                    <label>
                      <AccountCircleIcon
                        fontSize="large"
                        className={
                          avatarImage
                            ? styles.login_addIconLoaded
                            : styles.login_addIcon
                        }
                      />
                      <input
                        className={styles.login_hiddenIcon}
                        type="file"
                        onChange={onChangeImageHandler}
                      />
                    </label>
                  </IconButton>
                </Box>
              </>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
            />

            <Button
              disabled={
                isLogin
                  ? !email || password.length < 6
                  : !email || password.length < 6
              }
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              startIcon={<EmailIcon />}
              onClick={
                isLogin
                  ? async () => {
                    try {
                      await handleEmailLogin();
                    } catch (err) {
                      alert(err.message);
                    }
                  }
                  : async () => {
                    try {
                      await handleEmailsignUp();
                    } catch (err) {
                      alert(err.message);
                    }
                  }
              }
            >
              {isLogin ? "Login" : "Register"}
            </Button>
            <Grid container>
              <Grid item xs>
                <span
                  className={styles.login_reset}
                  onClick={() => setOpenModal(true)}
                >
                  Forgot password ?
                </span>
              </Grid>
              <Grid item>
                <span
                  className={styles.login_toggleMode}
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Create new account ?" : "Back to login"}
                </span>
              </Grid>
            </Grid>

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
          </form>

          <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <div style={getModalStyle()} className={classes.modal}>
              <div className={styles.login_modal}>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type="email"
                  name="email"
                  label="Reset E-mail"
                  value={resetEmail}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setResetEmail(e.target.value);
                  }}
                />
                <IconButton onClick={sendResetEmail}>
                  <SendIcon />
                </IconButton>
              </div>
            </div>
          </Modal>
        </div>
      </Grid>
    </Grid>
  );
};
export default Auth;