import { useState } from "react";
import type { Purchase, PurchaseStatus, Supplier } from "../modules/financeiro/types";

type PurchaseFormProps = {
  area: "FARMACIA" | "LABORATORIO";
  suppliers: Supplier[];
  onSubmit: (purchase: Purchase) => void;
  onCancel: () => void;
};

export function FinancePurchaseForm({ area, suppliers, onSubmit, onCancel }: PurchaseFormProps) {
  const [supplierId, setSupplierId] = useState(suppliers[0]?.id ?? "");
  const [orderDate, setOrderDate] = useState(new Date().toISOString().slice(0, 10));
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [status, setStatus] = useState<PurchaseStatus>("REALIZADO");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [unit, setUnit] = useState("UN");
  const [unitPrice, setUnitPrice] = useState("");
  const [discount, setDiscount] = useState("0");
  const [freight, setFreight] = useState("0");

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const supplier = suppliers.find((item) => item.id === supplierId) ?? suppliers[0];
    if (!supplier || !productName.trim() || !unitPrice) return;

    const parsedQuantity = Number(quantity);
    const parsedUnitPrice = Number(unitPrice);
    const parsedDiscount = Number(discount) || 0;
    const parsedFreight = Number(freight) || 0;
    const subtotal = parsedQuantity * parsedUnitPrice;
    const trimmedInvoiceNumber = invoiceNumber.trim();

    onSubmit({
      id: `demo-${Date.now()}`,
      area,
      orderDate,
      supplier,
      ...(trimmedInvoiceNumber ? { invoiceNumber: trimmedInvoiceNumber } : {}),
      status,
      discount: parsedDiscount,
      freight: parsedFreight,
      total: subtotal - parsedDiscount + parsedFreight,
      items: [{
        id: `item-${Date.now()}`,
        productId: "demo-product",
        productName: productName.trim(),
        quantity: parsedQuantity,
        unit,
        unitPrice: parsedUnitPrice,
        subtotal,
      }],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <form onSubmit={submit} className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-xl">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-base font-semibold text-slate-900">Novo pedido</h2>
          <p className="mt-1 text-xs text-slate-500">Cadastro demonstrativo local. Ainda não grava no banco.</p>
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-2">
          <label className="text-sm font-medium text-slate-700">
            Fornecedor
            <select value={supplierId} onChange={(event) => setSupplierId(event.target.value)} className="mt-1 h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm">
              {suppliers.map((supplier) => <option key={supplier.id} value={supplier.id}>{supplier.name}</option>)}
            </select>
          </label>

          <label className="text-sm font-medium text-slate-700">
            Data do pedido
            <input type="date" value={orderDate} onChange={(event) => setOrderDate(event.target.value)} className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm" />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Item
            <input required value={productName} onChange={(event) => setProductName(event.target.value)} placeholder="Nome do produto/material" className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm" />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Unidade
            <input value={unit} onChange={(event) => setUnit(event.target.value)} className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm" />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Quantidade
            <input required min="1" type="number" value={quantity} onChange={(event) => setQuantity(event.target.value)} className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm" />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Preço unitário
            <input required min="0" step="0.01" type="number" value={unitPrice} onChange={(event) => setUnitPrice(event.target.value)} className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm" />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Nota fiscal
            <input value={invoiceNumber} onChange={(event) => setInvoiceNumber(event.target.value)} placeholder="Opcional" className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm" />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Status
            <select value={status} onChange={(event) => setStatus(event.target.value as PurchaseStatus)} className="mt-1 h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm">
              <option value="REALIZADO">Pedido realizado</option>
              <option value="FATURADO">Faturado</option>
              <option value="RECEBIDO">Recebido</option>
            </select>
          </label>

          <label className="text-sm font-medium text-slate-700">
            Desconto
            <input min="0" step="0.01" type="number" value={discount} onChange={(event) => setDiscount(event.target.value)} className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm" />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Frete
            <input min="0" step="0.01" type="number" value={freight} onChange={(event) => setFreight(event.target.value)} className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm" />
          </label>
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-200 px-6 py-4">
          <button type="button" onClick={onCancel} className="h-9 rounded-md border border-slate-300 px-4 text-sm font-medium text-slate-700">Cancelar</button>
          <button type="submit" className="h-9 rounded-md bg-slate-900 px-4 text-sm font-medium text-white">Adicionar demonstração</button>
        </div>
      </form>
    </div>
  );
}
