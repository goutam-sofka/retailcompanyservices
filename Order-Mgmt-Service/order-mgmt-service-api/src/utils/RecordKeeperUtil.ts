import stringify from "json-stringify-safe";

export interface Record {
    time: string;
    type: string;
    isError: boolean;
    data?: object;
    tracking?: string;
}

export class RecordKeeperUtil {
    static silent = false;

    static async record(type: string, data?: object, trackingNumber?: string, isError = false): Promise<void> {
        try {
            const record: Record = {
                time: new Date().toISOString(),
                type: type,
                isError: isError,
                data: data,
                tracking: trackingNumber
            };

            if (!RecordKeeperUtil.silent) {
                const recordString = stringify(record, null, 2);
                isError ? 
                    console.error(`Order-Mgmt-Service-API -> RecordKeeper -> record: ${recordString}`) : 
                    console.log(`Order-Mgmt-Service-API -> RecordKeeper -> record: ${recordString}`);
            }

        } catch (e) {
            console.error(`Order-Mgmt-Service-API -> RecordKeeper ERROR: ${e.message}, stack: ${e.stack}`);
        }
    }
}