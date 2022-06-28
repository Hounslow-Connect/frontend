import { IEvent } from '../EventSummary/IEvent';

export const chunkifyArray = (inputArray: IEvent[], noOfEventsPerSlide: number) =>
  inputArray.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / noOfEventsPerSlide);
    if (!resultArray[chunkIndex]) {
      // start a new slider
      (resultArray[chunkIndex] as IEvent[]) = [];
    }
    (resultArray[chunkIndex] as IEvent[]).push(item);
    return resultArray;
  }, []);
