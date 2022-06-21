import { IEvent } from '../EventSummary/IEvent';

export const chunkifyArray = (inputArray: IEvent[], noOfEventsPerSlide: number) =>  
  inputArray.reduce((resultArray, item, index) => { 
    const chunkIndex = Math.floor(index/noOfEventsPerSlide)
    if(!resultArray[chunkIndex]) {
      // @ts-ignore
      resultArray[chunkIndex] = [] // start a new slider
    }
    // @ts-ignore
    resultArray[chunkIndex].push(item)
    return resultArray
  }, [])
