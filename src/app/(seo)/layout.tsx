import { Footer } from "@/components/layout/footer";

export default function SEOLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
      <div className="h-20 lg:hidden" />
    </>
  );
}
