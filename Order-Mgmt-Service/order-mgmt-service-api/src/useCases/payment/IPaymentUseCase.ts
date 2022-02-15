export interface IPaymentUseCase{
    validatePayment(paymentId:string,paymentAmt:number):Promise<boolean>;
}