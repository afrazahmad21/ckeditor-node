const app = require('./app');


app.listen(3010, function (err) {
    if(err){
        console.log("err")
    }else{
        console.log("listening on 3010");
    }
})
