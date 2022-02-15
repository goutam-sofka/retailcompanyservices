import { IPaymentRepository } from "../../models/payment/gateway/IPaymentRepository";


//This Adapter is a simple implementation. In real life this can integrate with Payment Gateways

export class PaymentAdapter implements IPaymentRepository{
    public async validatePayment(id: string, amount: number): Promise<boolean> {
        return Math.random() < 0.5;
    }
    
}