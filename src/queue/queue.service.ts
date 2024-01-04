// queue.service.ts

import { Injectable } from '@nestjs/common';
import * as kue from 'kue';

@Injectable()
export class QueueService {
  private readonly queue: kue.Queue;

  constructor() {
    // Initialize the Kue queue
    this.queue = kue.createQueue({
      redis: {
        host: 'redis',
        port: 6379,
      },
    });
  }

  getQueue(): kue.Queue {
    return this.queue;
  }
}
