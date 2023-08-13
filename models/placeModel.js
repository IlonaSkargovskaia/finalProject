import db from '../config/db.js';

export const getPlaceByUUID = async (uuid) => {
  try {
      const place = await db.select('*').from('places').where('ticket_uuid', uuid).first();
      return place;
  } catch (error) {
      console.error(error);
      throw new Error('Error fetching place from the database');
  }
};
