import axios from "axios";

export class WordService {
  private static baseUrl: string =
    "https://random-word-api.vercel.app/api?words=1&length=";

  public static getRandomWord = (wordLength: number = 6) => {
    const url: string = `${this.baseUrl}${wordLength}`;

    return axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
