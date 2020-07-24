
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req, res){

    const firstName = req.body;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    
    const jsonData = JSON.stringify(data);

    const url ="https://us17.api.mailchimp.com/3.0/lists/87a1f86648";

    const option = {
        method: "POST",
        auth: "kami1:9d46351c75f7b2a10ebff1241337ee8c-us17"
    }

const request = https.request(url, Option, function(response){

if (response.statusCode ===200){
    res.sendFile(__dirname +"/succes.html");
} else{
    res.sendFile(__dirname + "/failure.html");
}

    response.on("data", function(data){
        console.log(JSON.parse(data));
    })

})

request.write(jsonData);
request.end();

});


app.post("failure", function(req, res){
    res.redirect("/");
})


app.listen(8080, function(){
    console.log("Server Started");
});

//API KEY
//9d46351c75f7b2a10ebff1241337ee8c-us17

// list id
//87a1f86648