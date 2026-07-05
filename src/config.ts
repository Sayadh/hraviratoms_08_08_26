// ---------------------------------------------------------------------------
// Central event configuration — edit these values to match your real event.
// ---------------------------------------------------------------------------

export const eventConfig = {
  // ISO date string used by the countdown + schedule. Change this to your date.
  dateISO: '2026-08-08T10:30:00',
  dateLabel: '2026թ. օգոստոսի 8',
  timeLabel: '10:30',
  venueName: '«Villa Saroyan» ամառանոց',
  addressLine: 'գ. Արգել, 4-րդ փողոց, տուն 2',
  // Venue coordinates (from the provided Google Maps link).
  mapsEmbedSrc: 'https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s40.374850,44.596674!6i17',
  mapsDirectionsUrl: 'https://www.google.com/maps/dir/40.3260944,45.2892146/40.374850,+44.596674/@40.3596041,44.6023793,13.17z/data=!4m7!4m6!1m1!4e1!1m3!2m2!1d44.596674!2d40.37485?entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D',
  // Yandex Navigator app deep link (opens the app directly on phones that have it installed).
  yandexNavigatorAppUrl: 'yandexnavi://build_route_on_map?lat_to=40.374850&lon_to=44.596674',
  // Web fallback if the Yandex Navigator app isn't installed.
  yandexMapsWebUrl: 'https://yandex.com/maps/?rtext=~40.374850,44.596674&rtt=auto',
  hostNames: 'Սայոյի ու Հեմիի',
} as const
