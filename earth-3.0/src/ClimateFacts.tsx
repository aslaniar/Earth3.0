import { FC } from 'react';

interface ClimateFact {
    title: string;
    content: string;
    referenceLink?: string;
    imageUrl?: string;
}

const climateFacts: ClimateFact[] = [
    {
        title: "Polar Ice Cap Melting",
        content: "Arctic sea ice extent has been declining by about 12% per decade since 1979. Recent data shows that the Arctic’s summer minimum is among the lowest on record, contributing to rising sea levels.",
        referenceLink: "https://climate.nasa.gov/vital-signs/arctic-sea-ice/",
        imageUrl: "https://news.harvard.edu/wp-content/uploads/2021/09/iStock-antarctica-anyaberkut.jpg"
    },
    {
        title: "Wildfires on the Rise",
        content: "Wildfires have become more frequent and intense. Satellite records indicate that extreme wildfire events have more than doubled over the past few decades, driven by prolonged droughts and higher temperatures.",
        referenceLink: "https://www.globalchange.gov/browse/indicators/us-wildfires",
        imageUrl: "https://example.com/wildfire.jpg"
    },
    {
        title: "Ocean Acidification",
        content: "With CO₂ levels increasing, the oceans absorb a significant portion, leading to a drop in pH. Since the Industrial Revolution, ocean acidity has increased by about 26%, impacting coral reefs and marine life.",
        referenceLink: "https://www.noaa.gov/education/resource-collections/ocean-coasts/ocean-acidification",
        imageUrl: "https://example.com/ocean-acidification.jpg"
    },
    {
        title: "Extreme Weather Events",
        content: "Extreme events such as heatwaves, heavy rainfall, and storms are on the rise. Studies show that human-induced warming is strongly linked to increased frequency and intensity of such events.",
        referenceLink: "https://www.ipcc.ch/report/ar6/wg1/",
        imageUrl: "https://example.com/extreme-weather.jpg"
    }
];

const ClimateFacts: FC = () => {
    return (
        <div style={{
            backgroundColor: "#282828",
            color: "#fff",
            padding: "1rem",
            borderRadius: "8px",
            marginTop: "1.5rem"
        }}>
            <h3 style={{ marginBottom: "1rem" }}>Climate Facts</h3>
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                {climateFacts.map((fact, index) => (
                    <li key={index} style={{ marginBottom: "1.5rem", display: "flex", gap: "1rem" }}>
                        {fact.imageUrl && (
                            <img
                                src={fact.imageUrl}
                                alt={fact.title}
                                style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
                            />
                        )}
                        <div>
                            <strong>{fact.title}</strong>
                            <p style={{ fontSize: "0.95rem", margin: "0.5rem 0" }}>{fact.content}</p>
                            {fact.referenceLink && (
                                <a
                                    href={fact.referenceLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: "#8dc1ff", fontSize: "0.85rem" }}
                                >
                                    [Learn More]
                                </a>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClimateFacts;
