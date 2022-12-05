const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService'); // connect with database 
const { request, response } = require('express');

app.use(cors());
app.use(express.json()); // send JSON in data format

app.use(express.urlencoded({ extended: false }));

// create 
app.post('/insert', (request, response) => {
    const { name } = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.insertNewName(name);

    console.log(name);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err))
});

// Submit form test
app.post('/submit', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData(request.body)
    result.then(data => response.json({ data: request.body }))
        .catch(err => console.log(err))
});

// Sign Up
app.post('/signup', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.signUp(request.body)
    result.then(data => {
        if (data == "exist") {
            response.json({ exist: true })
        } else {
            response.json({ data: request.body })
        }
    })
        .catch(err => console.log(err))
});

// Sign In
app.post('/signin', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.signIn(request.body)
    see(request.body)
    result.then(data => {
        if (data.length == 1) {
            var db2 = dbService.getDbServiceInstance();
            var result2 = db2.getUserInformation(data[0].user_name)
            result2.then(data => response.json(data))
        } else {
            response.json("false")
        }
    })
        .catch(err => console.log(err))
});

// Get random 15 products at main page
app.get('/randomProduct/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.getRandomProduct(id);

    result.then(data => response.json({ data }))
        .catch(err => console.log(err))
})

// Get productID
app.get('/productID/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.getProductInfo(id);
    result.then(data => response.json({ data }))
        .catch(err => console.log(err))
})

// Get User Cart Info
app.get('/userCart/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.getUserCart(id);
    result.then(data => response.json(data))
        .catch(err => console.log(err))
})

// Update product liked count
app.get('/updateProductLike/:id/:like', (request, response) => {
    const {id, like } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.updateProductLike(id, like);
    result.then(data => response.json(data))
        .catch(err => console.log(err))
})

// Upload Product
app.post('/new-product', (request, response) => {
    const db = dbService.getDbServiceInstance();
    see(request.body);
    const result = db.uploadProductNew(request.body);
    result.then(data => {
        const db = dbService.getDbServiceInstance();
        const result = db.getProductID(request.body.productName);
        result.then(data2 => response.json(data2));
    })
        .catch(err => console.log(err))
})

// Add new product to cart
app.get('/addToCart/:productID/:userID/:amount', (request, response) => {
    const { productID, userID, amount } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.addNewProductToCart(productID, userID, amount);
    result.then(data => response.json(data))
        .catch(err => console.log(err))
})

// Update cart item
app.get('/updateCart/:productID/:userID/:amount', (request, response) => {
    const { productID, userID, amount } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.updateCartItem(productID, userID, amount);
    result.then(data => response.json(data))
        .catch(err => console.log(err))
})

// Delete User cart item
app.post('/deleteCartItem', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.deleteCartItem(request.body)
    result.then(data => {
        response.json(data)
    })
        .catch(err => console.log(err))
})

// read
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();

    result.then(data => response.json({ data: data }))
        .catch(err => console.log(err))
})

// Test Send file image -> Success
app.get('/:id', (request, response) => {
    const { id } = request.params;
    response.sendFile(__dirname + "\\" + id + ".jpeg")
})

// Test send any type of file -> Success
app.get('/getfile/:id', (request, response) => {
    const { id } = request.params;
    response.sendFile(__dirname + "\\" + id);
})

app.get('/search/:name', (request, response) => {
    const { name } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByName(name);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
})
/*
    By adding /:id in the link: you will have specific page
    for each product ID
*/
// app.get('/user/:id', (request, response) => {
//     response.sendFile(__dirname + "/index.html")
// })

app.listen(process.env.PORT, () => {
    console.log('App is running');
})

//update
app.patch('/update', (request, response) => {
    const { id, name } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.updateNameById(id, name)

    result.then(data => response.json({ success: data }))
        .catch(err => console.log(err))
})

//delete
app.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id);

    result.then(data => response.json({ success: data }))
        .catch(err => console.log(err))
})

//create

//read

function see(a) {
    console.log(a);
}

