import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { FormDataProvider } from '../contexts/FormDataContext';

export default function App({ Component, pageProps }: AppProps) {
    return (
    <FormDataProvider>
      <div className="text-black">
        <Component {...pageProps} />
      </div>
    </FormDataProvider>
  );
}
