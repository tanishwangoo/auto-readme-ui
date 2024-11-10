const BASE_URL = "https://autoreadme-api.online";
const localhostURL = "http://localhost:5000";
const getContextFile = async (filename : any)=>{
    try{
        const response = await fetch(`${BASE_URL}/context-file?view=${encodeURIComponent(filename)}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            })
        if (response.ok) {
            console.log('Content JSON received!');
            const textpayload = await response.json();
            return textpayload;
        }
        else console.error('error with getting context JSON');
    }
    catch(err) {console.error(err);}
}

export {getContextFile};