export class Message {
  constructor(
    public messageId: string,
    public sequenceNum: number,
    public type: string,
    public messagePriority: number,
    public eventTime: string,
    public patientName: string,
    public patientId1: string,
    public patientId2: string,
    public bedName?: string,
    public bedNodeId?: string,
    public unitName?: string,
    public eventData?: string,
    public alarmPriority?: number,
    public rawXml?: string,
  ) {}
}
