import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { promises as fs } from 'fs';
import { join } from 'path';
import { FilteredUsers, User } from '@proto';

let cache: FilteredUsers | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 60 * 1000;

@Controller()
export class UserController {
  @GrpcMethod('UserService', 'GetFilteredUsers')
  async getFilteredUsers(): Promise<FilteredUsers> {
    const now = Date.now();
    if (cache && now - cacheTimestamp < CACHE_TTL) {
      console.log('cache hit');
      return cache;
    }

    const path = join(__dirname, 'data/users.json');

    try {
      const raw = await fs.readFile(path, 'utf-8');
      const users: User[] = JSON.parse(raw) as User[];
      const filtered = {
        users: users.filter((u) => u.age > 18),
      };
      cache = filtered;
      cacheTimestamp = now;
      return filtered;
    } catch (error) {
      console.error('Error reading users:', error);
      return { users: [] };
    }
  }
}
