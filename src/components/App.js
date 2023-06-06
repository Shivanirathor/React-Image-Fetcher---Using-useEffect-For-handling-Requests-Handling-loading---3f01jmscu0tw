import React, { useState } from 'react'
import '../styles/App.css';
import { Loader } from './Loader';
import { PhotoFrame } from './PhotoFrame';

const App = () => {

    const [loader,setLoader] = useState(false);
    const [response,setResponse] = useState({});
    const [num,setNum] = useState("");
    const [init,setInit] = useState(0);
  
    const handleBlur = async (event) =>{
        setNum(event.target.value)

        let id = event.target.value;
        setLoader(true);
        const res = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
        const response = await res.json();
        setResponse(response);
        setLoader(false);
        setInit(100);

    }
    if(loader){
        return <Loader />
    }

    return (
        <>
        <label htmlFor='inp'>Id number </label>
        <input type="number" id='inp' value={num} onChange={handleBlur} />
        <PhotoFrame url={response.url} title={response.title}/>
        </>
    )
}


export default App;
