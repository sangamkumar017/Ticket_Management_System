import { useEffect, useState } from 'react'

const useTableFilter = (initialTableData: any, toFilterObject: any) => {
  const [filteredTableData, setFilteredTableData] = useState<any>([])
  const [filterPossible, setFilterPossible] = useState<boolean>(false)

  useEffect(() => {
    const nonEmptyToFilter = Object.keys(toFilterObject).filter(
      (keys) => toFilterObject[keys].array?.length !== 0
    )
    if (nonEmptyToFilter.length === 0) {
      setFilterPossible(false)
      return
    }
    const dummyFilteredArray: any = []
    initialTableData?.forEach((initialTableDataItem: any) => {
      const resultResultArray: any = []
      nonEmptyToFilter.forEach((toFilterObjectKeys) => {
        resultResultArray.push(
          toFilterObject[toFilterObjectKeys].array.includes(
            initialTableDataItem?.[toFilterObject[toFilterObjectKeys].type]
          )
        )
      })
      const allTrue = resultResultArray.every(
        (element: any) => element === true
      )
      if (allTrue) {
        dummyFilteredArray.push(initialTableDataItem)
        setFilterPossible(true)
      }
    })
    if (dummyFilteredArray) {
      setFilteredTableData(dummyFilteredArray)
    }
  }, [toFilterObject])

  if (filteredTableData.length !== 0) {
    return [filteredTableData, 'Found', filterPossible]
  } else {
    return [filteredTableData, 'Found', filterPossible]
  }
}

export default useTableFilter
