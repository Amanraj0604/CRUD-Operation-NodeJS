const { log } = require("console");
const requstBodyPaeser = require("../util/body-parser");
const writeToFile=require("../util/write-to-fle");

const crypto = require("crypto");//it is use to gentarte the User Id
module.exports = async (req, res) => {

    if (req.url === "/api/movies") {
        try {
            let body = await requstBodyPaeser(req);
            // console.log("Request-body",body);
            body.id = crypto.randomUUID();
            req.movies.push(body);
            writeToFile(req.movies);
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end();
        } catch (err) {
            console.log(err);
            res.writeHead(400, { "Content-Type": "application/json" });

            res.end(
                JSON.stringify({
                    Title: "Validation Failed",
                    message: "Requst Body is not valid"
                })
            );

        }
    }
    else{
        res.writeHead(404,{"Content-Type":"application/json"});
        res.end(JSON.stringify({Title :"Not found",message:"Route not found"}));
    }
};