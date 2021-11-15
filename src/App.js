import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Typography, Space, Layout } from 'antd';
import Navbar from './components/Navbar';
import { Homepage, Exchanges, Cryptocurrencies, Cryptodetails, News } from './components';
import './App.css';

const App = () => {
    return (
        <div className="app">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="main">
                <Layout>
                    <div className="routes">
                        <Switch>
                            <Route exact path="/">
                                <Homepage />
                            </Route>
                            <Route exact path="/exchanges">
                                <Exchanges />
                            </Route>

                            <Route exact path="/cryptocurrencies">
                                <Cryptocurrencies />
                            </Route>
                            <Route exact path="/crypto/:coinId">
                                <Cryptodetails />
                            </Route>
                            <Route exact path="/news">
                                <News />
                            </Route>
                        </Switch>
                    </div>
                    <div className="footer">
                        <Typography.Title level={5} style={{ color: 'rgba(255, 255, 255, 0.67)', textAlign: 'center' }}>
                            Crypto Stats <br />
                            All rights reserved <br />
                            <Space>
                                <Link to="/">Home</Link>
                                <Link to="/exchanges"> Exchanges</Link>
                                <Link to="/news">News</Link>
                            </Space>
                        </Typography.Title>
                    </div>
                </Layout>
            </div>

        </div>

    )
}

export default App
