module.exports = (req, res) => {
let baseUrl=req.url.substring(0,req.url.lastIndexOf("/")+1);
console.log(baseUrl);
let id=req.url.split("/")[3];
const regexV4=new RegExp(/^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/);
console.log(id);
    if (req.url === "/api/movies") {
        res.statusCode=200;
         res.setHeader("Content-Type","application/json");
          res.write(JSON.stringify(req.movies));
          res.end();

    }
    else if(!regexV4.test(id))
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
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");

        let fillteredMovie=req.movies.filter((movie)=>{
            return movie.id===id;
        });

        if(fillteredMovie.length>0)
        {
            res.statusCode=200;
            res.write(JSON.stringify(fillteredMovie));
            res.end();
        }
        else{
            res.statusCode=404;
            res.end(JSON.stringify({Title :"Not found",message:"Movie not found"}));
            res.end();
        }
       

    }
    else{
        res.writeHead(404,{"Content-Type":"application/json"});
        res.end(JSON.stringify({Title :"Not found",message:"Route not found"}));
    }
};