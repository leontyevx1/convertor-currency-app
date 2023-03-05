import React, {useEffect, useState} from 'react';
import {BlockFrom} from './components/BlockFrom';
import './index.scss';
import {BlockTo} from "./components/BlockTo";
import axios from "axios";

const App = () => {
    const [rates, setRates] = useState({});
    const [toCurrency, setToCurrency] = useState('RUB');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toAmount, setToAmount] = useState(1);

    useEffect(() => {
        const instance = axios.create({
            withCredentials: true,
            baseURL: 'https://api.apilayer.com/fixer/',
            headers: {
                'apikey': 'eHBaLRjqlxibXrdOW3y76dVbenUjIYkI'
            }
        });

        instance.get(`convert?to=${toCurrency}&from=${fromCurrency}&amount=${toAmount}`)
            .then(response => {
                setRates(response.data.result)
            })
            .catch(err => {
                console.log(err)
                alert('Ошибка при запросе валюты!')
            })
    });

    const onChangeToPrice = (value) => {
        setToAmount(value)
    }

    return (
        <div className="App">
            <BlockFrom value={toAmount}
                       currency={fromCurrency}
                       onChangeCurrency={setFromCurrency}
                       onChangeValue={onChangeToPrice}/>
            <BlockTo value={rates.toFixed(3)}
                     currency={toCurrency}
                     onChangeCurrency={setToCurrency}/>
        </div>
    );
};

export default App;
