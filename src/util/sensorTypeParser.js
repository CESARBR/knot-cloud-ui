const sensorType = {
  0: {
    measure: 'NONE',
    unit: ['']
  },
  1: {
    measure: 'Voltage',
    unit: ['V', 'mV', 'kV']
  },
  2: {
    measure: 'Current',
    unit: ['A', 'mA']
  },
  3: {
    measure: 'Resistance',
    unit: ['Ohms']
  },
  4: {
    measure: 'Power',
    unit: ['W', 'kW', 'MW']
  },
  5: {
    measure: 'Temperature',
    unit: ['C', 'F', 'K']
  },
  6: {
    measure: 'Relative Humidity',
    unit: ['UR']
  },
  7: {
    measure: 'Luminosity',
    unit: ['LM', 'CD', 'LX']
  },
  8: {
    measure: 'Time',
    unit: ['s', 'ms', 'μs']
  },
  9: {
    measure: 'Mass',
    unit: ['kg', 'g', 'lb', 'oz']
  },
  10: {
    measure: 'Pressure',
    unit: ['Pa', 'PSI', 'bar']
  },
  11: {
    measure: 'Distance',
    unit: ['cm', 'mi', 'in']
  },
  12: {
    measure: 'Angle',
    unit: ['deg', 'rad']
  },
  13: {
    measure: 'Volume',
    unit: ['L', 'mL', 'Fl. Oz', 'gal']
  },
  14: {
    measure: 'Area',
    unit: ['m²', 'ha', 'ac']
  },
  15: {
    measure: 'Rain',
    unit: ['mm']
  },
  16: {
    measure: 'Density',
    unit: ['kg/m³']
  },
  17: {
    measure: 'Latitude',
    unit: ['degree']
  },
  18: {
    measure: 'Longitude',
    unit: ['degree']
  },
  19: {
    measure: 'Speed',
    unit: ['m/s', 'cm/s', 'km/h', 'mi/h']
  },
  20: {
    measure: 'Volume Flow',
    unit: ['m³/s', 'SCMM', 'L/s', 'L/m', 'ft³/s', 'gal/m']
  },
  21: {
    measure: 'Energy',
    unit: ['J', 'Nm', 'Wh', 'kWh', 'cal', 'kcal']
  },
  65520: {
    measure: 'Presence',
    unit: [' ']
  },
  65521: {
    measure: 'Switch',
    unit: [' ']
  },
  65522: {
    measure: 'Command',
    unit: [' ']
  }
};

export default sensorType;
