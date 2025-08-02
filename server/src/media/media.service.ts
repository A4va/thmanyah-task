/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { searchMediaDto } from './media.dto';
import { Media } from './media.entity';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class MediaService {
  constructor(
    private readonly http: HttpService,
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
  ) {}

  async searchMedia(query: searchMediaDto): Promise<any> {
    const rawTerm = query.term;
    const term = rawTerm.toLowerCase();
    const now = new Date();
    const ttlMs = 30 * 24 * 60 * 60 * 1000;

    const existing = await this.mediaRepository.findOne({ where: { term } });

    if (existing) {
      const age = now.getTime() - new Date(existing.createdAt).getTime();
      if (age < ttlMs) {
        return {
          source: 'db',
          term,
          results: existing.results,
        };
      }
    }

    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(rawTerm)}&limit=${query.limit || 10}`;
    const res = await firstValueFrom(this.http.get(url));

    if (existing) {
      existing.results = res.data.results;
      existing.createdAt = now;
      await this.mediaRepository.save(existing);
    } else {
      const media = this.mediaRepository.create({
        term, // already lowercase
        results: res.data.results,
        createdAt: now,
      });
      await this.mediaRepository.save(media);
    }

    return {
      source: 'itunes',
      term,
      results: res.data.results,
    };
  }
}
