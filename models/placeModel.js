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

export const insertQrCodeData = async (ticketUuid, qrCodeData) => {
  try {
      await db('places').where('ticket_uuid', ticketUuid).update({
          qr_code_data: qrCodeData,
      });
  } catch (error) {
      console.error(error);
      throw new Error('Error inserting qr_code_data into the database');
  }
};
