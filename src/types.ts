export interface IApplicationState {
  ui: IUIDuckState,
  signalk: ISignalKDuckState
}

export interface IAppPropType {
  paths: {
    [path:string]: number|{[key:string]:number}
  }
}

export interface IUIDuckState {
  connected: boolean
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
