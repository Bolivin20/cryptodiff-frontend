import style from './CryptoInfo.module.css';
import React, {useEffect, useState} from 'react';
import Box from '../../components/Box/Box';
import Page from '../../components/Page/Page';
import Chart from '../../components/Chart/Chart';
import Binance from '../../images/Binance.svg';
import Huobi from '../../images/Huobi.svg';
import Bitstamp from '../../images/Bitstamp.svg';
import {useParams, useLocation} from 'react-router-dom';
import axios from "axios";


function Info() {
    const [chartData, setChartData] = useState([]);

    const markets = {
        bitstamp: Bitstamp,
        huobi: Huobi,
        binance: Binance,
    };

    const convertArrayToData = (array) => {
        return array.map((item, index) => {
            return {
                index: index,
                price: item,
            };
        });
    };

    const {id} = useParams();
    const location = useLocation();
    const {pricesMap} = location.state;
    const exchanges = Object.keys(pricesMap);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8080/api/historical/' + id);
                const historyPrices = Object.values(response.data);
                setChartData(historyPrices);
                console.log(chartData);
            } catch (error) {
                console.log('Wystąpił błąd podczas pobierania danych.');
                console.log(error);
            }
        }

        fetchData();
    }, []);


    const capitalizeFirstLetter = (string) => {
        return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
    };

    return (
        <Page>
            <div className={style.content}>
                <Box width='40%'>
                    <h1 className={style.cryptoTitle}>{id.toUpperCase()}</h1>
                    <div className={style.label}>
                        <p>Stock Market</p>
                        <p>Price</p>
                    </div>
                    {
                        exchanges.map((crypto) => {
                            return (
                                <div key={crypto} className={style.label}>
                                    <div className={style.market}>
                                        <img src={markets[crypto]} alt="market-icon"></img>
                                        <p>{capitalizeFirstLetter(crypto)}</p>
                                    </div>
                                    <p>${pricesMap[crypto]}</p>
                                </div>
                            );
                        })
                    }
                </Box>
                <Box width='40%'>
                    <h1 className={style.chartTitle}>Last 30 day price history</h1>
                    <Chart data={convertArrayToData(chartData)}/>
                </Box>
            </div>
        </Page>
    );
}

export default Info;