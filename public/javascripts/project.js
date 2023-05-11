// const { json } = require("express/lib/response")

$(document).ready(function(){

    $.getJSON('/flight/fetchallstates',function(data){

      //  alert(JSON.stringify(data)) //this will display json in alert 
        data.map((item)=>{
            $("#sourcestate").append($("<option>").text(item.statename).val(item.stateid))
        })
        $('select').formSelect();
    })

    $("#sourcestate").change(function(){

        $("#sourcecity").empty()
        $("#sourcecity").append($("<option disabled selected>").text('Choose your city'))
        $.getJSON('/flight/fetchallcity',{stateid:$('#sourcestate').val()},function(data){

            //  alert(JSON.stringify(data)) //this will display json in alert 
              data.map((item)=>{
                  $("#sourcecity").append($("<option>").text(item.cityname).val(item.cityid))
              })
              $('select').formSelect();
          })
      
    })

    $.getJSON('/flight/fetchalldesstates',function(data){

        //  alert(JSON.stringify(data)) //this will display json in alert 
          data.map((item)=>{
              $("#desstate").append($("<option>").text(item.statename).val(item.stateid))
          })
          $('select').formSelect();
      })
  
      $("#desstate").change(function(){
  
          $("#descity").empty()
          $("#descity").append($("<option disabled selected>").text('Choose your city'))
          $.getJSON('/flight/fetchalldescity',{stateid:$('#desstate').val()},function(data){
  
              //  alert(JSON.stringify(data)) //this will display json in alert 
                data.map((item)=>{
                    $("#descity").append($("<option>").text(item.cityname).val(item.cityid))
                })
                $('select').formSelect();
            })
        
      })

})