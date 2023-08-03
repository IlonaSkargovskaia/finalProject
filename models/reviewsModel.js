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

export const getReviewById = async (id) => {
    try {
        const review = await
        db.select('*')
            .from('reviews')
            .where({id})
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
        const newReview = await db('reviews')
            .insert(reviewInfo)
            .returning('*');

        return newReview[0];
        
    } catch (error) {
        console.log(error);
        throw new Error({ error: 'Error adding review from the database'})
    }
}

export const updateReview = async (id, reviewData) => {
    try {
        const updatedReview = await db('reviews').where({id}).update(reviewData).returning('*');
        return updatedReview[0]; //{[...]}
    } catch (error) {
        console.log('error: ', error);
        throw new Error('Error updating event in the database');
    }
}

export const deleteReview = async (id) => {
    try {
      const deletedReview = await db('reviews').where({ id }).del().returning('*');
      return deletedReview[0];
    } catch (error) {
      console.log('error: ', error);
      throw new Error('Error deleting event from the database');
    }
}
