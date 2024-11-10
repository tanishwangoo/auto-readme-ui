const BASE_SETUP_URL = "https://autoreadme-api.online/setup";
const localhostURL = "http://localhost:5000/setup";
const sendDatatest = async (payload : any)=>{
    try{
        const response = await fetch(`${BASE_SETUP_URL}/sendconfig`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
            })
        if (response.ok) {
            const data = await response.json();
            console.log(data['message']);
        }
        else console.error('error with config payload');
    }
    catch(err) {console.error(err);}
}

const ValidateAndSend = async (payload : any) =>{
    try {
        const response  = await fetch(`${localhostURL}/check-valid-config`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        if (response.ok) {
            const data = await response.json();
            console.log(data['message']);
            sendDatatest(payload);
        }
        else{
            console.error('Payload Validation failed')
        }
    }
    catch(err) {console.error(err);}
} 

const SendInstruction = async (instructiondata : string) =>{
    const payload = JSON.stringify({'instruction-content' : instructiondata})
    try {
        const response  = await fetch(`${localhostURL}/send-instruction`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: payload
        })
        if (response.ok) {
            const data = await response.json();
            console.log(data['message']);
        }
        else{
            console.error('Payload Validation failed')
        }
    }
    catch(err) {console.error(err);}
} 


const StartRepoJob = async (gitURL : string) =>{
    const payload = JSON.stringify({'git-url' : gitURL})
    try {
        const response  = await fetch(`${localhostURL}/send-url`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: payload
        })
        if (response.ok) {
            const data = await response.json();
            console.log(data['message']);
        }
        else{
            console.error('Enter valid Github URL please!')
        }
    }
    catch(err) {console.error(err);}
} 
export {SendInstruction, ValidateAndSend, StartRepoJob};

