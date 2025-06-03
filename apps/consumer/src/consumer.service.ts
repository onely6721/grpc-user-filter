import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { UserServiceClient } from '@proto';
import { lastValueFrom, retry } from 'rxjs';

@Injectable()
export class ConsumerService implements OnModuleInit {
  private userService!: UserServiceClient;

  constructor(@Inject('USER_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit(): void {
    this.userService = this.client.getService<UserServiceClient>('UserService');
    if (!this.userService) {
      throw new Error('UserService not initialized');
    }
  }

  async fetchAndLogUsers(): Promise<void> {
    if (!this.userService) {
      throw new Error('UserService not initialized');
    }

    try {
      const response = await lastValueFrom(
        this.userService
          .getFilteredUsers({})
          .pipe(retry({ count: 5, delay: 1000 })),
      );

      if (response && Array.isArray(response.users)) {
        console.log('Filtered users:', response.users);
      } else {
        console.warn('Received invalid response format:', response);
      }
    } catch (error) {
      console.log(error);
      console.error(
        'Failed to fetch users:',
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  }
}
