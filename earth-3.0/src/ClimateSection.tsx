import { FC, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, ChartData, registerables } from 'chart.js';
Chart.register(...registerables);

interface ClimateFact {
    title: string;
    content: string;
    referenceLink?: string;
    imageUrl?: string;
}

// Climate facts data
const climateSection: ClimateFact[] = [
    {
        title: "Polar Ice Cap Melting",
        content:
            "Arctic sea ice extent has been declining by about 12% per decade since 1979. Recent data shows that the Arctic's summer minimum is among the lowest on record, contributing to rising sea levels.",
        referenceLink: "https://climate.nasa.gov/vital-signs/arctic-sea-ice/",
        imageUrl:
            "https://news.harvard.edu/wp-content/uploads/2021/09/iStock-antarctica-anyaberkut.jpg",
    },
    {
        title: "Wildfires on the Rise",
        content:
            "Wildfires have become more frequent and intense. Satellite records indicate that extreme wildfire events have more than doubled over the past few decades, driven by prolonged droughts and higher temperatures.",
        referenceLink: "https://www.globalchange.gov/browse/indicators/us-wildfires",
        imageUrl:
            "https://news.harvard.edu/wp-content/uploads/2021/09/iStock-antarctica-anyaberkut.jpg",
    },
    {
        title: "Ocean Acidification",
        content:
            "With CO₂ levels increasing, the oceans absorb a significant portion, leading to a drop in pH. Since the Industrial Revolution, ocean acidity has increased by about 26%, impacting coral reefs and marine life.",
        referenceLink: "https://www.noaa.gov/education/resource-collections/ocean-coasts/ocean-acidification",
        imageUrl:
            "https://news.harvard.edu/wp-content/uploads/2021/09/iStock-antarctica-anyaberkut.jpg",
    },
    {
        title: "Extreme Weather Events",
        content:
            "Extreme events such as heatwaves, heavy rainfall, and storms are on the rise. Studies show that human-induced warming is strongly linked to increased frequency and intensity of such events.",
        referenceLink: "https://www.ipcc.ch/report/ar6/wg1/",
        imageUrl:
            "https://news.harvard.edu/wp-content/uploads/2021/09/iStock-antarctica-anyaberkut.jpg",
    },
];

// Climate data quote
const quote = `"A TV screen clicks through news channels, revealing a stark portrait of our planet in distress. Polar ice caps are melting at unprecedented rates, while raging wildfires consume vast stretches of forest and pollution chokes our urban skies. These images are not the fantasies of science fiction—they are a clear and present warning of the global climate crisis. Every frame is a call to action, urging us to rethink our impact on Earth and embrace a future built on sustainability and renewal."`;

// Integrated Climate Section Component
const ClimateSection: FC = () => {
    const [chartData, setChartData] = useState<ChartData<'line'>>({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        const data = {
            labels: ["1984", "1990", "1995", "2000", "2005", "2010", "2015", "2020", "2024"],
            // global temp based on NASA GISS data
            globalTemp: [0.23, 0.41, 0.56, 0.62, 0.70, 0.85, 1.00, 1.12, 1.28],
            // Mauna Loa's CO₂ ppm, based on NOAA
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

    return (
        <div
            style={{
                maxWidth: "1400px",
                margin: "0 auto",
                padding: "2rem 0",
                color: "#fff"
            }}
        >
            {/* Section Header with Animated Background */}
            <div
                style={{
                    position: "relative",
                    padding: "3rem 2rem",
                    marginBottom: "3rem",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, rgba(20, 30, 48, 0.95), rgba(36, 59, 85, 0.8))",
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
                    textAlign: "center"
                }}
            >
                {/* Background Animation (CSS would handle the actual animation) */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: 0.2,
                        zIndex: 0,
                        backgroundImage: "url(https://news.harvard.edu/wp-content/uploads/2021/09/iStock-antarctica-anyaberkut.jpg)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "blur(5px)"
                    }}
                />

                <h1
                    style={{
                        fontSize: "3.5rem",
                        position: "relative",
                        zIndex: 1,
                        margin: "0 0 1rem 0",
                        background: "linear-gradient(90deg, #4ca5ff, #1da1f2, #4ca5ff)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundSize: "200% auto",
                        fontWeight: 700
                    }}
                >
                    Our Planet in Data
                </h1>

                <p
                    style={{
                        fontSize: "1.2rem",
                        maxWidth: "800px",
                        margin: "0 auto",
                        position: "relative",
                        zIndex: 1,
                        lineHeight: 1.6
                    }}
                >
                    Tracking climate change through scientific data and observed impacts.
                    The evidence is clear: our planet is warming, and human activities are the primary cause.
                </p>
            </div>

            {/* Climate Data Chart & Quote Section */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "3rem",
                    marginBottom: "4rem",
                    background: "rgba(15, 23, 42, 0.5)",
                    borderRadius: "12px",
                    padding: "2rem",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)"
                }}
            >
                <h2
                    style={{
                        fontSize: "2rem",
                        margin: "0 0 1rem 0",
                        color: "#4ca5ff",
                        textAlign: "center"
                    }}
                >
                    40 Years of Climate Trends (1984–2024)
                </h2>

                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: "2rem"
                    }}
                >
                    {/* Chart Column */}
                    <div
                        style={{
                            flex: "1 1 500px",
                            minHeight: "300px",
                            padding: "1rem",
                            background: "rgba(255, 255, 255, 0.05)",
                            borderRadius: "8px"
                        }}
                    >
                        <Line
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
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
                                            text: 'Temperature Anomaly (°C)',
                                            color: "rgba(255, 255, 255, 0.8)"
                                        },
                                        grid: {
                                            color: "rgba(255, 255, 255, 0.1)"
                                        },
                                        ticks: {
                                            color: "rgba(255, 255, 255, 0.7)"
                                        }
                                    },
                                    y2: {
                                        type: 'linear',
                                        position: 'right',
                                        title: {
                                            display: true,
                                            text: 'CO₂ (ppm)',
                                            color: "rgba(255, 255, 255, 0.8)"
                                        },
                                        grid: {
                                            drawOnChartArea: false,
                                            color: "rgba(255, 255, 255, 0.1)"
                                        },
                                        ticks: {
                                            color: "rgba(255, 255, 255, 0.7)"
                                        }
                                    },
                                    x: {
                                        grid: {
                                            color: "rgba(255, 255, 255, 0.1)"
                                        },
                                        ticks: {
                                            color: "rgba(255, 255, 255, 0.7)"
                                        }
                                    }
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: "rgba(255, 255, 255, 0.9)"
                                        }
                                    }
                                }
                            }}
                        />
                    </div>

                    {/* Quote Column */}
                    <div
                        style={{
                            flex: "1 1 400px",
                            padding: "2rem",
                            background: "rgba(76, 165, 255, 0.1)",
                            borderRadius: "8px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center"
                        }}
                    >
                        <blockquote
                            style={{
                                fontStyle: "italic",
                                color: "#ffffff",
                                fontSize: "1.1rem",
                                lineHeight: 1.8,
                                position: "relative",
                                padding: "0 1.5rem"
                            }}
                        >
                            <span
                                style={{
                                    fontSize: "4rem",
                                    position: "absolute",
                                    left: "-0.5rem",
                                    top: "-1.5rem",
                                    color: "rgba(76, 165, 255, 0.5)"
                                }}
                            >
                                "
                            </span>
                            {quote.substring(1, quote.length - 1)}
                            <span
                                style={{
                                    fontSize: "4rem",
                                    position: "absolute",
                                    right: "-0.5rem",
                                    bottom: "-2.5rem",
                                    color: "rgba(76, 165, 255, 0.5)"
                                }}
                            >
                                "
                            </span>
                        </blockquote>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                marginTop: "1rem",
                                paddingRight: "1rem"
                            }}
                        >
                            <div
                                style={{
                                    height: "2px",
                                    width: "40px",
                                    backgroundColor: "#4ca5ff",
                                    marginRight: "0.5rem",
                                    marginTop: "0.7rem"
                                }}
                            />
                            <span
                                style={{
                                    color: "#4ca5ff",
                                    fontWeight: "bold"
                                }}
                            >
                                Earth3.0 Synopsis
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Climate Facts Cards */}
            <div
                style={{
                    marginBottom: "2rem"
                }}
            >
                <h2
                    style={{
                        fontSize: "2rem",
                        margin: "0 0 2rem 0",
                        color: "#4ca5ff",
                        textAlign: "center"
                    }}
                >
                    Key Climate Change Impacts
                </h2>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "2rem"
                    }}
                >
                    {climateSection.map((fact, index) => (
                        <div
                            key={index}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                backgroundColor: "rgba(15, 23, 42, 0.6)",
                                borderRadius: "10px",
                                overflow: "hidden",
                                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            {/* Image Section */}
                            {fact.imageUrl && (
                                <div
                                    style={{
                                        height: "180px",
                                        position: "relative",
                                        overflow: "hidden"
                                    }}
                                >
                                    <img
                                        src={fact.imageUrl}
                                        alt={fact.title}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            transition: "transform 0.5s ease"
                                        }}
                                    />
                                    <div
                                        style={{
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            background: "linear-gradient(to top, rgba(15, 23, 42, 1), transparent)",
                                            height: "50%"
                                        }}
                                    />
                                </div>
                            )}

                            {/* Content Section */}
                            <div
                                style={{
                                    padding: "1.5rem",
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column"
                                }}
                            >
                                <h3
                                    style={{
                                        fontSize: "1.3rem",
                                        marginTop: 0,
                                        marginBottom: "0.75rem",
                                        color: "#4ca5ff"
                                    }}
                                >
                                    {fact.title}
                                </h3>

                                <p
                                    style={{
                                        fontSize: "0.95rem",
                                        lineHeight: 1.6,
                                        marginBottom: "1.5rem",
                                        color: "rgba(255, 255, 255, 0.85)",
                                        flex: 1
                                    }}
                                >
                                    {fact.content}
                                </p>

                                {fact.referenceLink && (
                                    <a
                                        href={fact.referenceLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            padding: "0.4rem 0.8rem",
                                            backgroundColor: "rgba(76, 165, 255, 0.15)",
                                            color: "#4ca5ff",
                                            borderRadius: "4px",
                                            textDecoration: "none",
                                            fontSize: "0.85rem",
                                            fontWeight: "bold",
                                            transition: "background-color 0.3s ease",
                                            alignSelf: "flex-start"
                                        }}
                                    >
                                        <span>View Source</span>
                                        <span style={{ marginLeft: "0.3rem" }}>→</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Call to Action */}
            <div
                style={{
                    textAlign: "center",
                    marginTop: "4rem",
                    padding: "3rem 2rem",
                    background: "linear-gradient(135deg, rgba(76, 165, 255, 0.1), rgba(29, 161, 242, 0.2))",
                    borderRadius: "12px"
                }}
            >
                <h2
                    style={{
                        fontSize: "2.2rem",
                        margin: "0 0 1.5rem 0",
                        color: "#ffffff"
                    }}
                >
                    Join Earth3.0 in Making a Difference
                </h2>

                <p
                    style={{
                        fontSize: "1.1rem",
                        maxWidth: "700px",
                        margin: "0 auto 2rem",
                        color: "rgba(255, 255, 255, 0.9)",
                        lineHeight: 1.7
                    }}
                >
                    The time for action is now. Explore our episodes to learn more about climate solutions and how you can contribute to a sustainable future.
                </p>

                <a
                    href="/episodes"
                    style={{
                        display: "inline-block",
                        padding: "0.8rem 2rem",
                        backgroundColor: "#4ca5ff",
                        color: "#ffffff",
                        borderRadius: "6px",
                        textDecoration: "none",
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        transition: "background-color 0.3s ease, transform 0.3s ease",
                        boxShadow: "0 4px 15px rgba(76, 165, 255, 0.3)"
                    }}
                >
                    Watch Episodes
                </a>
            </div>
        </div>
    );
};

export default ClimateSection;