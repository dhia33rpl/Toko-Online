import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

type Props = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

export function CardProduct(props: Props) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video" />

      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${props.image}`}
        width={100}
        height={100}
        alt="Product Image"
        className="relative z-20 aspect-video w-full object-cover"
      />

      <CardHeader>
        <CardAction>
          <Badge variant="secondary">Rp {props.price}</Badge>
        </CardAction>

        <CardTitle>{props.name}</CardTitle>

        <CardDescription>{props.description}</CardDescription>
      </CardHeader>

      <CardFooter className="flex gap-2">
        <Link href={`/admin/product/edit/${props.id}`} className="w-full">
          <Button className="w-full bg-rose-200 hover:bg-rose-300">
            Edit
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}