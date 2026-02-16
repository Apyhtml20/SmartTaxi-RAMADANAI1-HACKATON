const openGoogleNavigation = ({ originLat, originLng, destLat, destLng }) => {
  const url =
    `https://www.google.com/maps/dir/?api=1` +
    `&origin=${originLat},${originLng}` +
    `&destination=${destLat},${destLng}` +
    `&travelmode=driving`;
  window.open(url, "_blank");
};
