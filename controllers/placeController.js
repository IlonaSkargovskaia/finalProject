import { getPlaceByUUID, insertQrCodeData,  getPurchasedSeatsByEventID, getPurchasedTicketCountsByEventID} from '../models/placeModel.js';

export const getPlaceByUUIDController = async (req, res) => {
    try {
        const uuid = req.params.uuid; 
        //console.log(uuid);
        const place = await getPlaceByUUID(uuid);
        res.json(place);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch place information' });
    }
};

export const getPurchasedTicketCountsByEventIDController = async (req, res) => {
    try {
        const { event_id } = req.params;
        const ticketCount = await getPurchasedTicketCountsByEventID(event_id);
        res.json({ count: ticketCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch purchased ticket counts for the event' });
    }
};

export const insertQrCodeDataController = async (req, res) => {
    try {
        const { ticket_id, qr_code_data } = req.body;

        if (!ticket_id || !qr_code_data) {
            return res.status(400).json({ error: 'Missing required data' });
        }

        await insertQrCodeData(ticket_id, qr_code_data);

        res.json({ message: 'qr_code_data inserted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to insert qr_code_data' });
    }
};

export const getPurchasedSeatsByEventIDController = async (req, res) => {
    try {
      const { event_id } = req.params;
      const purchasedSeats = await getPurchasedSeatsByEventID(event_id);
      res.json(purchasedSeats);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch purchased seats for the event' });
    }
  };