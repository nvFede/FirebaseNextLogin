// _app.js
import { AuthProvider } from "@/context/AuthContext";
import { authReducer, initialState } from "@/reducers/AuthReducer";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider reducer={authReducer} initialState={initialState}>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
