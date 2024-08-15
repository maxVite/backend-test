import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppendQuery, CountryQuery, CountryResponseDto } from './app.dto';

const mockResponse = (): CountryResponseDto => ({
  record: [
    {
      country: 'Austria',
      code: 'AT',
      vat: 20,
    },
    {
      country: 'Belgium',
      code: 'BE',
      vat: 21,
    },
    {
      country: 'Bulgaria',
      code: 'BG',
      vat: 20,
    },
    {
      country: 'Croatia',
      code: 'HR',
      vat: 25,
    },
    {
      country: 'Cyprus',
      code: 'CY',
      vat: 19,
    },
    {
      country: 'Czech Republic',
      code: 'CZ',
      vat: 21,
    },
    {
      country: 'Denmark',
      code: 'DK',
      vat: 25,
    },
    {
      country: 'Estonia',
      code: 'EE',
      vat: 20,
    },
    {
      country: 'Finland',
      code: 'FI',
      vat: 24,
    },
    {
      country: 'France',
      code: 'FR',
      vat: 20,
    },
    {
      country: 'Germany',
      code: 'DE',
      vat: 19,
    },
    {
      country: 'Greece',
      code: 'EL',
      vat: 24,
    },
    {
      country: 'Hungary',
      code: 'HU',
      vat: 27,
    },
    {
      country: 'Ireland',
      code: 'IE',
      vat: 23,
    },
    {
      country: 'Italy',
      code: 'IT',
      vat: 22,
    },
    {
      country: 'Latvia',
      code: 'LV',
      vat: 21,
    },
    {
      country: 'Lithuania',
      code: 'LT',
      vat: 21,
    },
    {
      country: 'Luxembourg',
      code: 'LU',
      vat: 17,
    },
    {
      country: 'Malta',
      code: 'MT',
      vat: 18,
    },
    {
      country: 'Netherlands',
      code: 'NL',
      vat: 21,
    },
    {
      country: 'Poland',
      code: 'PO',
      vat: 23,
    },
    {
      country: 'Portugal',
      code: 'PT',
      vat: 23,
    },
    {
      country: 'Romania',
      code: 'RO',
      vat: 20,
    },
    {
      country: 'Slovakia',
      code: 'SK',
      vat: 20,
    },
    {
      country: 'Slovenia',
      code: 'SI',
      vat: 22,
    },
    {
      country: 'Spain',
      code: 'ES',
      vat: 21,
    },
    {
      country: 'Sweden',
      code: 'SW',
      vat: 25,
    },
    {
      country: 'United Kingdom',
      code: 'GB',
      vat: 20,
    },
  ],
  metadata: {
    id: '5f69afbe65b18913fc510ce8',
    private: false,
    createdAt: '2020-09-22T08:03:10.012Z',
  },
});

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

  async reverseWord(word: string) {
    const reversed = word
      .split('')
      .reverse()
      .map((char) => (VOWELS.includes(char) ? char.toUpperCase() : char))
      .join('');

    return reversed;
  }

  async append({ start, end }: AppendQuery) {
    const result: string[] = [];

    if (start !== undefined) result.push(start);

    result.push(...this.SIMPLE_ARRAY);

    if (end !== undefined) result.push(end);

    return result;
  }
}
