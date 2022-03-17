let netRef;
async function setNetRef(ref) {
  netRef = ref;
}

let positionWatchHandle;
async function UpdatePosition() {
  if (!netRef) {
    console.error("netRef is null");
    return;
  }

  if (!navigator.geolocation) {
    console.error("Has no geolocation");
    return;
  }

  if (positionWatchHandle) {
    navigator.geolocation.clearWatch(positionWatchHandle);
  }

  function success(position) {
    console.log(position.coords);

    netRef.invokeMethodAsync('SetPosition', JSON.stringify({
      Latitude: position.coords.latitude,
      Longitude: position.coords.longitude,
      Altitude: position.coords.altitude,
      Heading: position.coords.heading ?? 0,
      Accuracy: position.coords.accuracy ?? -1
    }));
  }

  positionWatchHandle = navigator.geolocation.watchPosition(success, () => {
    console.error(`Don't know where you are`);
  }, {
    enableHighAccuracy: true,
    timeout: 1000,
    maximumAge: 0
  });
}