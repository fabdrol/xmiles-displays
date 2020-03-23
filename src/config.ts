export const SK_HOST = 'hq.decipher.digital'
export const SK_PORT = 443
// export const SK_HOST = '192.168.0.100'
// export const SK_PORT = 3000
export const SK_USERNAME = 'xmiles@decipher.industries'
export const SK_PASSWORD = 'xmiles2020'
export const SK_AUTH = true
export const IDENTITY = 'starboard'
/*
  navigation.headingTrue
  environment.depth.belowTransducer
  environment.depth.belowKeel
  environment.depth.belowSurface
  navigation.courseOverGroundMagnetic
  environment.water.temperature
  environment.outside.temperature
  environment.wind.directionTrue
  environment.wind.directionMagnetic
  environment.wind.angleApparent
  environment.wind.speedApparent
  environment.wind.speedTrue
  environment.wind.angleTrueGround
  environment.wind.angleTrueWater
  environment.wind.speedOverGround
*/
export default {
  'tanks.fuel.0.currentLevel': {
    conversion: 'percentage',
    label: 'Tank %',
    postfix: ''
  },

  'navigation.headingTrue': {
    conversion: 'degrees',
    label: 'Heading (T)',
    postfix: '°'
  },
  
  'environment.depth.belowTransducer': {
    conversion: null,
    label: 'Depth (sonar)',
    postfix: null
  },
  
  'environment.depth.belowKeel': {
    conversion: null,
    label: 'Depth (keel)',
    postfix: null
  },
  
  'environment.depth.belowSurface': {
    conversion: null,
    label: 'Depth (surface)',
    postfix: null
  },
  
  'navigation.courseOverGroundMagnetic': {
    conversion: 'degrees',
    label: 'COG (M)',
    postfix: '°'
  },
  
  'environment.water.temperature': {
    conversion: 'temperature',
    label: 'Water',
    postfix: '°C'
  },
  
  'environment.outside.temperature': {
    conversion: 'temperature',
    label: 'Outside',
    postfix: '°C'
  },
  
  'environment.wind.directionTrue': {
    conversion: 'degrees',
    label: 'Wind direction (T)',
    postfix: '°'
  },
  
  'environment.wind.directionMagnetic': {
    conversion: 'degrees',
    label: 'Wind direction (M)',
    postfix: '°'
  },
  
  'environment.wind.angleApparent': {
    conversion: 'degrees',
    label: 'Wind angle (A)',
    postfix: '°'
  },
  
  'environment.wind.speedApparent': {
    conversion: 'knots',
    label: 'Wind speed (A)',
    postfix: null
  },
  
  'environment.wind.speedTrue': {
    conversion: 'knots',
    label: 'Wind speed (T)',
    postfix: null
  },
  
  'environment.wind.angleTrueGround': {
    conversion: 'degrees',
    label: 'Wind angle/ground (T)',
    postfix: '°'
  },
  
  'environment.wind.angleTrueWater': {
    conversion: 'degrees',
    label: 'Wind angle/water (T)',
    postfix: '°'
  },
  
  'environment.wind.speedOverGround': {
    conversion: 'knots',
    label: 'SOG',
    postfix: null
  },

  'navigation.courseOverGroundTrue': {
    conversion: 'degrees',
    label: 'COG (T)',
    postfix: '°'
  },
  'navigation.headingMagnetic': {
    conversion: 'degrees',
    label: 'Heading (M)',
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
