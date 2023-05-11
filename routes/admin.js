var express = require('express');
var router = express.Router();
var pool=require("./pool")

/* GET users listing. */
router.get('/adminlogin', function(req, res, next) {
  res.render ('loginflight');
});

router.post('/checkadminlogin', function(req, res, next) {
    
    pool.query("select * from admins where (emailid=? or mobileno=?) and password =?",[req.body.userid,req.body.userid,req.body.password],function(error,result){

        if(error){
            res.render("loginflight",{msg:"SERVER ERROR...."})
        }
        else{
            if(result.length==1){ //if userid and password then the match will be equal to one
                res.render("Dashboard")
            }
            else{
                res.render("loginflight",{msg:"Invalid UserID/Password...."})
            }
        }
    })



  });
  
module.exports = router;