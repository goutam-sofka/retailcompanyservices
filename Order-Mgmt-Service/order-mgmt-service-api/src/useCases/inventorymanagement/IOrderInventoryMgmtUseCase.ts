export interface IOrderInventoryMgmtUseCase{
    hasSufficientInventory(itemId:string,qty:number):Promise<boolean>;
    blockInventory(itemId:string,qty:number):Promise<boolean>;
}