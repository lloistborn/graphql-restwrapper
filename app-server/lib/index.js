import person from "./person.json";
import express from "express";

const app = express();
app.set("port", (process.env.PORT || 5000));

app.get("/people", function(request, response, next) {
    response.send({ "people": person });    
});

app.get("/people/:id", function(request, response) {
    let personId = request.params.id;
    response.send({ 
        "people": person.filter(p => p.id == personId) 
    });
});

app.listen(app.get("port"), function () {
    console.log("server listening on port:", app.get("port"));
});