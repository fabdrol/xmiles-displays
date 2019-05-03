export const SK_HOST = 'hq.decipher.digital'
export const SK_PORT = 3000
export const SK_USERNAME = 'sdk@decipher.industries'
export const SK_PASSWORD = 'signalk'
export const SK_AUTH = true
export const IDENTITY = 'starboard'

export default {
  'navigation.courseOverGroundTrue': {
    conversion: 'degrees',
    label: 'COG',
    postfix: '°'
  },
  'navigation.headingMagnetic': {
    conversion: 'degrees',
    label: 'Heading',
    postfix: '°'
  },
  'navigation.speedOverGround': {
    conversion: 'knots',
    label: 'SOG',
    postfix: null
  },
  'navigation.speedThroughWater': {
    conversion: 'knots',
    label: 'Speed',
    postfix: null
  },
  'navigation.position': {
    conversion: null,
    label: 'Position',
    postfix: null
  }
}
