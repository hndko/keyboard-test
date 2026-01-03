import React, { useState, useEffect } from "react";
import { MapPin, Navigation, Crosshair } from "lucide-react";
import "../styles/sensors.css";

const LocationTest = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [watching, setWatching] = useState(false);
  const [watchId, setWatchId] = useState(null);

  const startWatch = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    setWatching(true);
    setError(null);

    const id = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          acc: position.coords.accuracy,
          alt: position.coords.altitude,
          altAcc: position.coords.altitudeAccuracy,
          heading: position.coords.heading,
          speed: position.coords.speed,
          timestamp: position.timestamp,
        });
      },
      (err) => {
        setError(`Error: ${err.message}`);
        setWatching(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
    setWatchId(id);
  };

  const stopWatch = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    setWatching(false);
  };

  useEffect(() => {
    return () => stopWatch();
  }, []);

  // Open in Google Maps
  const openMaps = () => {
    if (location) {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`,
        "_blank"
      );
    }
  };

  return (
    <div className="sensor-container">
      <div className="sensor-header">
        <h2>GPS & Location</h2>
        <div className="controls">
          {!watching ? (
            <button className="btn btn-primary" onClick={startWatch}>
              <Navigation size={18} /> Start Tracking
            </button>
          ) : (
            <button className="btn btn-danger" onClick={stopWatch}>
              Stop
            </button>
          )}
        </div>
      </div>

      {error && <div className="error-box">{error}</div>}

      <div className="sensor-card location-card">
        <div className="location-grid">
          <div className="stat-box">
            <label>Latitude</label>
            <div className="value">
              {location ? location.lat.toFixed(6) : "--"}
            </div>
          </div>
          <div className="stat-box">
            <label>Longitude</label>
            <div className="value">
              {location ? location.lng.toFixed(6) : "--"}
            </div>
          </div>
          <div className="stat-box">
            <label>Accuracy</label>
            <div className="value text-green">
              {location ? `±${Math.round(location.acc)}m` : "--"}
            </div>
          </div>
          <div className="stat-box">
            <label>Altitude</label>
            <div className="value">
              {location && location.alt ? `${Math.round(location.alt)}m` : "--"}
            </div>
          </div>
          <div className="stat-box">
            <label>Speed</label>
            <div className="value">
              {location && location.speed
                ? `${(location.speed * 3.6).toFixed(1)} km/h`
                : "0"}
            </div>
          </div>
          <div className="stat-box">
            <label>Heading</label>
            <div className="value">
              {location && location.heading
                ? `${Math.round(location.heading)}°`
                : "--"}
            </div>
          </div>
        </div>

        {location && (
          <button className="btn btn-secondary map-btn" onClick={openMaps}>
            <MapPin size={18} /> View on Google Maps
          </button>
        )}
      </div>
    </div>
  );
};

export default LocationTest;
