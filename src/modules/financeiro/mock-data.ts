import type { FairExpense, Product, Purchase, Supplier } from "./types";

export const demoSuppliers: [Supplier, Supplier, Supplier] = [
  { id: "sup-001", name: "Distribuidora Hospitalar Norte", cnpj: "00.000.000/0001-00", active: true },
  { id: "sup-002", name: "Med Supply Nordeste", cnpj: "11.111.111/0001-11", active: true },
  { id: "sup-003", name: "LaborMed Insumos", cnpj: "22.222.222/0001-22", active: true },
];

export const demoProducts: Product[] = [
  { id: "prod-001", name: "Dipirona 500 mg", presentation: "Comprimido", packageDescription: "Caixa com 500", unit: "CX" },
  { id: "prod-002", name: "Seringa 10 ml", presentation: "Seringa descartável", packageDescription: "Caixa com 100", unit: "CX" },
  { id: "prod-003", name: "Reagente para glicemia", presentation: "Reagente", packageDescription: "Kit", unit: "KIT" },
];

export const demoPurchases: Purchase[] = [
  {
    id: "pur-001",
    area: "FARMACIA",
    orderDate: "2026-09-03",
    invoiceDate: "2026-09-04",
    supplier: demoSuppliers[0],
    invoiceNumber: "NF-DEMO-1042",
    status: "RECEBIDO",
    discount: 120,
    freight: 80,
    total: 18450.5,
    items: [
      { id: "item-001", productId: "prod-001", productName: "Dipirona 500 mg", quantity: 20, unit: "CX", unitPrice: 42.5, subtotal: 850 },
      { id: "item-002", productId: "prod-002", productName: "Seringa 10 ml", quantity: 30, unit: "CX", unitPrice: 28.9, subtotal: 867 },
    ],
  },
  {
    id: "pur-002",
    area: "FARMACIA",
    orderDate: "2026-09-12",
    supplier: demoSuppliers[1],
    status: "FATURADO",
    discount: 0,
    freight: 65,
    total: 9275,
    items: [
      { id: "item-003", productId: "prod-001", productName: "Dipirona 500 mg", quantity: 15, unit: "CX", unitPrice: 39.8, subtotal: 597 },
    ],
  },
  {
    id: "pur-003",
    area: "LABORATORIO",
    orderDate: "2026-09-08",
    invoiceDate: "2026-09-09",
    supplier: demoSuppliers[2],
    invoiceNumber: "NF-DEMO-221",
    status: "RECEBIDO",
    discount: 50,
    freight: 35,
    total: 6420,
    items: [
      { id: "item-004", productId: "prod-003", productName: "Reagente para glicemia", quantity: 8, unit: "KIT", unitPrice: 780, subtotal: 6240 },
    ],
  },
];

export const demoFairExpenses: FairExpense[] = [
  { id: "fair-001", date: "2026-09-05", competence: "09/2026", supplierOrLocation: "Feira municipal", total: 1850, notes: "Lançamento demonstrativo" },
  { id: "fair-002", date: "2026-08-07", competence: "08/2026", supplierOrLocation: "Feira municipal", total: 1720, notes: "Lançamento demonstrativo" },
  { id: "fair-003", date: "2026-07-06", competence: "07/2026", supplierOrLocation: "Feira municipal", total: 1910, notes: "Lançamento demonstrativo" },
];
