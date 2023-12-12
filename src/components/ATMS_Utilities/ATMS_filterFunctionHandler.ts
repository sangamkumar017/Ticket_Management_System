export const ATMS_filterFunctionHandler = (
  data: Array<any>,
  searchParameter: string
) => {
  let results = []
  for (let i = 0; i < data.length; i++) {
    let object = data[i]
    for (let key in object) {
      let item = object[key]
      if (typeof item === 'string' && item.includes(searchParameter)) {
        results.push(object)
        break
      } else if (Array.isArray(item)) {
        for (let j = 0; j < item.length; j++) {
          if (
            typeof item[j] === 'string' &&
            item[j].includes(searchParameter)
          ) {
            results.push(object)
            break
          }
        }
      }
    }
  }
  return results
}
