import axios from "axios";

export class DictionaryService {
  private static baseUrl: string =
    "https://api.dictionaryapi.dev/api/v2/entries/en/";

  public static getDefinition = (word: string) => {
    const url: string = `${this.baseUrl}${word}`;

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
