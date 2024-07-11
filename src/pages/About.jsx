

import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div style={{ fontSize: '2em' }}>{text}</div>;
const shopBranches = [
    { id: 1, name: '🦛', coords: { lat: 32.0853, lng: 34.7818 } },
    { id: 2, name: '🐲', coords: { lat: 32.0744, lng: 34.7920 } },
    { id: 3, name: '🦔', coords: { lat: 32.0678, lng: 34.7705 } },
    { id: 4, name: '🐫', coords: { lat: 32.0278, lng: 34.7650 } },

]

export function About() {
    useState

    const [selectedBranch, setSelectedBranch] = useState(null)
    const [mapCenter, setMapCenter] = useState(shopBranches[0].coords)
    const [zoom, setZoom] = useState(11)




    function handleClick(branch) {
        setMapCenter(branch.coords)
        setSelectedBranch(branch)
        setZoom(18)
    }


    return (
        <section className="about-section">

            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyBh-xhaM8E4baaSLUuIQSBY2oVxKziNIwk" }}
                    center={mapCenter}
                    zoom={zoom}
                >
                    {shopBranches.map(branch => (
                        <AnyReactComponent
                            key={branch.id}
                            lat={branch.coords.lat}
                            lng={branch.coords.lng}
                            text={branch.name}
                        />
                    ))}
                </GoogleMapReact>
            </div>
            <div className="branch-buttons">
                {shopBranches.map(branch => (
                    <button key={branch.id} onClick={() => handleClick(branch)}>
                        {branch.name}
                    </button>
                ))}
            </div>
            <h3 className="about-where-shops">איפה אנחנו</h3>
            <div className="about-container">
                <h1 className="home-text text-center">About Us (But In Cool Hebrew Font) </h1>
                <p className="about-info-text">
                    ברוכים הבאים לאתר הצעצועים הכי כיפי! 🌟 חולמים על עולם מלא בצעצועים מדליקים ומשחקים מרתקים? הגעתם למקום הנכון! אצלנו תמצאו מגוון עצום של צעצועים לכל הגילאים - החל מתינוקות ועד בני נוער, כולם ימצאו כאן משהו שהם יאהבו
                </p>
                <p className="about-info-text">
                    🎉 הנחות מטורפות ומבצעים מיוחדים! כל שבוע אנחנו מפתיעים אתכם עם הנחות מדהימות ומבצעים שאי אפשר לפספס אל תפספסו את ההזדמנות לקנות את הצעצועים הכי טובים במחירים הכי משתלמים
                </p>
                <p className="about-info-text">
                    
                    📚אצלנו תמצאו צעצועים שמפתחים את היצירתיות, החשיבה והמיומנויות החברתיות של הילדים שלכם משחקים לימודיים, פאזלים, ערכות יצירה ועוד הרבה הפתעות מחכות לכם כאן
                </p>
                <p className="about-info-text">
                    🚚 משלוח מהיר עד הבית כבר לא צריך לצאת מהבית כדי לקנות צעצועים! הזמינו עכשיו ותקבלו את המוצרים האהובים עליכם ישירות לדלת הבית במהירות וביעילות
                </p>
                <p className="about-info-text">
                    😊 שירות לקוחות מעולה הצוות שלנו תמיד כאן כדי לעזור לכם! יש לכם שאלות או צריכים ייעוץ? פנו אלינו ואנחנו נשמח לעזור
                </p>
                <p className="about-info-text">
                    בואו לבקר אותנו ולהתאהב מחדש בעולם הצעצועים! התחילו לגלוש באתר, תמצאו את הצעצועים שאתם מחפשים ותעניקו לילדים שלכם את המתנות הכי שוות
                </p>
                <p className="about-info-text">
                    🌈 היכנסו עכשיו ותגלו עולם חדש של כיף ומשחקים! [כפתור: התחילו לקנות עכשיו]
                </p>
                <p className="about-info-text">
                    מצפים לראות אתכם, צוות האתר לצעצועים
                </p>
            </div>
        </section>
    )
}



