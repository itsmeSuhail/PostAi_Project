import { v4 as uuidv4 } from "uuid";
export default function toObject(obj: any) {
  return obj.reduce((result: any, { key, value }: any) => {
    if (key !== "") result[key] = value
    return result;
  }, {});
};

export function reverseToKeyValue(obj: object) {
  return Object.entries(obj).map(([key, value], index) => {
    return {
      key, value,
      id: uuidv4(),
    }
  })
};
export const detectType = (data: any) => {
  if (typeof data == "object") {
    return JSON.stringify(data, null, 2)
  }
  return data
}