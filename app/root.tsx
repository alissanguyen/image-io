import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "remix";
import type { MetaFunction } from "remix";
import { AppContextProvider } from "./provider/AppProvider";
import styles from "../app/tailwind.css";
import globalStyles from "./styles/global.css";

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: globalStyles }
  ];
}
export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export default function App() {
  return (
    <AppContextProvider>
      <Document>
        <Layout>
          <Outlet />
        </Layout>
      </Document>
    </AppContextProvider>
  );
}

const Document: React.FC = (props) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <noscript>
          <div
            style={{
              backgroundColor: "black",
              color: "white",
              padding: 30
            }}
          >
            <p style={{ fontSize: "1.5em" }}>
              This site works much better with JavaScript enabled...
            </p>
          </div>
        </noscript>
        <link
          rel="stylesheet"
          href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"
        ></link>
      </head>
      <body id="root">
        {props.children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
};

const Layout: React.FC = (props) => {
  return (
    <>
      {/* <NavBar /> */}
      <div>{props.children}</div>
      {/* <Footer /> */}
    </>
  );
};
