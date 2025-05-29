const express = require('express')
const bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const port = 3000;

const mongoose = require('mongoose');//calling mongodb module
mongoose.connect("mongodb+srv://sahithyamavuluri:lFTcBpiYJHoQFggj@todoapp.rrldzay.mongodb.net/ToDo")//todo database name
//schema--structure,new keyword--it allocate a specific space in a memory
.then(() => console.log("Connected to Mongodb"))
.catch(err => console.err("Mongodb connection error:", err));
const trySchema = new mongoose.Schema({ name: String });//create a schema
const Item = mongoose.model("Task", trySchema);//create collection name for db
//inserting data
const todo = new Item({ name: "Sadhana" });
// todo.save();
app.get("/", (_, res) => {
    Item.find({})
        .then(foundItems => {
            res.render("list", { ejes: foundItems });
        }).catch(err => {
            console.log(err);
            res.status(500).send("Something went wrong");
        });

});

app.post("/", (req, res) => {
    const ItemName = req.body.ele1;
    const todo = new Item({ name: ItemName });
    todo.save();
    res.redirect("/");
});
app.post("/delete",async (req,res) => {
    const check = req.body.checkbox1;
    try{
        await Item.findByIdAndDelete(check);
        console.log("Deleted item with id", check);
        res.redirect("/")}
        catch(err){
            console.error("error deleting item", err);
            res.status(500).send("error deleting item");
        }
});
 
app.listen(port, () => {
    console.log(`Server started on port http://localhost:3000`);
});