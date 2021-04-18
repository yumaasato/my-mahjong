import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from './features/store';
import axios from 'axios';

const APP_KEY = 'appWithRedux'
axios.defaults.baseURL = 'http://localhost:3000'

function App({ Component, pageProps }: AppProps) {

  return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
  )
}

export default App;





// import { AppProps } from 'next/app'
// import { Provider, useDispatch } from 'react-redux'
// import axios from 'axios';
// import store from './features/store';
// import { persistStore } from 'redux-persist'
// import { PersistGate } from 'redux-persist/integration/react'
// import { playerStore } from "../src/store/index";


// axios.defaults.baseURL = 'http://localhost:3000'

// function App({ Component, pageProps }: AppProps) {
//   const store = playerStore()
//   const persistor = persistStore(store)

//   return (
//     <Provider store={store}>
//       <PersistGate persistor={persistor}>
//         <Component {...pageProps} />
//       </PersistGate>
//     </Provider>
//   )
// }

// export default App;



