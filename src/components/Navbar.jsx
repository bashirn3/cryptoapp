import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';
import logo from '../images/logo-big3.png';

const { Title } = Typography;

const Navbar = () => {

    const [active, setActive] = useState(true);
    const [screenSize, setScreenSize] = useState();

    useEffect(() => {
        const handleSize = () => setScreenSize(window.innerWidth);

        window.addEventListener('resize', handleSize);

        handleSize()

        return () => window.removeEventListener('resize', handleSize);

    }, [])

    useEffect(() => {
        if (screenSize < 768) {
            setActive(false);
        } else {
            setActive(true)
        }

    }, [screenSize])

    return (
        <div className="nav-container">
            <div className="logo-container">
                <Avatar src={logo} size='large' />
                <Title level={2} className="logo" >
                    <Link to="/">Crypto Stats</Link>
                </Title>
                <Button className='menu-control-container' onClick={() => setActive(!active)}><MenuOutlined /></Button>
            </div>
            
            {active && (
                <Menu theme="dark" className="ant-menu" mode={screenSize < 768 ? 'vertical' : 'horizontal'}>
                    <Menu.Item icon={<HomeOutlined />}>
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item icon={<FundOutlined />}>
                        <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                    </Menu.Item>
                    <Menu.Item icon={<MoneyCollectOutlined />}>
                        <Link to="/exchanges">Exchanges</Link>
                    </Menu.Item>
                    <Menu.Item icon={<BulbOutlined />}>
                        <Link to="/news">News</Link>
                    </Menu.Item>
                </Menu>
            )}


        </div>
    )
}

export default Navbar;
