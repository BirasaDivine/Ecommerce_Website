import { assets } from "../../assets/frontend_assets/assets";
import { CATEGORIES, SUB_CATEGORIES } from "../../mocks/categories";
import type { Category, SubCategory } from "../../mocks/categories";

interface FilterSidebarProps {
  maxPrice: string;
  onMaxPriceChange: (value: string) => void;
  selectedCategories: Category[];
  onToggleCategory: (cat: Category) => void;
  selectedSubCategories: SubCategory[];
  onToggleSubCategory: (sub: SubCategory) => void;
}

export default function FilterSidebar({
  maxPrice,
  onMaxPriceChange,
  selectedCategories,
  onToggleCategory,
  selectedSubCategories,
  onToggleSubCategory,
}: FilterSidebarProps) {
  return (
    <div className="min-w-60">
      <p className="my-2 text-xl flex items-center cursor-pointer gap-2">
        FILTER OPTIONS
        <img src={assets.dropdown_icon} className="h-3 sm:hidden" alt="Toggle filters" />
      </p>

      <div className="border border-gray-300 pl-5 py-3 mt-6">
        <p className="mb-3 text-sm font-medium">CATEGORIES</p>
        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
          {CATEGORIES.map((cat) => (
            <p key={cat} className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={cat}
                checked={selectedCategories.includes(cat)}
                onChange={() => onToggleCategory(cat)}
              />{" "}
              {cat}
            </p>
          ))}
        </div>
      </div>

      <div className="border border-gray-300 pl-5 py-3 my-5">
        <p className="mb-3 text-sm font-medium">TYPE</p>
        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
          {SUB_CATEGORIES.map((sub) => (
            <p key={sub} className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={sub}
                checked={selectedSubCategories.includes(sub)}
                onChange={() => onToggleSubCategory(sub)}
              />{" "}
              {sub}
            </p>
          ))}
        </div>
      </div>

      <div className="border border-gray-300 pl-5 py-3 my-5">
        <p className="mb-3 text-sm font-medium">MAX PRICE</p>
        <input
          type="number"
          min={0}
          placeholder="Any"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(e.target.value)}
          className="w-4/5 border border-gray-300 px-2 py-1 text-sm outline-none"
        />
      </div>
    </div>
  );
}
