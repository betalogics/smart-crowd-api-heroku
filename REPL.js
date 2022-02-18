const models = require('./models');

const { QueryTypes } = require('sequelize');
const { sequelize } = require('./models');

// models.Property.create({
//   name: "House Two",
//   type: "Suburban",
//   size: 440.00,
//   rooms: 4,
//   stories: 2
// }).then((res) => console.log(res)).catch(err => {})

// models.Property.update({
//   name: "House Zero",
//   type: "Suburban",
//   size: 440.00,
//   rooms: 4,
//   stories: 2
// }, {where: {name: "House One"}}).then(res => console.log(res)).catch(err => {})


// models.Description.findAll({where: {propertyId: 2}, raw: true, nest: true}).then((res) => {
  //let data = res.map((resObj) => resObj.toJSON());
  //let data2 = data.reduce(
  //  (obj, item) => Object.assign(obj,item), {}
  //);

  // console.log(res);
// });

//models.Transactions.create({userId: 1, units: 2, propertyId: 1}).then((data) => console.log(data));

// models.Ticket.create({
//   userId: 1,
//   ticketTitle: "Sample Tickert",
//   ticketBody: "Hey I wanna test tickets"
// }).then(res => console.log(res)).catch(e => {});

// models.TicketResponse.create({
//   userId: 1,
//   ticketId: 1,
//   responseBody: "But i forgot one thing"
// }).then((res) => console.log(res)).catch(e => {})

// models.UserProperty.create({
//   userId: 1,
//   propertyId: 1,
//   units: 50
// }).then(res => console.log(res)).catch((err) => console.log(err))

// models.Rent.create({
//   propertyId: 1,
//   rentAmount: 100.0,
//   expenditures: 40,
//   netRentAmount: 60
// }).then(res => console.log(res))

// sequelize.query(
//   `SELECT 
//     property.name, 
//     property.city, 
//     property.county, 
//     property.state, 
//     property.country, 
//     property.country_initials, 
//     property.post_code, class, 
//     property.latitude, 
//     property.longitude, 
//     property.created_at, 
//     property.updated_at,
//     description.key as \`Description.bedroom\`
//   FROM 
//     property, description
//   WHERE
//     description.property_id = property.id 
//     and
//     Description.bedroom = "bedroom"   
//     `, 
//   {type: QueryTypes.SELECT}).then((res) => console.log(res));

// for(let i=0; i<20 ; i++){
  
// }
// console.log(100000 + Math.floor(Math.random() * 900000));

// models.UserProperty.findAll({
//   where: { propertyId: 2 },
//   attributes: [],
//   include: { model: models.User, attributes: ["id"] },
//   raw: true,
//   nest: true,
// }).then(res => console.log(res))
//[ { User: { id: 1 } }, { User: { id: 3 } } ]


models.Cart.findAll({
  where: { userId: 2 },
  include: [{model: models.Property, include:[{model: models.Units}]}],
  raw: true,
  nest: true,
}).then((res) => console.log(res))