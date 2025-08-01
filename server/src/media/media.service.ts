import { Injectable } from '@nestjs/common';
import { searchMediaDto } from './media.dto';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import type { ITunesSearchResponse } from '@shared/types';

@Injectable()
export class MediaService {
  constructor(private readonly http: HttpService) {}

  async searchMedia(query: searchMediaDto): Promise<ITunesSearchResponse> {
    const { term, limit } = query;
    const url = `https://itunes.apple.com/search?term=${term}&limit=${limit || 10}`;
    const res = await firstValueFrom(this.http.get(url));
    return res.data;
  }
}
