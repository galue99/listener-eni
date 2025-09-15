import { IMessageRepository } from '../../domain/repositories/IMessageRepository';
import { Message } from '../../domain/entities/Message';

export class InMemoryMessageRepository implements IMessageRepository {
  private messages: Message[] = [];

  async save(message: Message): Promise<void> {
    this.messages.push(message);
    console.log('Mensaje guardado en memoria:', message);
  }
}
