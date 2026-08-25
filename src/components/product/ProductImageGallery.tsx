interface ProductImageGalleryProps {
  images: string[];
  activeImage: string;
  onSelect: (image: string) => void;
  alt: string;
}

export default function ProductImageGallery({
  images,
  activeImage,
  onSelect,
  alt,
}: ProductImageGalleryProps) {
  return (
    <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
      <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
        {images.map((img, index) => (
          <img
            src={img}
            alt={alt}
            key={index}
            className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 object-contain cursor-pointer"
            onClick={() => onSelect(img)}
          />
        ))}
      </div>

      <div className="w-full sm:w-[80%]">
        <img src={activeImage} alt={alt} className="w-full h-auto" />
      </div>
    </div>
  );
}
