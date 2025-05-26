import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";

const Routing = ({ startPoint, endPoint }) => {
  const map = useMap();
  useEffect(() => {
    if (!map) return;

    // Create custom icon for drop-off marker
    const customIcon = L.divIcon({
      className: "custom-icon",
      html: `<div style="color: #ef4444; font-size: 28px;"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    // Add routing control without the directions panel
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(startPoint[0], startPoint[1]),
        L.latLng(endPoint[0], endPoint[1]),
      ],
      routeWhileDragging: false,
      lineOptions: {
        styles: [{ color: "#22c55e", weight: 4 }],
      },
      createMarker: function () {
        return null;
      }, // Disable default markers
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
      collapsible: true,
      showAlternatives: false,
      // Remove the default instructions panel
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
        profile: "car",
      }),
      // Don't attach a container for the instructions
      containerClassName: "",
    }).addTo(map);

    // Remove the turn-by-turn panel if it appears
    const routingPanel = document.querySelector(".leaflet-routing-container");
    if (routingPanel) routingPanel.remove();

    // Add pickup circle marker
    const pickupCircle = L.circleMarker(startPoint, {
      radius: 12,
      color: "#22c55e",
      fillColor: "#22c55e",
      fillOpacity: 0.7,
    })
      .addTo(map)
      .bindPopup("Pickup Location");

    // Add drop-off custom marker
    const dropoffMarker = L.marker(endPoint, { icon: customIcon })
      .addTo(map)
      .bindPopup("Destination");

    return () => {
      routingControl.remove();
      pickupCircle.remove();
      dropoffMarker.remove();
    };
  }, [map, startPoint, endPoint]);

  return null;
};
const Map = () => {
  const hcmPosition = [10.7756587, 106.7004238];
  const startPoint = [10.762622, 106.660172];
  const endPoint = [10.7756587, 106.7004238];
  return (
    <MapContainer
      center={hcmPosition}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={true}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Routing startPoint={startPoint} endPoint={endPoint} />
    </MapContainer>
  );
};
export default Map;
