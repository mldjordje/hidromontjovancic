import Link from "next/link";
import ServiceGalleriesPanel from "@/components/admin/service-galleries-panel";

export default function AdminServiceGalleriesPage() {
  return (
    <div className="content-section py-6 space-y-6">
      <Link href="/admin" className="text-sm font-semibold text-primary">
        Nazad na admin meni
      </Link>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-dark">Galerije usluga</h1>
        <p className="text-sm text-gray-600">Izaberi uslugu i dodaj/obrisi slike za galeriju.</p>
      </div>
      <ServiceGalleriesPanel />
    </div>
  );
}

