import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Cookies from 'universal-cookie';
import { initialState, reducer, ContextOne } from '../context/global';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import axios from 'axios';

// axios.defaults.baseURL = process.env.apiUrl;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.response.use(response => {
    return response;
}, err => {
    if (Router.route !== "/login" && err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
        cookies.remove("Token_calendar")
        Router.replace("/login");
        return err;
    }
});


Router.events.on('routeChangeStart', () => { NProgress.start(); })
Router.events.on('routeChangeComplete', () => { NProgress.done(); })
Router.events.on('routeChangeError', () => { NProgress.done(); })

const cookies = new Cookies();

export default function MyApp(props) {
    const { Component, pageProps } = props;
    let [state, dispatch] = React.useReducer(reducer, initialState);
    let value = { state, dispatch };

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
        validate();
    }, []);

    let validate = () => {
        let auth = cookies.get("Token_calendar");
        if (Router.route !== "/login" && (auth === undefined || auth === "")) {
            Router.push("/login");
        } else if (Router.route !== "/schedules" && auth !== "" && auth !== undefined) {
            Router.push("/schedules");
        }
    }

    return (
        <React.Fragment>
            <Head>
                <title>{"Calendario"}</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <link rel="stylesheet" type="text/css" href="/nprogress.css" />
            </Head>
            <ContextOne.Provider value={value}>
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            </ContextOne.Provider>
        </React.Fragment>
    );
}
MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};