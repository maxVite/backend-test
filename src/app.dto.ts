import { IsIn, IsOptional, IsString } from 'class-validator';

export class AppendQuery {
  @IsOptional()
  @IsString()
  start?: string;
  @IsOptional()
  @IsString()
  end?: string;
}

export class CountryQuery {
  @IsString()
  @IsOptional()
  filter?: string;
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: OrderBy;
}

export interface CountryResponseDto {
  record: CountryDto[];
  metadata: Metadata;
}

export interface CountryDto {
  country: string;
  code: string;
  vat: number;
}

interface Metadata {
  id: string;
  private: boolean;
  createdAt: string;
}

export type OrderBy = 'asc' | 'desc';
