import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import {
  countriesOrderByVatAsc,
  countriesOrderByVatDesc,
  mockConfigService,
  mockCountriesResponse,
  mockSimpleArray,
} from '../test/mocks';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        AppService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    appService = app.get<AppService>(AppService);
    jest
      .spyOn(appService, 'fetchCountriesJson')
      .mockResolvedValue(mockCountriesResponse);
  });

  describe('countries', () => {
    it('should return all countries in vat ascending order if filter is not provided', async () => {
      const countries = await appService.countries({});

      expect(countries).toEqual(countriesOrderByVatAsc);
    });

    it('should return all countries in vat descending order if order is equal to "desc"', async () => {
      const countries = await appService.countries({ order: 'desc' });

      expect(countries).toEqual(countriesOrderByVatDesc);
    });

    it('should return all countries that include filter word in their code or country name', async () => {
      const countries = await appService.countries({ filter: 'ee' });

      const expectedCountries = [
        { country: 'Estonia', code: 'EE', vat: 20 },
        { country: 'Greece', code: 'EL', vat: 24 },
      ];

      expect(countries).toEqual(expectedCountries);
    });
  });

  describe('reverseWord', () => {
    it('should reverse word with all vowels in uppercase', () => {
      const inputWord = 'hello';
      const expectedWord = 'OllEh';

      const reversed = appService.reverseWord(inputWord);

      expect(reversed).toEqual(expectedWord);
    });
  });

  describe('append', () => {
    it('should return environment variable SIMPLE_ARRAY if both query parameters are not provided', () => {
      const resultingArray = appService.append({});

      expect(resultingArray).toEqual(mockSimpleArray);
    });

    it('should append start and end parameters properly', () => {
      const start = 'mockStart';
      const end = 'mockEnd';
      const resultingArray = appService.append({ start, end });

      expect(resultingArray).toEqual([start, ...mockSimpleArray, end]);
    });
  });
});
