import db from '../config/db.js';

export const getAllLocations = async () => {
  try {
      const locations = await db.select('*').from('location');
      return locations;
  } catch (error) {
      console.error(error); 
      throw new Error('Error fetching locations from the database');
  }
};

export const getLocationByID = async (locationId) => {
  try {
    const location = await db.select('*').from('location').where({ id: locationId }).first();
    if (!location) {
      return null;
    }
    return location;
  } catch (error) {
    throw new Error('Error fetching location from the database');
  }
};

export const addLocation = async (locationInfo) => {
  try {
    const newLocation = await db('location').insert(locationInfo).returning('*');
    return newLocation[0];
  } catch (error) {
    throw new Error('Error adding location to the database');
  }
};


export const updateLocation = async (id, locationData) => {
  try {
    const updatedLocation = await db('location').where({id}).update(locationData).returning('*');
    return updatedLocation[0];
  } catch (error) {
      console.log('error: ', error);
      throw new Error('Error updating location in the database');
  }
}

export const deleteLocation= async (id) => {
  try {
    const deletedLocation = await db('location').where({ id }).del().returning('*');
    return deletedLocation[0];
  } catch (error) {
    console.log('error: ', error);
    throw new Error('Error deleting location from the database');
  }
}