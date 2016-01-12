

import _ from 'lodash'

const fixPath = (path) =>  ((path.substring(0,1) == '/') ? '': '/') + path

export const toJS = (data) => {

  if(data && data.toJS) {
    return data.toJS()
  }

  return data
}


export const pathToJS = (data, path) => {
  if(!data) {
    return defaultData
  }

  const pathArr = fixPath(path).split(/\//).slice(1)

  if(data.getIn) {
    return toJS(data.getIn(pathArr))
  }

  return data
}


export const dataToJS = (data, path) => {
  if(!(data && data.getIn)) {
    return data
  }

  const dataPath = '/data' + fixPath(path)

  const pathArr = dataPath.split(/\//).slice(1)

  if(data.getIn) {
    return toJS(data.getIn(pathArr))
  }

  return data
}

export const isLoaded = function () {
  if(!arguments || !arguments.length) {
    return true
  }

  return _.reduce(arguments,  (a, b) => !(a === undefined || b === undefined) )
}