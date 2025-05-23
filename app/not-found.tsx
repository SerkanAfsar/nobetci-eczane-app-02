import img from "../public/images/nobetcilogo.svg";
import CustomImage from "@/Components/Common/CustomImage";
export default function NotFound() {
  return (
    <section className="flex min-h-full w-full flex-1 flex-col items-center justify-center gap-6 self-stretch">
      <CustomImage
        src={img}
        width={150}
        height={100}
        title="Nöbetçi Eczaneler"
      />
      <h1 className="text-3xl font-bold">404 Not Found!</h1>
      <h2 className="text-lg">Aradığınız Sayfa Bulunamadı...</h2>
    </section>
  );
}
