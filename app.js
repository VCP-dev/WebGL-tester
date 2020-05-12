const express = require('express')
const app = express()
const path = require('path')
const compression = require('compression')
const readline = require('readline')
const fs = require('fs')
const indexfile = "index.html";
const loaderfile = "Build/UnityLoader.js";

const port = 3000;      ///  change this according to your required port number

app.use(compression())

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

function initialisation() { 
  console.clear()
  start_position: rl.question("Enter path to game folder:",(folderpath)=>{
    try{
        if(fs.existsSync(folderpath+"/"+indexfile) && fs.existsSync(folderpath+"/"+loaderfile)){
            launch(folderpath)
        }
        else{
            console.log("Invalid folder path...");            
        }
    }catch(err){
        console.log("Error while reading contents of folder");
    }    
  })
}

function launch(pathtofolder)
{
    app.use(express.static(pathtofolder))
    app.get('*',(req,res)=>{
        res.sendFile(__dirname+'/public/error.html')        
    })
    var server = app.listen(port,(err)=>{
        if(err){
            console.log("\x1b[31m","Error while starting server !!!");
        }
        else{
            console.log("Game can be played at localhost:"+port+"\nPress Ctrl c to stop the server\n ")           
        }    
    })    
}

initialisation()
