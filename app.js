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
//select;
// Buy now product receipt update
app.post('/receipt_data', (request, response) => {
    const db = dbService.getDbServiceInstance();
    see(request.body)
    const result = db.newOrder(request.body);
    result.then(data1 => console.log(data1))
});

// Get random 15 products at main page
app.get('/randomProduct/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.getRandomProduct(id);

    result.then(data => response.json({ data }))
        .catch(err => console.log(err))
})

// Get all product for main page
app.get('/allProduct', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.getAllProduct();

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

// Get shop 
app.get('/user_shop/:shop_name', (request, response) => {
    const { shop_name } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.getShopInfo(shop_name);
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
    const { id, like } = request.params;
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
        result.then(data2 => response.json(data2));
    })
        .catch(err => console.log(err))
})

// Get User Order 
app.get('/userOrder/:userid', (request, response) => {
    var { userid } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.getAllUserOrder(userid);
    result.then(data => {
        var nonDup = data.reduce((a, b) => {
            return a.concat([b.order_id]);
        }, [])
        data = data.map((a, b) => {
            var myDate = new Date(a.order_date)
            a.order_date = `${myDate.getDate()}/${myDate.getMonth() + 1}/${myDate.getFullYear()}`
            return a;
        })
        nonDup = [...new Set(nonDup)];
        nonDup = nonDup.map(a => {
            var myFilter = data.filter(b => {
                return b.order_id == a;
            })
            var newData = { orderid: a, orderDate: myFilter[0].order_date, productInfo: [], totalMoney: 0 };
            myFilter.forEach(ele => {
                var myObj = { productID: ele.order_id, productAmount: ele.product_amount, price: (parseInt(ele.price * (1 - ele.sale_percent/100) / 1000) * 1000), productName: ele.product_name, img: ele.main_image, category: ele.category };
                newData.totalMoney += myObj.price * myObj.productAmount;
                newData.productInfo.push(myObj);
            })
            newData.totalMoney = newData.totalMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
            return newData;
        })
        response.json(nonDup);
    })
        .catch(err => console.log(err))
})

// Buy from cart task:
// Update cart: delete all cart item
// Update receipt: create new receipt
// Make all purchase in each product 
app.post('/buyFromCart', (request, response) => {
    const db = dbService.getDbServiceInstance();
    see(request.body);
    const result = db.buyFromCart(request.body);
    result.then(data1 => response.json(data1))
})


// Add new product to cart
app.get('/addToCart/:productID/:userID/:amount', (request, response) => {
    const { productID, userID, amount } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.addNewProductToCart(productID, userID, amount);
    result.then(data => response.json(data))
        .catch(err => console.log(err))
})

// Get All product category
app.get('/getCategory', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllCategory();
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

// Get user search history
app.get('/userSearchHistory/:userID', (request, response) => {
    const { userID } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.getUserSearchHistory(userID);
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

// Search product by name
app.get('/searchProduct/:name', (request, response) => {
    const { name } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.searchProductByName(name);
    result
        .then(data => response.json(data))
        .catch(err => console.log(err));
})

// Save search hisotory
app.get('/saveSearch/:searchHis/:userid', (request, response) => {
    const { searchHis, userid } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.saveSearchHistory(searchHis, userid);
    result
        .then(data => response.json({ success: true }))
        .catch(err => console.log(err));
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


// From youtube
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


// read
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();

    result.then(data => response.json({ data: data }))
        .catch(err => console.log(err))
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

