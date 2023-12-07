import { AuthProvider } from "@/hooks/AuthContext";
import { authReducer, initialState } from "@/hooks/AuthReducer";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider reducer={authReducer} initialState={initialState}>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
