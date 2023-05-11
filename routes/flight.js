var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload=require('./multer');
var fs=require('fs')


/* GET home page. */
router.get('/displaybyid', function(req, res, next) {

  pool.query('select F.*,(select  S.statename from states S where S.stateid=F.destinationstateid) as ds,(select  S.statename from states S where S.stateid=F.sourcestateid) as ss,(select  C.cityname from city C where C.cityid=F.sourcecityid) as sc,(select  C.cityname from city C where C.cityid=F.destinationcityid) as dc from flights F where F.flightid=? ',[req.query.flightid],function(error,result){

    // 500 is internal error whereas 200 is success 
    if(error){
      console.log(error)
      res.render('displaybyflightid',{data:[],msg:''})
    }
    else{
      console.log(result)
      res.render('displaybyflightid',{data:result[0],msg:''})
    }
  })

  
})

router.get('/displayall', function(req, res, next) {

  // The Below query will display the databse 
  pool.query('select F.*,(select  C.cityname from city C where C.cityid=F.sourcecityid) as sc,(select  C.cityname from city C where C.cityid=F.destinationcityid) as dc from flights F ',function(error,result){

    // 500 is internal error whereas 200 is success 
    if(error){
      res.render('displayall',{data:[]})
    }
    else{
      res.render('displayall',{data:result})
    }
  res.render('displayall');
})
});



router.get('/addnewflights', function(req, res, next) {
  res.render('flightinterface',{msg:''});
});


router.get('/fetchallstates',function(req,res){

  pool.query('select * from states',function(error,result){

    // 500 is internal error whereas 200 is success 
    if(error){
     res.status(500).json([]) 
    }
    else{
      res.status(200).json(result)
    }
  })
})

router.get('/fetchallcity',function(req,res){

  pool.query('select * from city where stateid=?',[req.query.stateid],function(error,result){

    // 500 is internal error whereas 200 is success 
    if(error){
     res.status(500).json([]) 
    }
    else{
      res.status(200).json(result)
    }
  })
})

router.get('/fetchalldesstates',function(req,res){

  pool.query('select * from states',function(error,result){

    // 500 is internal error whereas 200 is success 
    if(error){
     res.status(500).json([]) 
    }
    else{
      res.status(200).json(result)
    }
  })
})

router.get('/fetchalldescity',function(req,res){

  pool.query('select * from city where stateid=?',[req.query.stateid],function(error,result){

    // 500 is internal error whereas 200 is success 
    if(error){
     res.status(500).json([]) 
    }
    else{
      res.status(200).json(result)
    }
  })
})
router.post("/AddNewRecord",upload.single('logo'),function(req,res){
console.log("Body: ",req.body) //body alag jayegi before using multipart we were having logo but now we don't need it becuase multipart will send file seprately
console.log("File",req.file) //file alag jayegi
  //console.log(req.body) //it will show all the content that is being filled in the form

// res.render("flightinterface")
// console.log("succesful")
  var fclass
  if(Array.isArray(req.body.fclass))
  fclass=req.body.fclass.join('#')
  else
  fclass=req.body.fclass

// Since The Checkbox can take multiple value (as String) or single value (as Array) therefore it's neccessary to apply this condition. Also, isArray is a JavaScript Function
 
  var days
  if(Array.isArray(req.body.days))
  days=req.body.days.join('#')
  else
  days=req.body.days


  // The Infinte loading your were getting was because of syntax error which was *** pool.query="" instead of pool.query("")  ***
 pool.query("insert into flights(flightid,companyname,sourcestateid,sourcecityid,destinationstateid,destinationcityid,status,flightclass,sourcetiming,destinationtiming,days,logo)values(?,?,?,?,?,?,?,?,?,?,?,?)",
  [req.body.flightid,
  req.body.companyname,
  req.body.sourcestate,
  req.body.sourcecity,
  req.body.desstate,
  req.body.descity,
  req.body.Status,
  fclass,
  req.body.sourcetime,
  req.body.destinationtime,
  days,
  req.file.originalname],function(error,result){

if(error){ 
  console.log("xxxxxxxxxxxxx",error)
  res.render("flightinterface",{msg: 'Server Error'})
}

else if(result){
 // console.log(error) 
  res.render("flightinterface",{msg: 'Record Submitted Succesfuly '})
}


  })
})


router.post("/EditDeleteRecord",function(req,res){

  if(req.body.btn=='edit'){
  //console.log("Body: ",req.body) //body alag jayegi before using multipart we were having logo but now we don't need it becuase multipart will send file seprately
  //console.log("File",req.file) //file alag jayegi
    //console.log(req.body) //it will show all the content that is being filled in the form
  
  // res.render("flightinterface")
  // console.log("succesful")
    var fclass
    if(Array.isArray(req.body.fclass))
    fclass=req.body.fclass.join('#')
    else
    fclass=req.body.fclass
  
  // Since The Checkbox can take multiple value (as String) or single value (as Array) therefore it's neccessary to apply this condition. Also, isArray is a JavaScript Function
   
    var days
    if(Array.isArray(req.body.days))
    days=req.body.days.join('#')
    else
    days=req.body.days
  
  
    // The Infinte loading your were getting was because of syntax error which was *** pool.query="" instead of pool.query("")  ***
   pool.query("update flights set companyname=?,sourcestateid=?,sourcecityid=?,destinationstateid=?,destinationcityid=?,status=?,flightclass=?,sourcetiming=?,destinationtiming=?,days=? where flightid=?",
    [
    req.body.companyname,
    req.body.sourcestate,
    req.body.sourcecity,
    req.body.desstate,
    req.body.descity,
    req.body.Status,
    fclass,
    req.body.sourcetime,
    req.body.destinationtime,
    days,
    req.body.flightid],function(error,result){
  
  if(error){ 
    console.log("xxxxxxxxxxxxx",error)
    res.redirect('/flight/displayall')
  }
  
  else if(result){
   // console.log(error) 
   res.redirect('/flight/displayall') 
  }
  
    })
  }

  else{
    pool.query("delete from flights where flightid=?",[req.body.flightid],function(error,result){

      if(error){ 
        console.log("xxxxxxxxxxxxx",error)
        res.redirect('/flight/displayall')
      }
      
      else if(result){
       // console.log(error) 
       res.redirect('/flight/displayall') 
      }
    })

  }
  })

//For changing and updating the logo
  router.get('/showpicture',function(req,res){
  //  console.log(req.query.logo)
  res.render('showpicture',{flightid:req.query.flightid,companyname: req.query.companyname,logo: req.query.logo})
  })

router.post("/editpicture",upload.single('logo'),function(req,res){

pool.query("update flights set logo=? where flightid=?",[req.file.originalname,req.body.flightid],function(error,result){
  if(error){ 
    //  console.log("xxxxxxxxxxxxx",error)
    res.redirect('/flight/displayall')
  }
  else if(result){
   // console.log(error) 
  //  fs.unlinkSync("f:/flightenquiry/public/images/"+req.query.oldlogo)
   res.redirect('/flight/displayall') 
  }
})
})



module.exports = router;


// "delete from flights where flightid=?",[req.body.flightid]