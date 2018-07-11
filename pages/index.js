import Layout from "../components/layout";
import { Component } from "react";
import io from "socket.io-client";
import fetch from "isomorphic-unfetch";

class IndexPage extends Component {

    render() {
        return (
            <Layout title={'Home'}>
                <h1>Alta Calculator</h1>
            </Layout>
        )
    }
}

export default IndexPage;