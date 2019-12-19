var Product = require('../models/product');
var mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/shopping-cart');
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

        done++;
        if(done==products.length)
        exit();
    });
}

function exit(){
    mongoose.disconnect();
}