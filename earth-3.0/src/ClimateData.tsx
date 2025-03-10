import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, ChartData, registerables } from 'chart.js';
Chart.register(...registerables);

const ClimateData: React.FC = () => {
    const [chartData, setChartData] = useState<ChartData<'line'>>({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        // temp and CO2
        const fetchData = async () => {
            const data = {
                labels: ['2000', '2005', '2010', '2015', '2020'],
                globalTemp: [14.3, 14.5, 14.7, 14.9, 15.1],
                co2: [370, 380, 390, 400, 410]
            };

            setChartData({
                labels: data.labels,
                datasets: [
                    {
                        label: 'Global Temperature (°C)',
                        data: data.globalTemp,
                        borderColor: 'rgba(255,99,132,1)',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        fill: false,
                    },
                    {
                        label: 'CO2 Concentration (ppm)',
                        data: data.co2,
                        borderColor: 'rgba(54,162,235,1)',
                        backgroundColor: 'rgba(54,162,235,0.2)',
                        fill: false,
                    }
                ]
            });
        };

        fetchData();
    }, []);

    return (
        <div style={{ margin: '2rem 0' }}>
            <h2>Climate Trends</h2>
            <Line data={chartData} />
        </div>
    );
};

export default ClimateData;
