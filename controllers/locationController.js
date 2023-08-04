import { getAllLocations, getLocationByID, addLocation, updateLocation, deleteLocation } from "../models/locationModel.js";

export const getAllLocationController = async (req, res) => {
    try {
        const locations = await getAllLocations();
        res.status(200).json(locations);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getLocationByIDController = async (req, res) => {
    const { locationId } = req.params;
    try {
        const location = await getLocationByID(locationId);
        if (!location) {
            res.status(404).json({ msg: "Location not found" });
        }
        res.status(200).json(location);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const addLocationController = async (req, res) => {
    const { city, country } = req.body;

    try {
        const newLocation = await addLocation({
            city,
            country,
        });

        res.status(201).json(newLocation);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const updateLocationController = async (req, res) => {
    const { id } = req.body;
    const locationData = req.body;

    try {
        const updatedLocation = await updateLocation(id, locationData);
        res.status(200).json(updatedLocation);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const deleteLocationController = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedLocation = await deleteLocation(id);
      if (!deletedLocation) {
        res.status(404).json({ msg: 'Location not found' });
      }
      res.status(200).json(deleteLocation);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
};
