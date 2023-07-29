import { getAllReviews, addNewReview, getReviewById} from "../models/reviewsModel.js";

export const getAllReviewsController = async (req, res) => {
    try {
        const reviews = await getAllReviews();
        res.status(200).json(reviews);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Internal server error'})
    }
}

export const getReviewByIdController = async (req,res) => {
    const {reviewId} = req.params;
    try {
        const review = await getReviewById(reviewId);
        if (!review){
            res.status(404).json({msg: 'Review not found'})
        }
        res.status(200).json(review);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Internal server error'})
    }
}

export const addNewReviewController = async (req, res) => {
    const {eventID, userID, rating, comment} = req.body;

    try {
        const newReview = await addNewReview({
            eventID, 
            userID, 
            rating, 
            comment
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Internal server error'})
    }
}