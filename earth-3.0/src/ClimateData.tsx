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
        const data = {
            labels: ["1984", "1990", "1995", "2000", "2005", "2010", "2015", "2020", "2024"],
            // global temp based on NASA GISS data
            globalTemp: [0.23, 0.41, 0.56, 0.62, 0.70, 0.85, 1.00, 1.12, 1.28],
            // Mauna Loa'sCO₂ ppm，based on NOAA
            co2: [344.24, 354.29, 360.67, 369.64, 379.46, 386.60, 394.60, 402.50, 408.50]
        };

        setChartData({
            labels: data.labels,
            datasets: [
                {
                    label: 'Global Temperature Anomaly (°C)',
                    data: data.globalTemp,
                    borderColor: 'rgba(255,99,132,1)',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    fill: false,
                    yAxisID: 'y1'
                },
                {
                    label: 'CO₂ Concentration (ppm)',
                    data: data.co2,
                    borderColor: 'rgba(54,162,235,1)',
                    backgroundColor: 'rgba(54,162,235,0.2)',
                    fill: false,
                    yAxisID: 'y2'
                }
            ]
        });
    }, []);

    const quote = `"A TV screen clicks through news channels, revealing a stark portrait of our planet in distress. Polar ice caps are melting at unprecedented rates, while raging wildfires consume vast stretches of forest and pollution chokes our urban skies. These images are not the fantasies of science fiction—they are a clear and present warning of the global climate crisis. Every frame is a call to action, urging us to rethink our impact on Earth and embrace a future built on sustainability and renewal."`;

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap'}}>
            <div style={{flex: '1 1 50%', padding: '1rem'}}>
                <div style={{margin: '2rem 0'}}>
                    <h2>Climate Trends (1984–2024)</h2>
                    <Line
                        data={chartData}
                        options={{
                            responsive: true,
                            interaction: {
                                mode: 'index',
                                intersect: false,
                            },
                            scales: {
                                y1: {
                                    type: 'linear',
                                    position: 'left',
                                    title: {
                                        display: true,
                                        text: 'Temperature Anomaly (°C)'
                                    },
                                },
                                y2: {
                                    type: 'linear',
                                    position: 'right',
                                    title: {
                                        display: true,
                                        text: 'CO₂ (ppm)'
                                    },
                                    grid: {
                                        drawOnChartArea: false,
                                    },
                                },
                            },
                        }}
                    />
                </div>
            </div>
            <div style={{flex: '1 1 50%', padding: '1rem', borderLeft: '1px solid #ccc'}}>
                <blockquote style={{fontStyle: 'italic', color: '#ffffff', fontSize: '1.2rem'}}>
                    {quote}
                </blockquote>
            </div>
        </div>
    );
};

export default ClimateData;
