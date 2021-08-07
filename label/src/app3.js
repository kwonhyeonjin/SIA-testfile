import React, { useState, useEffect} from 'react';
import axios from 'axios';

const App = () => {
    const [data, setData] = useState('');
    useEffect(() =>{
        axios.get(https://jsonplaceholder.typicode.com/)
        .then(res => setData(res.data))

    }, []);

    return(
        <div>
            {data && <textarea rows={7} value = {JSON.stringify(data, null, 2)} />}
        </div>
    );
};

export default App;