import { getPlaceByUUID, insertQrCodeData } from '../models/placeModel.js';

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

export const insertQrCodeDataController = async (req, res) => {
    try {
        const { ticket_uuid, qr_code_data } = req.body;

        if (!ticket_uuid || !qr_code_data) {
            return res.status(400).json({ error: 'Missing required data' });
        }

        await insertQrCodeData(ticket_uuid, qr_code_data);

        res.json({ message: 'qr_code_data inserted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to insert qr_code_data' });
    }
};
