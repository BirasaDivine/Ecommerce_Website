interface ProductDescriptionProps {
  description: string;
}

export default function ProductDescription({ description }: ProductDescriptionProps) {
  return (
    <div className="mt-20">
      <div className="flex">
        <b className="border px-5 py-3 text-sm">Description</b>
      </div>
      <div className="flex flex-col gap-4 border p-6 text-sm text-gray-500">
        <p>{description}</p>
      </div>
    </div>
  );
}
