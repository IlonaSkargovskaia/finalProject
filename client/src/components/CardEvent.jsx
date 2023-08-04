import React, {useState, useEffect} from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from 'axios';
import { format, parseISO } from 'date-fns';

const CardEvent = ({ event }) => {
    const { title, description, date, time, image, price, category_id, location_id } = event;
    const parsedDate = parseISO(date); //  date -> Date object
    const newDateFormat = format(parsedDate, 'dd-MM-yyyy');

    const [categoryName, setCategoryName] = useState('');
    const [locationName, setLocationName] = useState('');

    useEffect(() => {
        const fetchCategoryName = async () => {
            try {
                const response = await axios.get(`http://localhost:3005/api/categories/${category_id}`);
                setCategoryName(response.data.name);
            } catch (error) {
                console.error("Error fetching category name:", error);
            }
        };

        const fetchLocationName = async () => {
            try {
                const response = await axios.get(`http://localhost:3005/api/locations/${location_id}`);
                setLocationName(response.data.city);
            } catch (error) {
                console.error("Error fetching location name:", error);
            }
        };

        fetchCategoryName();
        fetchLocationName();
    }, [category_id, location_id]);

    return (
        <Card>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>Category: {categoryName}</Card.Text>
                <Card.Text>{description}</Card.Text>
                <Card.Text>Date: {newDateFormat}</Card.Text>
                <Card.Text>Time: {time}</Card.Text>
                <Card.Text>Location: {locationName}</Card.Text>
                <Card.Text>Price: {price} ILS</Card.Text>
                <Button className="purple">Buy now</Button>
            </Card.Body>
        </Card>
    );
};

export default CardEvent;
