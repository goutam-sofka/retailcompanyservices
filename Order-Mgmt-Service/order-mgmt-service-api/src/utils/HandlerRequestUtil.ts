import { RecordKeeperUtil } from "./RecordKeeperUtil";
import { APIError } from "apilove";

export class HandlerRequestUtil {
    public static async tryCatchWrapper<T>(fn: () => Promise<T> | T): Promise<T> {
        try {
            return await fn();
        } catch (error) {
            RecordKeeperUtil.record("Uncontrolled Exception", error);
            throw APIError.createAPIFriendlyError(error.message, error.statusCode);
        }
    }
}
