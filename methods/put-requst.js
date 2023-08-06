const requstBodyPaeser = require("../util/body-parser");
const writeToFile=require("../util/write-to-fle");
module.exports = async(req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
    console.log(baseUrl);
    let id = req.url.split("/")[3];
    const regexV4 = new RegExp(/^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/);

    if(!regexV4.test(id))
    {
        res.writeHead(400,{"Content-Type":"application/json"});
        res.end(
            JSON.stringify({
                Title :"Validation Failed",
                message:"UUID is not valid"
            })
        );
    }else if(regexV4.test(id)){
         try{
                let body=await requstBodyPaeser(req);
                const index=req.movies.findIndex((movie)=>{
                    return movie.id===id;
                });
                if(index===-1)
                {
                    res.statusCode=404;
                    res.end(JSON.stringify({Title :"Not found",message:"Movie not found"}));
                    res.end();
                } else{
                    req.movies[index]={id,...body};
                    writeToFile(req.movies);
                    res.writeHead(200,{"Content-Type":"applications.json"});
                    res.end(JSON.stringify(req.movies[index]));
                }

         }catch(err){
            console.log(err);
            res.writeHead(400, { "Content-Type": "application/json" });

            res.end(
                JSON.stringify({
                    Title: "Validation Failed",
                    message: "Requst Body is not valid"
                })
            );
         }
    }else{
        res.writeHead(404,{"Content-Type":"application/json"});
        res.end(JSON.stringify({Title :"Not found",message:"Route not found"}));
    }
};