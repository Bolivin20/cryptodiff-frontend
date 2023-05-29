import React, {useState, useEffect} from 'react';
import style from './CryptoLabel.module.css';
import EmptyStar from '../../images/empty_star.svg';
import FilledStar from '../../images/filled_star.svg';
import Binance from '../../images/Binance.svg';
import Huobi from '../../images/Huobi.svg';
import Bitstamp from '../../images/Bitstamp.svg';
import Arrow from '../../images/Arrow.svg';
import {useNavigate} from 'react-router-dom';

const markets = {
    bitstamp: Bitstamp,
    huobi: Huobi,
    binance: Binance,
};

function CryptoLabel(props) {
    const {subs, symbol, pricesMap} = props;
    const [showPrices, setShowPrices] = useState(false);
    const [starClicked, setStarClicked] = useState(false);
    const [jwtToken, setJwtToken] = useState('');
    const navigate = useNavigate();
    const exchanges = Object.keys(pricesMap);
    const prices = Object.values(pricesMap);

     useEffect(() => {
         const jwtToken = localStorage.getItem('token');
         setJwtToken(jwtToken);
         if (subs.includes(symbol)) {
            setStarClicked(true);
        }
        else
        {
            setStarClicked(false);
        }
     }, [symbol, subs]);

     const handleStarClick = () => {
      if (!jwtToken) {
        navigate('/api/auth/authenticate');
        return;
      }
    
      setStarClicked(!starClicked);
      if (!starClicked) {
        const requestData = {
          symbol: symbol,
        };
        fetch('http://localhost:8080/user/api/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`, 
          },
          body: JSON.stringify(requestData),
        })
          .then((response) => {
            if (response.ok) {
              console.log('Symbol dodany pomyślnie.');
            } else {
              console.log('Wystąpił błąd podczas dodawania symbolu.');
              console.log(response);
            }
          })
          .catch((error) => {
            console.log('Wystąpił błąd podczas wysyłania żądania.');
            console.log(error);
          });
      } else {
        fetch('http://localhost:8080/user/api/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({ symbol: symbol }),
        })
          .then((response) => {
            if (response.ok) {
              console.log('Subskrypcja usunięta pomyślnie.');
            } else {
              console.log('Wystąpił błąd podczas usuwania subskrypcji.');
              console.log(symbol);
            }
          })
          .catch((error) => {
            console.log('Wystąpił błąd podczas wysyłania żądania.');
            console.log(error);
          });
      }
    };

    const capitalizeFirstLetter = (string) => {
        return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
    };

    const handleArrowClick = () => {
        setShowPrices(!showPrices);
        console.log(exchanges);
        console.log(prices);
    };

    const handleRedirection = () => {
        navigate(`/info/${symbol}`, {state: {pricesMap}});
    };

    return (
        <div className={style.marketContainer}>
            <div className={style.label}>
                <img
                    src={starClicked ? FilledStar : EmptyStar}
                    alt="star-icon"
                    onClick={handleStarClick}
                />
                <p onClick={handleRedirection} className={style.symbol}>{symbol.toUpperCase()}</p>
                <div className={style.market}>
                    <img src={markets[exchanges[0]]} alt="market-icon"/>
                    <p>{capitalizeFirstLetter(exchanges[0])}</p>
                </div>
                <p>${prices[0]}</p>
                <img
                    src={Arrow}
                    alt="arrow-icon"
                    className={showPrices ? style.arrowRotated : ''}
                    onClick={handleArrowClick}
                />
            </div>
            {showPrices && (
                <div>
                    {exchanges.slice(1).map((e) => (
                        <div className={style.label} key={e}>
                            <div className={style.market}>
                                <img src={markets[e]} alt="market-icon"/>
                                <p>{capitalizeFirstLetter(e)}</p>
                            </div>
                            <p>${pricesMap[e]}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CryptoLabel;
