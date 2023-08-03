import { getAllReviews, addNewReview, getReviewById, updateReview, deleteReview} from "../models/reviewsModel.js";

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
    const {id} = req.params;
    try {
        const review = await getReviewById(id);
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
    const { eventid, userid, rating, comment } = req.body;

    try {
        const newReview = await addNewReview({
            eventid,
            userid,
            rating,
            comment
        });
        console.log(newReview);
        res.status(201).json(newReview);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

export const updateReviewController = async (req, res) => {
    const { id } = req.body;
    const reviewData = req.body;

    try {
        const updatedReview = await updateReview(id, reviewData);
        res.status(200).json(updatedReview);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


export const deleteReviewController = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedReview = await deleteReview(id);
      if (!deletedReview) {
        res.status(404).json({ msg: 'Review not found' });
      }
      res.status(200).json(deletedReview);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
};
