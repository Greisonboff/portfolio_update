import { v4 as uuidv4 } from "uuid";

//add key in object
export function genereteKey() {
  const data = [{}];

  const updatedData = data.map((item) => ({
    ...item,
    key: uuidv4(),
  }));
}
