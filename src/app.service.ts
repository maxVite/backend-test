import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppendQuery, CountryQuery, CountryResponseDto } from './app.dto';

const VOWELS = ['a', 'e', 'i', 'o', 'u'];

@Injectable()
export class AppService {
  constructor(
    private readonly config: ConfigService,
    private readonly http: HttpService,
  ) {}

  private readonly JSON_API_URL =
    this.config.getOrThrow<string>('JSON_API_URL');

  private readonly SIMPLE_ARRAY =
    this.config.getOrThrow<string[]>('SIMPLE_ARRAY');

  private isMatch = (word: string, chars: string) =>
    word.toLowerCase().includes(chars.toLowerCase());

  fetchCountriesJson = async () => {
    const { data: response } = await this.http.axiosRef.get<CountryResponseDto>(
      this.JSON_API_URL,
    );

    return response.record;
  };

  async countries({ filter: search, order = 'asc' }: CountryQuery) {
    const countries = await this.fetchCountriesJson();

    return countries
      .filter((item) => {
        if (!search) return item;
        return (
          this.isMatch(item.code, search) || this.isMatch(item.country, search)
        );
      })
      .sort((a, b) => {
        if (order === 'desc') return b.vat - a.vat;
        else return a.vat - b.vat;
      });
  }

  reverseWord(word: string) {
    const reversed = word
      .split('')
      .reverse()
      .map((char) => (VOWELS.includes(char) ? char.toUpperCase() : char))
      .join('');

    return reversed;
  }

  append({ start, end }: AppendQuery) {
    const result: string[] = [];

    if (start !== undefined) result.push(start);

    result.push(...this.SIMPLE_ARRAY);

    if (end !== undefined) result.push(end);

    return result;
  }
}
