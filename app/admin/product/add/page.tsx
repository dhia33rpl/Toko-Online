"use client";
import { getCookie } from "@/lib/helper";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AddBarang = () => {
  const [nama_barang, setNamaBarang] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState(0);
  const [stok, setStok] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nama_barang", nama_barang);
    formData.append("deskripsi", deskripsi);
    formData.append("harga", harga.toString());
    formData.append("stok", stok.toString());
    formData.append("image", image || new File([], ""));
    

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/insertbarang`,
        {
          method: "POST",
          body: formData,
          headers: { Authorization: `Bearer ${await getCookie("token")}` },
        },
      );

      if (!response.ok) throw new Error("Gagal menambahkan barang");

      const data = await response.json();
      console.log(data);
      alert("Barang berhasil ditambahkan!");
      router.push("/admin/product"); //bedanya push dan replace adalah push akan menambahkan ke history sedangkan replace akan menggantikan history yang sekarang
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan, coba lagi.");
    }
  };

  return (
    <div>
      <h1>Tambah Barang</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label>Nama Barang:</label>
          <input
            type="text"
            name="nama_barang"
            className="border border-gray-300 rounded py-2"
            value={nama_barang}
            onChange={(e) => setNamaBarang(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Deskripsi:</label>
          <input
            type="text"
            name="deskripsi"
            className="border border-gray-300 rounded py-2"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Harga:</label>
          <input
            type="number"
            name="harga"
            className="border border-gray-300 rounded py-2"
            value={harga}
            onChange={(e) => setHarga(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Stok:</label>
          <input
            type="number"
            name="stok"
            className="border border-gray-300 rounded py-2"
            value={stok}
            onChange={(e) => setStok(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Image:</label>
          <input
            type="file"
            name="image"
            className="border border-gray-300 rounded py-2"
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-600"
        >
          Tambah Barang
        </button>
      </form>
    </div>
  );
};

export default AddBarang;
