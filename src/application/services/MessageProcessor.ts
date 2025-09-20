import { Injectable, Inject } from '@nestjs/common';
import { IMessageRepository } from '../../domain/repositories/IMessageRepository';
import { Message } from '../../domain/entities/Message';
import axios from 'axios';

@Injectable()
export class MessageProcessor {
  constructor(
    @Inject('IMessageRepository') private readonly messageRepo: IMessageRepository
  ) {}

  async process(message: Message) {
    try {

      console.log(message)
      // Primero envía a Lambda
      //  await axios.post(process.env.LAMBDA_URL!, message);

      // Luego guarda en el repositorio
      // await this.messageRepo.save(message);

      console.log('Mensaje procesado con éxito');
    } catch (error) {
      console.error('Error procesando mensaje:', error);
    }
  }
}
