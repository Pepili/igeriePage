import React, { useEffect, useState } from 'react';

function Analytics() {
    const [data, setData] = useState({ sessions: 0, pageviews: 0 });

    useEffect(() => {
        async function fetchTrafficData() {
            try {
                const response = await fetch(process.env.REACT_APP_API_URL + 'analytics');
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const data = await response.json();
                console.log(data)
                setData(data);
            } catch (error) {
                console.error('Error fetching traffic data:', error);
            }
        }

        fetchTrafficData();
    }, []);

    return (
        <div>
            <h1>Traffic Data</h1>
            <p>Sessions: {data.sessions}</p>
            <p>Pageviews: {data.pageviews}</p>
        </div>
    );
}

export default Analytics;
