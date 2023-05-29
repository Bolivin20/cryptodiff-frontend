import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const Chart = ({data}) => {

    const values = data.map((item) => item.price);
    const minValue = (Math.min(...values));
    const maxValue = (Math.max(...values));


    return (
        <LineChart width={500} height={300} data={data}>
            <XAxis dataKey="index"/>
            <YAxis domain={[minValue, maxValue]} tickCount={3} width={80}/>>
            <Tooltip/>
            <Legend/>
            <Line dataKey="price" stroke="#8884d8"/>
        </LineChart>
    );
};

export default Chart;
