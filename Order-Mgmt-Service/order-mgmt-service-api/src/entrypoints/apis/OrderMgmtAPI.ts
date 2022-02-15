import {APIEndpoint, APIParameter} from "apilove";
import { Config } from "../../configuration/Config";
import {HandlerRequestUtil} from "../../utils/HandlerRequestUtil";
import { CreateNewOrderRequest } from "../entities/CreateNewOrderRequest";
import {IOrderManagementUseCase} from "../../useCases/ordermanagement/IOrderManagementUseCase";
import {OrderManagementUseCase} from "../../useCases/ordermanagement/OrderManagementUseCase";
import { OrderInfo } from "../../models/ordermanagement/order/OrderInfo";

export class OrderMgmtAPI {
  
    @APIEndpoint({
        method: "GET",
        path: "/version"
    })
    static async getVersion(): Promise<string> {
        return Config.API_VERSION;
    }


    @APIEndpoint({
        method: "POST",
        path: "/orders"
      })
      static async handleCreateNewOrderRequest(
        @APIParameter({
          sources: ["body"],
          includeFullSource: true,
        })
        event: CreateNewOrderRequest
      ): Promise<string> {
        return await HandlerRequestUtil.tryCatchWrapper(async () => {
          const orderMgmtUseCase: IOrderManagementUseCase =
            new OrderManagementUseCase();
          return await orderMgmtUseCase.createNewOrderCommand(event.reqBody);
        });
    }


    @APIEndpoint({
      method: "GET",
      path: "/orders/:orderId"
      
    })
    static async handleGetOrderById(
        orderId: string
    ): Promise<OrderInfo> {
        return await HandlerRequestUtil.tryCatchWrapper(async () => {
          const orderMgmtUseCase: IOrderManagementUseCase =
          new OrderManagementUseCase();
            return await orderMgmtUseCase.getOrder(orderId);
        });
    }
}
