













var express= require('express');
var mongoose=require('mongoose');
var passport=require('passport');
var bodyParser=require('body-parser');
var passportlocal=require('passport-local');
var passportlocalmongoose=require('passport-local-mongoose');

mongoose.connect('mongodb://localhost/myapp');
var schema = new mongoose.Schema({
	name:String,
	age:String,
	username:String,
	email:String
	
});

var schema1=new mongoose.Schema({
	username:String,
	password:String
});

schema1.plugin(passportlocalmongoose);

var ud2= mongoose.model("ud2",schema);
var ud3=mongoose.model("ud3",schema1);

var app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(require("express-session")({

secret:"UDit bshmdsad",
resave:false,
saveUninitialized:false

}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportlocal(ud3.authenticate()));
passport.serializeUser(ud3.serializeUser());
passport.deserializeUser(ud3.deserializeUser())
 
app.use('/assets',express.static('assets'))

app.get("/",function(req,res){
	res.render("home.ejs");
})
app.get("/notfound",function(req,res){
	res.render("notfound.ejs");
})
app.get("/register",function(req,res){
	res.render("register.ejs");
})
app.get("/login",function(req,res){
	res.render("login.ejs");
})
app.get("/animo",isLoggedIn,function(req,res){
	res.render("animo.ejs");
})
app.get('/auth/facebook', passport.authenticate('facebook'));


app.get('/animo',
  passport.authenticate('facebook', { successRedirect: '/animo',
                                      failureRedirect: '/login' }));

app.post("/login",function(req,res){
  var name = req.body.name; 
    var email =req.body.email; 
    var username=req.body.username;
    var age =req.body.age; 
  
    var data = { 
        "name": name, 
        "email":email, 
       "username":username,
        "age":age 
    } 

var d=new ud2(data);
d.save(function(err){
if(err)
	console.log(err);
})
var x=req.body.username;
ud3.register(new ud3({username:req.body.username}),req.body.password,function(err,user){
	if(err){

		res.redirect('/notfound')
			

		
		console.log(err);
		
}
passport.authenticate('local')(req,res,function(){

res.redirect("/login");
});
});

});


app.post("/animo",passport.authenticate("local",{
	successRedirect:"/animo",
	failureRedirect:"/login"
}),function(req,res){

});

function isLoggedIn(req,res,next){
if(req.isAuthenticated())
	return next();
else
	res.redirect("/login");

}


app.listen(1000);