const BASE_AI_URL = "https://autoreadme-api.online/ai";

const getAIOutput = async (filename : any, instrfilepath: any)=>{
    try{
        const response = await fetch(`${BASE_AI_URL}/askAI?filename=${encodeURIComponent(filename)}&
        instrfile=${encodeURIComponent(instrfilepath)}`,{
            method: 'GET'
            })
        
        if (!response.ok || !response.body) {
            throw new Error("Failed to fetch the stream.");
        }
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
      
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
      
          // Decode the chunked response and process it
          const chunk = decoder.decode(value, { stream: true });
          return chunk;
        }
        console.log('streaming complete');
    }
    catch(err) {console.error(err);}
}

export {getAIOutput};