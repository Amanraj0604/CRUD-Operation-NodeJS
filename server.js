//create a http server


const http=require("http");
const getReq=require("./methods/get-requst");
const postReq=require("./methods/post-requst");
const putReq=require("./methods/put-requst");
const deleteReq=require("./methods/delete-requst");
let movies=require("./data/movie.json")

//run on envoirment file
//require("dotenv").config();

//create server port

const PORT=process.env.PORT|| 5001;

//create a server 

const server=http.createServer((req,res)=>{
    //sending a response
    req.movies=movies;
    switch(req.method){
        case "GET":
            getReq(req,res)
            break;
        case "POST":
            postReq(req,res)
            break;
        case "PUT":
            putReq(req,res)
            break;
        case "DELETE":
            deleteReq(req,res)
            break;
        default:
            res.statusCode=404;
            res.setHeader("Content-Type","application/json");
            res.write(JSON.stringify({Title :"Not found",message:"Route not found"}));
             res.end();

    }
         
});
//server as a lisnner
server.listen(PORT,()=>{
     console.log( `server started on port:${PORT}`);
})

