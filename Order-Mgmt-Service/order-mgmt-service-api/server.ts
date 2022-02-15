import { APILove } from "apilove";
import cors from "cors";

const API_VERSION = 1;

// This is the only part that is required.
const APIS = [
    {
        require: "./src/entrypoints/apis/OrderMgmtAPI",
        apiPath: `/api/v${API_VERSION}/ordermgmt`
    }
];

export const handler = APILove.start({
    middleware: [
        cors()
    ],
    apis: APIS
});
