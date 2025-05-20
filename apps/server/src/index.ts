import express from "express"
import cors from "cors"


const app=express();

app.use(express.json());

app.use(cors())


app.get("/health_check",(req,res)=>{
    res.send("Server Started")
})



app.listen(8080,()=>{
    console.log("server started at port 8080");
});

