import { Injectable } from '@nestjs/common';
import * as net from 'net';
import { MessageProcessor } from '../../application/services/MessageProcessor';
import { parseStringPromise } from 'xml2js';
import { Message } from '../../domain/entities/Message';

@Injectable()
export class TcpListener {
  constructor(private readonly processor: MessageProcessor) {}

  start() {
    const server = net.createServer(socket => {
      let buffer = '';

      socket.on('data', async (data) => {
        buffer += data.toString();

        // Procesar todos los ClinicalEvent completos en el buffer
        let startIdx = buffer.indexOf('<ClinicalEvent>');
        let endIdx = buffer.indexOf('</ClinicalEvent>') + '</ClinicalEvent>'.length;

        while (startIdx !== -1 && endIdx !== -1) {
          const xmlEvent = buffer.substring(startIdx, endIdx).trim();
          buffer = buffer.substring(endIdx); // recortamos el buffer

          try {
            const e = await parseStringPromise(xmlEvent, { explicitArray: false, trim: true });
            const ce = e.ClinicalEvent;

            const msg = new Message(
              ce.MessageId?.trim(),
              Number(ce.SequenceNum),
              ce.Type?.trim(),
              Number(ce.MessagePriority),
              ce.EventTime?.trim(),
              ce.PatientInfo?.Name?.trim(),
              ce.PatientInfo?.ID1?.trim(),
              ce.PatientInfo?.ID2?.trim(),
              ce.BedInfo?.Name?.trim(),
              ce.BedInfo?.NodeId?.trim(),
              ce.UnitName?.trim(),
              ce.EventData?.trim(),
              ce.AlarmPriority ? Number(ce.AlarmPriority) : undefined,
              xmlEvent,
            );

            await this.processor.process(msg);
          } catch (err) {
            console.error('Error parseando mensaje XML:', err);
          }

          startIdx = buffer.indexOf('<ClinicalEvent>');
          endIdx = buffer.indexOf('</ClinicalEvent>') + '</ClinicalEvent>'.length;
        }
      });
    });

    server.listen(Number(process.env.TCP_PORT || 6868), () => {
      console.log('TCP Listener corriendo en puerto', process.env.TCP_PORT || 6868);
    });
  }
}
