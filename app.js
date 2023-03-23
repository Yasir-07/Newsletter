const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const data ={
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    const JSONData = JSON.stringify(data);
    const url = "https://us14.api.mailchimp.com/3.0/lists/aa6af4b905";
    const options ={
        method: "POST",
        auth: "yasir:9987be00e743239b84874094358c0321-us14"
    }
    const request = https.request(url, options, function(response){
        if(response.statusCode == 200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data", function(data){

            console.log(JSON.parse(data));
        })
    })
    // request.write(JSONData);
    request.end();
})

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(process.env.PORT ||3000, function(){
    console.log("Server is running on port 3000");
})

// apikey
// 9987be00e743239b84874094358c0321-us14
// aa6af4b905