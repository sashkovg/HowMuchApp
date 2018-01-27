export interface Transaction {
   
    id: number,
    user: string,
    date_create: Date; // required
    date_delete: Date; // required
}