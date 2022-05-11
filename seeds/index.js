const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const { descriptionTests } = require('./descriptionSeeds');   

if(process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}
const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 100; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      ////User Id tom for seeds database
      author: '625f357343115831b42dd867',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: `${sample(descriptionTests)}`,
      price,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude
        ]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dvq6blpjt/image/upload/v1651845128/YelpCamp/clay-banks-Ppz6b-YUDHw-unsplash_cvfb00.jpg',
          filename: 'YelpCamp/clay-banks-Ppz6b-YUDHw-unsplash_cvfb00',
        },
        {
          url: 'https://res.cloudinary.com/dvq6blpjt/image/upload/v1651845120/YelpCamp/lydia-koh-Sgrn_r-TX9w-unsplash_l8orbp.jpg',
          filename: 'YelpCamp/lydia-koh-Sgrn_r-TX9w-unsplash_l8orbp',
        }
      ],
    })
    await camp.save();
  }
}

///for image source, we can try collection by changing campgrounds to 'in,the,woods'

seedDB().then(() => {
  mongoose.connection.close();
})