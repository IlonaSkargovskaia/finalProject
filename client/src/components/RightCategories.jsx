import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {CiBullhorn, CiLollipop, CiMusicNote1, CiPlay1, CiStar, CiTrophy} from 'react-icons/ci';

const RightCategories = () => {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(`/api/categories`);
                setCategory(res.data);
            } catch (error) {
                console.error("Error fetch categories: ", error);
            }
        };

        fetchCategories();
    }, []);
    return (
        <div className="card categories">
            <h3>Categories: </h3>
            <ul>
                {category.map((cat, index) => {
                    let icon = null;

                    if (cat.id === 1) {
                        icon = <CiMusicNote1 />
                    } else if (cat.id === 2) {
                        icon = <CiPlay1 />
                    } else if (cat.id === 3) {
                        icon = <CiBullhorn />
                    } else if (cat.id === 4) {
                        icon = <CiStar />
                    } else if (cat.id === 5) {
                        icon = <CiTrophy />
                    } else if (cat.id === 6) {
                        icon = <CiLollipop />
                    }
                    return (
                        <li key={index}>
                            {icon}<Link to={`/category/${cat.id}`}>{cat.name}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default RightCategories;
