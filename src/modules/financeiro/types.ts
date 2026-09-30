export type FinanceArea = "FARMACIA" | "LABORATORIO" | "FEIRA";

export type PurchaseStatus = "REALIZADO" | "FATURADO" | "RECEBIDO";

export interface Supplier {
  id: string;
  name: string;
  cnpj?: string;
  active: boolean;
}

export interface Product {
  id: string;
  name: string;
  activeIngredient?: string;
  concentration?: string;
  presentation?: string;
  packageDescription?: string;
  unit: string;
}

export interface PurchaseItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  subtotal: number;
}

export interface Purchase {
  id: string;
  area: Exclude<FinanceArea, "FEIRA">;
  orderDate: string;
  invoiceDate?: string;
  supplier: Supplier;
  invoiceNumber?: string;
  status: PurchaseStatus;
  discount: number;
  freight: number;
  total: number;
  items: PurchaseItem[];
}

export interface FairExpense {
  id: string;
  date: string;
  competence: string;
  supplierOrLocation?: string;
  total: number;
  notes?: string;
  attachmentName?: string;
}
