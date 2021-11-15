import React, { useState, useEffect } from 'react'
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import Loader from './Loader';
// import { Offline, Online } from "react-detect-offline";

import { useGetCryptosQuery } from '../services/cryptoApi';

const Cryptocurrencies = ({ simplified }) => {
    const count = simplified ? 10 : 100;
    const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
    const [search, setSearch] = useState('');
    const [cryptos, setCryptos] = useState();


    useEffect(() => {

        const filteredData = cryptoList?.data?.coins.filter((coin) => coin?.name?.toLowerCase().includes(search.toLowerCase()))
        setCryptos(filteredData);
        // console.log(cryptos);
    }, [cryptoList, search]);


    if (isFetching) return <Loader />
    return (
        <>
           {!simplified &&
            <div className='search-crypto' onChange={(e) => setSearch(e.target.value)}>
                <Input placeholder='Search Cryptocurrency ' />
            </div>}
            <div>
                <Row gutter={[32, 32]} className="cryto-card-container" >
                    {cryptos?.map((currency) => (
                        <Col xs={24} sm={12} lg={8} className="crypto-card" key={currency.id}>
                            <Link to={`/crypto/${currency.id}`}>
                                <Card
                                    title={`${currency?.rank}, ${currency?.name} (${currency?.symbol})`}
                                    extra={<img className="crypto-image" src={currency?.iconUrl} alt="crypto" />}
                                    hoverable

                                >
                                    <p>Price: ${millify(currency?.price)}</p>
                                    <p>Market Cap: ${millify(currency?.marketCap)}</p>
                                    <p>Daily Change: <span style={{ color: currency?.change > 1 ? '#16c784' : '#ea3943' }}>{millify(currency?.change)} % </span> </p>

                                </Card>
                            </Link>
                        </Col>
                    ))}

                </Row>
            </div>
        </>
    )
}

export default Cryptocurrencies
