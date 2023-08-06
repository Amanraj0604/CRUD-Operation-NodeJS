const writeToFle = require("../util/write-to-fle");

module.exports = (req, res) => {
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
    }else if(regexV4.test(id))
    {
        const index=req.movies.findIndex((movie)=>{
            return movie.id===id;
        });
        if(index===-1)
        {
            res.statusCode=404;
            res.end(JSON.stringify({Title :"Not found",message:"Movie not found"}));
            res.end();
        }else{
        req.movies.splice(index,1);
        writeToFle(req.movies);
        res.writeHead(204,{"Content-Type":"application.json"});
        res.end(JSON.stringify(req.movies));
        }
    }else{
        res.writeHead(404,{"Content-Type":"application/json"});
        res.end(JSON.stringify({Title :"Not found",message:"Route not found"}));
    }
};