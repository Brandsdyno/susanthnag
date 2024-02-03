import axios from "axios";

export async function getMethod(url, payload = null) {
  let config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  let response = null;

  try {
    const res = await axios.get(url, payload);
    response = res;
  } catch (error) {
    console.log({ error });
    response = error;
  }
  return response;
}
