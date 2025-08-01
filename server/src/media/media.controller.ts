import { Controller, Get, Query } from '@nestjs/common';
import { MediaService } from './media.service';
import { searchMediaDto } from './media.dto';
import { ITunesSearchResponse } from '@shared/types';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  searchMedia(@Query() query: searchMediaDto): Promise<ITunesSearchResponse> {
    return this.mediaService.searchMedia(query);
  }
}
