import React, { useState } from 'react';
import { Row, Col, Card, Typography, Select, Avatar } from 'antd';
import { useGetCryptoNewsApiQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import moment from 'moment';
import Loader from './Loader';

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'


const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState('Crytocurrency');
    const { data: news, isFetching } = useGetCryptoNewsApiQuery({ category: newsCategory, count: simplified ? 6 : 12 });
    const { data } = useGetCryptosQuery(100);

    if (isFetching) return <Loader />;



    console.log(news)
    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        value={newsCategory}
                        className="select-news"
                        placeholder="Select a Crypto"
                        optionFilterProp="children"
                        onChange={(value) => setNewsCategory(value)}
                        filterOption={(input, option) => option?.options?.toLowerCase().indexOf(input.toLowerCase()) >= 0}

                    >
                        <Option value="Cryptocurrency">
                            Cryptocurrency
                        </Option>
                        {data?.data?.coins.map((coin) => { return <Option value={coin?.name}>{coin?.name}</Option> })}
                    </Select>
                </Col>
            )}
            {news?.value?.map((news, i) => {
                return (<Col xs={24} sm={12} lg={8} key={isFetching}>
                    <Card
                        loading={isFetching}
                        hoverable
                        className='news-card'
                        // cover={<img style={{ borderRadius: '5px', maxHeight: '200px' }} src={news?.image?.thumbnail?.contentUrl || demoImage} alt='news' />}

                    >
                        <a href={news.url} target="_blank" rel="nonreferrer">
                            <div className="news-image-container">
                                <Title className="news-title" level={5}>
                                    {news?.name}
                                </Title>
                                <img style={{ borderRadius: '5px', maxWidth: '200px', maxHeight: '100px' }} src={news?.image?.thumbnail?.contentUrl || demoImage} alt='news' />
                            </div>
                            <p>
                                {news?.description.length > 100 ? `${news?.description.substring(0, 100)}... Read more` : news?.description}
                            </p>
                            <div className="provider-container">
                                <div>
                                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
                                    <Text className="provider-name">{news.provider[0]?.name}</Text>
                                </div>
                                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                            </div>
                        </a>

                    </Card>
                </Col>)
            })}
        </Row>
    )
}

export default News;
