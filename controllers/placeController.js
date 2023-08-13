import { getPlaceByUUID } from '../models/placeModel.js';

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
