import { CardProduct } from "@/components/card-product";
import { getCookie } from "@/lib/helper";
import Link from "next/link"; // ✅ fix import Link

export interface AllProductResponse {
  status: boolean;
  message: string;
  data: Product[];
}

export interface Product {
  id: number;
  nama_barang: string;
  deskripsi: string;
  stok: number;
  harga: number;
  image: string;
}

async function getProducts(): Promise<Product[]> {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/getbarang`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${await getCookie("token")}`,
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      return [];
    }
    return responseData?.data as Product[];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function ProductPage() {
  const product = await getProducts();
  return (
    <div className="w-full p-3">
      <Link href="/admin/product/add" className="my-3">
        <button
          type="button"
          className="bg-green-50 text-green-500 border border-green-500 px-3 py-1 rounded my-5 cursor-pointer"
        >
          Add New Product
        </button>
      </Link>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {product.map((product) => (
          <CardProduct
            key={`product-${product.id}`}
            name={product.nama_barang}
            price={product.harga}
            image={product.image}
            description={product.deskripsi}
          ></CardProduct>
        ))}
      </div>
    </div>
  );
}