const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const moment = require("moment");

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "post_office_app",
    password: "rupam4080"
});

app.listen("8080", () => {
    console.log("Server is listening to port 8080");
});

app.post("/new/data", (req,res) => {
    const {
        sender_name,
        sender_mobile,
        sender_address,
        sender_state,
        sender_district,
        sender_postal_code,
        sender_landmark,
        receiver_name,
        receiver_mobile,
        receiver_address,
        receiver_state,
        receiver_district, 
        receiver_postal_code,
        receiver_landmark,
        package_item,
        number_of_items,
        item_weight,
        item_length,
        item_width,
        item_height,
        content_desc,
        service_type,
        additional_service,
        delivery_type,
        total_amount,
        mode_of_payment,
        estd_delivery_date,
	    change_date,
        time_of_delivery,
        special_instructions
      } = req.body;
    console.log(req.body);

    const sql = `INSERT INTO shipments SET ?`;
    connection.query(sql, req.body, (err, result) => {
        if (err) throw err;
        console.log("Shipment data insert successfully");
    });    
});

app.get("/view", (req,res) => {
    let q = `SELECT * FROM shipments`;
    try {
        connection.query(q, (err, users) => {
            if (err) throw err;
            res.render("shipperdata.ejs", { users });
        });
    } catch (err) {
        console.log(err);
        res.send("Some error in database");
    }
});


app.get("/view/new", (req,res) => {
    let q = `SELECT count(*) FROM shipments`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.render("newshipping.ejs");
        });
    } catch (err) {
        console.log(err);
        res.send("Some error in database");
    }
});

app.get("/new/validate", (req,res) => {    
    res.render("consignment.ejs");
});

app.get("/", (req,res) => {
    res.render("homepage.ejs");
});

app.post("/update/id", (req, res) => {
    const consgId = req.body['consg-id'];  
    // Update the existing row with the consgId value
    const query = `UPDATE shipments SET consg_no = ? WHERE consg_no IS NULL`;
    connection.query(query, [consgId], (err, results) => {
      if (err) {
        console.error('error running query:', err);
      } else {
        res.send('Data updated successfully!');
      }
    });
});

// app.get('/total-cost', (req, res) => {
//     // Execute the query to retrieve the sum of the cost column
//     db.query("SELECT SUM(cost) AS total_cost FROM your_table_name", (err, results) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send('Error retrieving total cost');
//       } else {
//         const totalCost = results[0].total_cost;
//         res.render('your_ejs_page', { totalCost: totalCost });
//       }
//     });
//   });

//<p>Total Cost: <%= totalCost %></p>

