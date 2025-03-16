'use client';
import Card from "./Card";
import { useReducer } from "react";

export default function CardPanel() {
    // Reducer to manage the rating state in a Map
    const ratingReducer = (vanueMap: Map<string, string>, action: { type: string, vanueName: string, rating?: string }) => {
        const newMap = new Map(vanueMap); // Copy existing Map
        
        // Handling the "ADD/UPDATE" and "REMOVE" actions
        switch (action.type) {
            case "ADD_OR_UPDATE":
                if (action.rating) {
                    newMap.set(action.vanueName, action.rating); // Add or update the rating
                }
                break;
            case "REMOVE":
                newMap.delete(action.vanueName); // Remove the vanue from the Map
                break;
            default:
                break;
        }
        return newMap; // Return the updated Map
    }

    // Initial state with an empty Map
    const [ratingMap, dispatchRating] = useReducer(ratingReducer, new Map<string, string>());

    return (
        <div style={{ margin: "20px" }}>
            {/* Top list of vanues */}
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Card
                    vanueName="The Bloom Pavilion"
                    imgSrc="/img/bloom.jpg"
                    onRatingChange={(vanue: string, rate: string) => dispatchRating({ type: "ADD_OR_UPDATE", vanueName: vanue, rating: rate })}
                />
                <Card
                    vanueName="Spark Space"
                    imgSrc="/img/sparkspace.jpg"
                    onRatingChange={(vanue: string, rate: string) => dispatchRating({ type: "ADD_OR_UPDATE", vanueName: vanue, rating: rate })}
                />
                <Card
                    vanueName="The Grand Table"
                    imgSrc="/img/grandtable.jpg"
                    onRatingChange={(vanue: string, rate: string) => dispatchRating({ type: "ADD_OR_UPDATE", vanueName: vanue, rating: rate })}
                />
            </div>

            {/* Bottom list showing vanue with ratings */}
            <div className="mt-[250px]">
                <h3>Vanue List with Ratings: {ratingMap.size}</h3>
                {Array.from(ratingMap).map(([vanueName, rating]) => (
                    <div
                        key={vanueName}
                        style={{ cursor: 'pointer' }}
                        onClick={() => dispatchRating({ type: "REMOVE", vanueName })} // Remove vanue on click
                    >
                        {vanueName}: {rating} stars
                    </div>
                ))}
            </div>
        </div>
    );
}
