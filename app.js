var express= require('express');
var mongoose=require('mongoose');
var passport=require('passport');
var bodyParser=require('body-parser');
var passportlocal=require('passport-local');
var passportlocalmongoose=require('passport-local-mongoose');
var session= require('express-session');


mongoose.connect('mongodb://localhost/shopping-cart');

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

var Schema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
});

var Product = mongoose.model('Product',Schema);



var products =[
	new Product({
	   title:'Harry Potter Book1',
	   description:'Harry Potter is a British-American film series based on the eponymous novels by author J. K. Rowling. The series is distributed by Warner Bros. and consists of eight fantasy films, beginning with Harry Potter and the Philosophers Stone (2001) and culminating with Harry Potter and the Deathly Hallows – Part 2 (2011)',
	   price:200
   }),
   new Product({
	   title:'Harry Potter Book2',
	   description:'Harry Potter is a British-American film series based on the eponymous novels by author J. K. Rowling. The series is distributed by Warner Bros. and consists of eight fantasy films, beginning with Harry Potter and the Philosophers Stone (2001) and culminating with Harry Potter and the Deathly Hallows – Part 2 (2011)',
	   price:200
   }),
   new Product({
	   title:'Harry Potter Book3',
	   description:'Harry Potter is a British-American film series based on the eponymous novels by author J. K. Rowling. The series is distributed by Warner Bros. and consists of eight fantasy films, beginning with Harry Potter and the Philosophers Stone (2001) and culminating with Harry Potter and the Deathly Hallows – Part 2 (2011)',
	   price:200
   }),
   new Product({
	   title:'Harry Potter Book4',
	   description:'Harry Potter is a British-American film series based on the eponymous novels by author J. K. Rowling. The series is distributed by Warner Bros. and consists of eight fantasy films, beginning with Harry Potter and the Philosophers Stone (2001) and culminating with Harry Potter and the Deathly Hallows – Part 2 (2011)',
	   price:600
   }),
   new Product({
	   title:'Harry Potter Book5',
	   description:'Harry Potter is a British-American film series based on the eponymous novels by author J. K. Rowling. The series is distributed by Warner Bros. and consists of eight fantasy films, beginning with Harry Potter and the Philosophers Stone (2001) and culminating with Harry Potter and the Deathly Hallows – Part 2 (2011)',
	   price:1200
   }),
   new Product({
	   title:'Harry Potter Book6',
	   description:'Harry Potter is a British-American film series based on the eponymous novels by author J. K. Rowling. The series is distributed by Warner Bros. and consists of eight fantasy films, beginning with Harry Potter and the Philosophers Stone (2001) and culminating with Harry Potter and the Deathly Hallows – Part 2 (2011)',
	   price:300
   })
   ];
   var done=0;
   for(var i=0;i<products.length;i++){
	   products[i].save(function(err,result){
   
		   
	   });
   }
   



 
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


app.get('/add-to-cart/:id',function(req,res,next){
	var session= require('express-session');
var productId=req.params.id;
var cart= new Cart(req.session.cart?req.session.cart:{});
Product.findById(productId,function(err,product){
	if(err){
	return res.redirect('/');
	}
	cart.add(product,product.id);
	req.session.cart=cart;
	res.redirect('/');
	console.log(req.session.cart );
	res.render('add-to-cart.ejs')
})
})

app.get("/animo",isLoggedIn,function(req,res){
	Product.find(function(err,docs){
		var arr=[];
		for(var i=0;i<docs.length;i=i+2){
			arr.push(docs.slice(i,i+2));
		}
		res.render("animo.hbs",{products:arr});
	});
	
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

function Cart(oldCart){
	this.items=oldCart.items||0;
	this.totalQty=oldCart.totalQty||0;
	this.totalPrice=oldCart.totalPrice||0;

	this.add=function(item,id){
		var storedItem= this.items[id];
		if(!storedItem){
			storedItem=this.items[id]={item:item,qty:0,price:0};

		}
		storedItem.qty++;
		storedItem.price= storedItem.item.price*storedItem.qty;
		this.totalQty++;
		this.totalPrice= storedItem.price;
	}
	this.generateArray= function(){
		var arr= [];
		for(var id in this.items){
			arr.push(this.items[id]);
		}
		return arr;
	}
}

app.listen(1000);