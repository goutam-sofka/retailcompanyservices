import { PaymentAdapter } from "../../adapters/payment-system/PaymentAdapter";
import { IPaymentRepository } from "../../models/payment/gateway/IPaymentRepository";
import { IPaymentUseCase } from "./IPaymentUseCase";

export class PaymentUseCase implements IPaymentUseCase{
    private readonly paymentRepository:IPaymentRepository;

    constructor(){
        this.paymentRepository=new PaymentAdapter();
    }

    public async validatePayment(paymentId: string, paymentAmt: number): Promise<boolean> {
       return await this.paymentRepository.validatePayment(paymentId, paymentAmt);
       
    }
    
}