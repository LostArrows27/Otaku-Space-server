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