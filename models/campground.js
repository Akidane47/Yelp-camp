const mongoose = require('mongoose');
const Review = require('./reviews');
const Schema = mongoose.Schema;


const ImageSchema = new Schema({
    url: String,
    filename: String
});

///image transformation, changes it to thumbnail 300px to standardize size and to load faster in browser

ImageSchema.virtual('thumbnail').get(function() {
   return this.url.replace('/upload', '/upload/w_300');
});

const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
          type: String, 
          enum: ['Point'], 
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
}, opts);

CampgroundSchema.virtual('properties.popUpMarkup').get(function() {
   return `<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
   <p>${this.description.substring(0,20)}...</p>`
 });


//used to delete reviews from mongo if campground is deleted
//matches the doc post id with id associated in db and deletes all
CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if(doc){
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);

