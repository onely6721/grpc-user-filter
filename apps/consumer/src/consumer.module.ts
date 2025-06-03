import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConsumerService } from './consumer.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'users',
          protoPath: join(process.cwd(), 'libs/proto/users.proto'),
          url: 'localhost:50051',
        },
      },
    ]),
  ],
  providers: [ConsumerService],
})
export class AppModule {}
