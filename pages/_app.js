import "../styles/globals.css";
import Theme from "../themes/Theme";
import { ThemeProvider } from "styled-components";
import { StyledFooter } from "../components/homeStyles/StyledIndex";
import GlobalStyle from "../themes/GlobalStyle";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <Component {...pageProps} />
        <StyledFooter>
          Design and implementation by Daniel Martinez Lara
        </StyledFooter>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
