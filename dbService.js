const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
    multipleStatements: true,
    charset: "utf8_general_ci"
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }

    // console.log('Database ' + connection.state);
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData(a) {
        try {
            console.log('Get All user information');
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users";
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message))
                    resolve(result);
                })
            });
            // IMPORTANTTT
            // var b = JSON.parse(JSON.stringify(a));
            // console.log(b);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async uploadProductNew({ productName, productPrice, productFigure, productCategory, productSale, ownerName, ...image }) {
        try {
            const response = await new Promise((resolve, reject) => {
                var arrImage = Object.values(image);
                const query = `INSERT INTO shopee_database.products
                (product_name, owner_name,sale_percent,price,left_amount,sold_amount,category,liked_count,main_image,sub_image1,sub_image2,sub_image3,sub_image4)
                VALUES (? , ?, ?, ?, ?, 0, ?, 0, ?, ?, ?, ?, ?); SELECT  LAST_INSERT_ID() AS id, sale_percent FROM products WHERE product_id = LAST_INSERT_ID()`
                connection.query(query, [productName, ownerName, productSale, productPrice, productFigure, productCategory, ...arrImage], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getRandomProduct(amount) {
        try {
            console.log('Getting ' + amount + ' random products');
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM shopee_database.products ORDER BY RAND() LIMIT ${amount}`;
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message))
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getAllProduct(){
        try {
            console.log('Getting all product infos for main page');
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM shopee_database.products ORDER BY RAND()`;
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message))
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getProductInfo(amount) {
        try {
            console.log(`Getting product information with id ${amount}`);
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT z.*, us.user_nickName FROM users us
                JOIN
                (SELECT x.*, y.shop_count FROM 
                (SELECT p.*, u.image_profile FROM products p JOIN users u ON u.user_name = p.owner_name AND p.product_id = ${amount}) AS x
                JOIN 
                (SELECT COUNT(product_id) AS shop_count, owner_name AS shop_name FROM products 
                GROUP BY owner_name) AS y ON y.shop_name = x.owner_name) AS z
                ON us.user_name = z.owner_name`;
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message))
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getProductID(name) {
        try {
            console.log(`Getting product information with name: ${name}`);
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT product_id FROM products WHERE product_name = ?`;
                connection.query(query, [name], (err, result) => {
                    if (err) reject(new Error(err.message))
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }


    async getUserSearchHistory(userID) {
        try {
            console.log(`Getting user ${userID}'s search history`);
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT search_history FROM searchhistory WHERE user_id = ?`;
                connection.query(query, [userID], (err, result) => {
                    if (err) reject(new Error(err.message))
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getShopInfo(shop_name) {
        try {
            console.log(`Getting shop information with shop_name ${shop_name}`);

            const response = await new Promise((resolve, reject) => {
                const query = `SELECT u.user_nickName,u.image_profile,(SELECT SUM(p.sold_amount) FROM products p WHERE p.owner_name = ? ) as sold_amount FROM users u WHERE u.user_name = ?;
                SELECT p.* FROM shopee_database.products p WHERE p.owner_name = ? AND p.product_name IS NOT NULL;`;
                connection.query(query, [shop_name, shop_name, shop_name], (err, result) => {
                    if (err) reject(new Error(err.message))
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }


    async getAllUserOrder(userid) {
        try {
            console.log(`Get Order information ${userid}`);
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT p.*, o.order_date, pro.price, pro.product_name, pro.sale_percent, pro.main_image, pro.category FROM purchase p JOIN orders o ON p.order_id = o.order_id AND order_customer_id = ?
                JOIN products pro ON pro.product_id = p.product_id;`;
                connection.query(query, [userid],(err, result) => {
                    if (err) reject(new Error(err.message))
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }


    async newOrder(rqBody) {
        try {
            var { userID, productID, productCount, buyDate } = rqBody;
            console.log(`Update receipt information of ${rqBody.userID}`);
            const response = await new Promise((resolve, reject) => {
                // console.log(userID, productID, productCount, buyDate);
                const query = `UPDATE products SET left_amount = left_amount - ?, sold_amount = sold_amount + ? WHERE product_id = ?;INSERT INTO orders (order_customer_id, order_date) VALUES (?, ?);INSERT INTO shopee_database.purchase (order_id,product_id, product_amount) VALUES(LAST_INSERT_ID(),?,?);`
                connection.query(query, [productCount, productCount, productID, userID, buyDate, productID, productCount], (err, result) => {
                    if (err) reject(new Error(err.message))
                    resolve(result);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async buyFromCart(rqBody) {
        try {
            var { userID, productID, productArr } = rqBody;
            // console.log(rqBody);
            const query1 = `DELETE FROM carts WHERE cart_user_id = "${userID}";`
            const query2 = `INSERT INTO orders (order_customer_id, order_date) VALUES ("${userID}", NOW());`
            const query3 = productArr.reduce((acc, info) => {
                var sub_query_main = `UPDATE products SET left_amount = left_amount - ${info.amount}, sold_amount = sold_amount + ${info.amount} WHERE product_id = ${info.productID};`
                var sub_query = `INSERT INTO shopee_database.purchase (order_id,product_id, product_amount) VALUES(LAST_INSERT_ID(),${info.productID}, ${info.amount});`
                return acc + sub_query_main + sub_query;
            }, '');
            const queryAll = query1 + query2 + query3;
            // console.log(queryAll);
            const response = await new Promise((resolve, reject) => {
                connection.query(queryAll, (err, result) => {
                    if (err) reject(new Error(err.message))
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(rqBody) {
        try {
            var { userID, productID, productCount, buyDate } = rqBody;
            console.log(`Update receipt information of ${rqBody.userID}`);
            const response = await new Promise((resolve, reject) => {
                console.log(userID, productID, productCount, buyDate);
                const query2 = `UPDATE products SET left_amount = left_amount - ${productCount} AND sold_amount = sold_amount + ${productCount} WHERE product_id = ${productID};`
                connection.query(query2, [], (err, result) => {
                    if (err) reject(new Error(err.message))
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async signUp(rqBody) {
        try {
            const response = await new Promise((resolve, reject) => {
                var { username, password, fullname, dob, img } = rqBody;
                dob = dob.split("/").reverse().join("/");
                const queryUserName = "SELECT COUNT(user_name) FROM users WHERE user_name = ?";
                connection.query(queryUserName, [username], (err, result) => {
                    if (err) reject(new Error(err.message))
                    var hasExist = false;
                    result.forEach(e => {
                        if (e["COUNT(user_name)"] == 1) hasExist = true;
                    })
                    if (!hasExist) {
                        console.log(`Sign-up success: ${username} - ${password}`);
                        const query = "INSERT INTO `shopee_database`.`users` (`user_name`,`password`,`user_nickName`,`dob`, `image_profile`) VALUES (?, ?, ?, ?, ?);"
                        connection.query(query, [username, password, fullname, dob, img], (err, result) => {
                            if (err) reject(new Error(err.message))
                            resolve(result);
                        })
                    } else {
                        console.log('Sign-Up failed: account existed !');
                        resolve("exist")
                    }
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async signIn(rqBody) {
        try {
            const response = await new Promise((resolve, reject) => {
                var { usernameLogIn, passwordLogIn } = rqBody;
                console.log('Trying to log in !!');
                const query = "SELECT user_name, password FROM users WHERE user_name = ? AND password = ?"
                connection.query(query, [usernameLogIn, passwordLogIn], (err, result) => {
                    if (err) reject(new Error(err.message))
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getAllCategory() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT category FROM products GROUP BY category;"
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message))
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getUserInformation(username) {
        try {
            console.log('Getting user information with username: ' + username);
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users WHERE user_name = ?"
                connection.query(query, [username], (err, result) => {
                    if (err) reject(new Error(err.message))
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async addNewProductToCart(productID, userID, amount) {
        try {
            console.log('Add new product to cart');
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO `shopee_database`.`carts` (`cart_user_id`,`product_id`,`product_amount`)VALUES (?, ?, ?);"
                connection.query(query, [userID, productID, amount], (err, result) => {
                    if (err) reject(new Error(err.message))
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async updateCartItem(productID, userID, amount) {
        try {
            console.log('Update cart item');
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE `shopee_database`.`carts` SET product_amount = product_amount + ? WHERE cart_user_id = ? AND product_id = ?;"
                connection.query(query, [amount, userID, productID], (err, result) => {
                    if (err) reject(new Error(err.message))
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getUserCart(username) {
        try {
            console.log('Getting user ' + username + ' cart information');
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT *, c.product_amount FROM products p JOIN carts c ON c.product_id = p.product_id AND c.cart_user_id = ?"
                connection.query(query, [username], (err, result) => {
                    if (err) reject(new Error(err.message))
                    // console.log(result);
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteCartItem(rqBody) {
        try {
            console.log('Delete cart item !!');
            var { user_id, product_id } = rqBody;
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM `shopee_database`.`carts` WHERE cart_user_id = ? AND product_id = ?;"
                connection.query(query, [user_id, product_id], (err, result) => {
                    if (err) reject(new Error(err.message))
                    // console.log(result);
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async updateProductLike(id, like) {
        try {
            console.log('Update product like with id ' + id);
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE products SET liked_count = ? WHERE product_id = ?;"
                connection.query(query, [like, id], (err, result) => {
                    if (err) reject(new Error(err.message))
                    // console.log(result);
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async searchProductByName(name) {
        try {
            console.log(`Someone is trying to search for: ${name}`);
            const response = await new Promise((resolve, reject) => {
                // const query1 = `INSERT INTO searchhistory VALUES ('${userid}', '${name}', NOW());`;
                const query2 = `SELECT * FROM products WHERE product_name LIKE '%${name}%';`
                // const query = query1 + query2;
                connection.query(query2, (err, results) => {
                    if (err) reject(new Error(err.message));
                    // console.log(results);
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async saveSearchHistory(searchHis, userID) {
        try {
            console.log(`Save ${userID}'s history search: ${searchHis}`);
            const response = await new Promise((resolve, reject) => {
                const query1 = `INSERT INTO searchhistory VALUES ('${userID}', '${searchHis}', NOW());`;
                connection.query(query1, (err, results) => {
                    if (err) reject(new Error(err.message));
                    // console.log(results);
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async insertNewName(name) {
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO names (name, data_added) VALUES (?, ?)";
                // All the '?' mark other hear
                // Will be replaced with [?1, ?2, ?3] above here
                connection.query(query, [name, dateAdded], (err, result) => {
                    if (err) reject(new Error(err.message))
                    resolve(result);
                })
            });
            // console.log(insertId);
            return {
                id: insertId.insertId,
                name: name,
                dataAdded: dateAdded
            }
        } catch (err) {
            console.log(err);
        }
    }

    async deleteRowById(id) {
        try {
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM names WHERE id = ?";

                connection.query(query, [id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });

            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateNameById(id, name) {
        try {
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE names SET name = ? WHERE id = ?";

                connection.query(query, [name, id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });

            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }

    }

    async searchByName(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names WHERE name = ?;";

                connection.query(query, [name], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = DbService; 