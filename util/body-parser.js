module.exports=async(request)=>
{
    return new Promise((resolve,reject)=>{
      try{  
        //creating event for get the streem of data. 
            let body="";
            request.on("data",(chunk)=>{
                body+=chunk;
            });
            request.on("end",()=>{
                resolve(JSON.parse(body));
            });
        }
        catch(err){
            console.log(err);
            reject(err);
        }
    });
};