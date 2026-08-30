export default function GoBackButton() {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      className="px-4 py-3 mb-3 cursor-pointer flex items-center gap-2 border rounded-full w-fit bg-gray-100 hover:bg-gray-200 transition-all duration-300"
    >
      <span aria-hidden>←</span>
      <span className="font-medium hidden sm:block">Go Back</span>
    </button>
  );
}
