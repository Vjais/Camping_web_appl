var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");

//campground routes
router.get("/",function(req,res){
    //get all campgrounds from db
    Campground.find({},function(err, allCampgrounds){
     if(err){
         console.log(err);
     }  else{
        res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser:req.user});
     } 
    
    });
});
//Inserting new image url and name in the post and redirecting to campground page
router.post("/",isLoggedIn,function(req,res){
     var name =req.body.name;
     var image =req.body.image;
     var desc=req.body.description;
     
     var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground ={name:name,image:image,description:desc,author:author}
    
     //create a new campground and save to db
     Campground.create(newCampground,function(err,newlyCreated){
         if(err){
         console.log(err);
     }  else{
        res.redirect("/campgrounds");
     } 
     });
    //  campgrounds.push(newCampground);
    //get data from forms and add to array
    //redirect back to campgrounds page
    
});
//routes for form page
router.get("/new",isLoggedIn,function(req,res){
    res.render("campgrounds/new.ejs");
});

//route to show id
router.get("/:id", function(req,res){
    //find campground by id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
         console.log(err);
     }  else{
         console.log(foundCampground);
        res.render("campgrounds/show",{campground:foundCampground});
     } 
    });
});
//edit campground route
router.get("/:id/edit",function(req,res){
    Campground.findById(req.params.id,)
    res.render("campgrounds/edit",{campground:foundCampground});
});

//update campground route
//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
} 
module.exports = router;