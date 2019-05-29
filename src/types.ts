export enum EWindTypes {
  APPARENT = 'apparent',
  TRUE = 'true'
}

export enum EDisplayTypes {
  WIND = 'wind',
  SAILSTEER = 'sailsteer',
  GRID1 = 'grid_1',
  GRID2 = 'grid_2',
  GRID4 = 'grid_4',
  GRID6 = 'grid_6'
}

export interface IWidgetConfig {
  label: string,
  conversion?: string,
  postfix?: string
}

export interface IApplicationState {
  ui: IUIDuckState,
  signalk: ISignalKDuckState
}

export interface IAppPropTypes {
  connected: boolean,
  display: EDisplayTypes,
  type: EWindTypes,
  widgets: string[]
}

export interface ISailSteerPropTypes {
  paths: {
    [path:string]: number|{[key:string]:number}
  },
  width: number,
  height: number,
  widgets: boolean
}

export interface IWindPropTypes {
  paths: {
    [path:string]: number|{[key:string]:number}
  },
  width: number,
  height: number,
  type: EWindTypes
}

export interface IGridPropTypes {
  width: number,
  height: number,
  widgets: string[],
  layout: EDisplayTypes,
  configs: {
    [path:string]: IWidgetConfig
  },
  paths: {
    [path:string]: number|{[key:string]:number}
  }
}

export interface IUIDuckState {
  connected: boolean,
  display: EDisplayTypes,
  windType: EWindTypes,
  widgets: string[]
}

export interface ISignalKDuckState {
  fetched: boolean,
  fetching: boolean,
  data: {
    [path: string]: ISignalKLeaf
  }
}

export interface ISignalKDeltaValue {
  path: string,
  value: number|{[key:string]:number}
}

export interface ISignalKDeltaUpdate {
  '$source'?: string,
  source?: any,
  timestamp: string,
  values: ISignalKDeltaValue[]
}

export interface ISignalKDelta {
  context?: string,
  updates: ISignalKDeltaUpdate[]
}

export interface ISignalKLeaf {
  value: number|{[key:string]:number},
  timestamp: string,
  meta: ISignalKMeta,
  '$source'?: string,
  source?: any
}

export interface ISignalKMeta {
  units?: string,
  description?: string
}

export interface IWidgetPropTypes {
  position: string,
  value: number|{[key:string]:number},
  label?: string,
  conversion?: string,
  postfix?: string
}
