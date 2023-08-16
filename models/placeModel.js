import db from '../config/db.js';

export const getPlaceByUUID = async (id) => {
  try {
      const place = await db.select('*').from('places').where('ticket_id', id).first();
      return place;
  } catch (error) {
      console.error(error);
      throw new Error('Error fetching place from the database');
  }
};

export const insertQrCodeData = async (ticketUuid, qrCodeData) => {
  try {
      await db('places').where('ticket_id', ticketUuid).update({
          qr_code_data: qrCodeData,
      });
  } catch (error) {
      console.error(error);
      throw new Error('Error inserting qr_code_data into the database');
  }
};

export const getPurchasedSeatsByEventID = async (eventId) => {
    try {
      const purchasedSeats = await db
        .select('row', 'seat')
        .from('places')
        .whereIn(
          'ticket_id',
          db.select('id').from('tickets').where('eventid', eventId)
        );
      return purchasedSeats;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching purchased seats for the event');
    }
  };
