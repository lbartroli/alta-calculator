import Head from "next/head";
import Nav from "./nav";

const layoutStyle = {
    margin: 20,
    padding: 20
};

const Layout = ({children, title = 'Home'}) => (
    <div style={layoutStyle}>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
            />
            <link
                href="https://fonts.googleapis.com/css?family=Roboto"
                rel="stylesheet"
            />
        </Head>
        <header>
            <Nav />
        </header>
        {children}
        <style jsx global>{`
            * {
                font-family: 'Roboto'
            }
        `}</style>
    </div>
);

export default Layout;
