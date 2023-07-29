import db from '../config/db.js';

export const getAllReviews = async () => {
    try {
        const reviews = await db.select('*').from('reviews');
        return reviews;
    } catch (error) {
        console.log(error);
        throw new Error({ error: 'Error fetching reviews from the database'})
    }
}

export const getReviewById = async (reviewId) => {
    try {
        const review = await
        db.select('*')
            .from('reviews')
            .where({reviewId})
            .first();

        if (!review) {
            return null
        }
        return review;

    } catch (error) {
        console.log(error);
        throw new Error({ error: 'Error fetching review from the database'})
    }
}


export const addNewReview = async (reviewInfo) => {
    try {
        const newReview = await
        db('reviews')
            .insert(reviewInfo)
            .returning('*');

        return newReview[0];
        
    } catch (error) {
        console.log(error);
        throw new Error({ error: 'Error adding review from the database'})
    }
}