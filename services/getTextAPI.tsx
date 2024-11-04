const BASE_URL = "https://api.autoreadme.online";
const getContextFile = async (filename : any)=>{
    try{
        const response = await fetch(`${BASE_URL}/context-file?view=${encodeURIComponent(filename)}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            })
        if (response.ok) {
            console.log('Content received!');
            const text = await response.text();
            return text;
        }
        else console.error('error with getting context file');
    }
    catch(err) {console.error(err);}
}

export {getContextFile};