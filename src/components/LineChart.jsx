import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    const coinPrice = [];
    const coinTimeStamp = [];

    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinPrice.push(coinHistory.data.history[i].price);

        coinTimeStamp.push( new Date(coinHistory.data.history[i].timestamp).getTime().toLocaleString());
    }

    const data = {
        labels: coinTimeStamp,
        datasets: [
            {
                label: 'price in USD',
                data: coinPrice,
                fill: false,
                backgroundCOlor: '#0071bd',
                borderColor: '#39a960'
            }
        ]
    }

    const options ={
        scales: {
            yAxes: [
                {
                   ticks: {
                       beginAtZero: true
                   } 
                }
            ]
        }
    }
    console.log(coinHistory);
    return (
        <>
            <Row className='chart-header'>
                <Title level={2} className='chart-title'>
                    {coinName} Price Chart
                </Title>
                <Col className='price-container'>
                    <Title level={5} className='price-change'>
                        {coinHistory?.data?.change}%
                    </Title>
                    <Title level={5} className='current-price'>
                        Current {coinName} Price: ${currentPrice}
                    </Title>
                </Col>
            </Row>
            <Line data={data} options={options} />
        </>
    )
}

export default LineChart