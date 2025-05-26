import express, { Router } from "express"
import cors from "cors"
import router from "./routes";


const app=express();

app.use(express.json());

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}))


app.get("/health_check",(req,res)=>{
    res.send("Server Started")
})

app.use("/api",router)



app.listen(8080,()=>{
    console.log("server started at port 8080");
});

