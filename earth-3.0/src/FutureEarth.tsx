import ClimateData from './ClimateData';

const FutureEarth = () => {
    const quote = `"A TV screen clicks through news channels, revealing a stark portrait of our planet in distress. Polar ice caps are melting at unprecedented rates, while raging wildfires consume vast stretches of forest and pollution chokes our urban skies. These images are not the fantasies of science fiction—they are a clear and present warning of the global climate crisis. Every frame is a call to action, urging us to rethink our impact on Earth and embrace a future built on sustainability and renewal."`;

    return (
        <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap'
        }}>
            <div style={{ flex: '1 1 50%', padding: '1rem' }}>
                <ClimateData />
            </div>
            <div style={{ flex: '1 1 50%', padding: '1rem', borderLeft: '1px solid #ccc' }}>
                <blockquote style={{
                    fontStyle: 'italic',
                    color: '#ffffff',
                    fontSize: '1.2rem',
                    marginBottom: '1rem',
                    textAlign: 'left'
                }}>
                    {quote}
                </blockquote>
            </div>
        </div>
    );
};

export default FutureEarth;
