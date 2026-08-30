export default function ProductSort() {
  return (
    <select className="py-2 px-2 border-2 text-sm border-gray-300 active:border-2 active:border-gray-300 outline-none">
      <option value="relevant">Sort by: Relevant</option>
      <option value="low-high">Sort by: Low to High</option>
      <option value="high-low">Sort by: High to Low</option>
    </select>
  );
}
