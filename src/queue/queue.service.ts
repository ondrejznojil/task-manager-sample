// queue.service.ts

import { Injectable } from '@nestjs/common';
import * as kue from 'kue';
import config from '../config/config';

@Injectable()
export class QueueService {
  private readonly queue: kue.Queue;

  constructor() {
    // Initialize the Kue queue
    this.queue = kue.createQueue({
      redis: config.redis,
    });
  }

  getQueue(): kue.Queue {
    return this.queue;
  }
}
