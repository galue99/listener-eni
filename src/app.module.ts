import { Module } from '@nestjs/common';
import {TcpListener} from "./infrastructure/adapters/TcpListener";
import {MessageProcessor} from "./application/services/MessageProcessor";
import {InMemoryMessageRepository} from "./infrastructure/repositories/InMemoryMessageRepository";

@Module({
  providers: [
    TcpListener,
    MessageProcessor,
    { provide: 'IMessageRepository', useClass: InMemoryMessageRepository },
  ],
})
export class AppModule {
  constructor(private readonly tcpListener: TcpListener) {
    this.tcpListener.start();
  }
}
