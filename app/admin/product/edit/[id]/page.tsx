"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

type ProductType = {
  id: number;
  nama_barang: string;
  deskripsi: string;
  harga: number;
  stok: number;
  image?: string;
};

type Props = {
  product?: ProductType;
};

export default function FormEditProduct({ product }: Props) {
  const router = useRouter();

  const [namaBarang, setNamaBarang] = useState(product?.nama_barang || "");
  const [deskripsi, setDeskripsi] = useState(product?.deskripsi || "");
  const [harga, setHarga] = useState(product?.harga || 0);
  const [stok, setStok] = useState(product?.stok || 0);
  const [image, setImage] = useState<File | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!product?.id) {
      toast.error("Product tidak ditemukan");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nama_barang", namaBarang);
      formData.append("deskripsi", deskripsi);
      formData.append("harga", String(harga));
      formData.append("stok", String(stok));

      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/updatebarang/${product.id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result?.message || "Gagal update product");
        return;
      }

      toast.success("Product berhasil diupdate");

      setTimeout(() => {
        router.push("/admin/product");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div>
        <label className="block mb-1 font-medium">Nama Barang</label>
        <input
          type="text"
          value={namaBarang}
          onChange={(e) => setNamaBarang(e.target.value)}
          className="w-full border border-rose-200 p-2 rounded-lg"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Deskripsi</label>
        <textarea
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          className="w-full border border-rose-200 p-2 rounded-lg"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Harga</label>
        <input
          type="number"
          value={harga}
          onChange={(e) => setHarga(Number(e.target.value))}
          className="w-full border border-rose-200 p-2 rounded-lg"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Stok</label>
        <input
          type="number"
          value={stok}
          onChange={(e) => setStok(Number(e.target.value))}
          className="w-full border border-rose-200 p-2 rounded-lg"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Image</label>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setImage(e.target.files[0]);
            }
          }}
          className="w-full border border-rose-200 p-2 rounded-lg"
        />
      </div>

      <button
        type="submit"
        className="bg-rose-400 hover:bg-rose-500 text-white px-4 py-2 rounded-lg"
      >
        Update Product
      </button>
    </form>
  );
}