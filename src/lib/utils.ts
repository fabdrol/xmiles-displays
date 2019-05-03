export function isLeaf (mixed:any):boolean {
  if (mixed && typeof mixed === 'object' && mixed.hasOwnProperty('value')) {
    return true
  }

  return false
}

export function flatten (tree:any, prefix:string = '') {
  const keys:string[] = Object.keys(tree)
  const output:any = {}

  keys.forEach((key:string) => {
    const value:any = tree[key]

    if (prefix !== '') {
      key = `${prefix}.${key}`
    }

    if (value && typeof value === 'object' && !isLeaf(value)) {
      const child:any = flatten(value)
      const childKeys:string[] = Object.keys(child)

      childKeys.forEach((subkey:string) => {
        output[`${key}.${subkey}`] = child[subkey]
      })
    } else {
      output[key] = value
    }
  })

  return output
}

export function sleep (timeout:number, result:any = undefined):Promise<any> {
  return new Promise(resolve => setTimeout(() => resolve(result), timeout))
}
