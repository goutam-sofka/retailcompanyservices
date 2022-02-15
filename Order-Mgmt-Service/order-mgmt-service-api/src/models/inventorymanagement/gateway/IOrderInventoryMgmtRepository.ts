export interface IOrderInventoryMgmtRepository{
    hasInventory(itemId:string,qty:number):Promise<boolean>;
    reserveInventory(itemId:string,qty:number):Promise<boolean>;
}