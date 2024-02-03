let Apikey = `AIzaSyDXiHUq3ozEsO67HvJw-F2rt8UOfmOBYN8`;

function getLocationStaticImage(lat, lon) {
  let image = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&size=300x200&maptype=roadmap
    &markers=color:green%7Clabel:S%7C${lat},${lon}
    &key=${Apikey}`;

  return image;
}

export { getLocationStaticImage };
