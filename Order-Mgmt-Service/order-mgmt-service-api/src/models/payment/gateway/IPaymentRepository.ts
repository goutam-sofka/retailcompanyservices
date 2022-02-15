export interface IPaymentRepository{
    validatePayment(id:string,amount:number):Promise<boolean>;
}