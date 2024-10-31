
const sendDatatest = async (payload : any)=>{
    try{
        const response = await fetch("http://localhost:5000/setup/sendconfig",{
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
        const response  = await fetch('http://localhost:5000/setup/check-valid-config', {
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
        const response  = await fetch('http://localhost:5000/setup/send-instruction', {
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
        const response  = await fetch('http://localhost:5000/setup/send-url', {
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

