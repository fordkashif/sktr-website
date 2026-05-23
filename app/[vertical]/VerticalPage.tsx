import type { Vertical } from "@/lib/verticals";
import AthleticsPage from "@/components/verticals/AthleticsPage";
import LabsPage from "@/components/verticals/LabsPage";
import MediaPage from "@/components/verticals/MediaPage";
import VenturesPage from "@/components/verticals/VenturesPage";

export default function VerticalPage({ vertical: v }: { vertical: Vertical }) {
  switch (v.id) {
    case "athletics":
      return <AthleticsPage vertical={v} />;
    case "labs":
      return <LabsPage vertical={v} />;
    case "media":
      return <MediaPage vertical={v} />;
    case "ventures":
      return <VenturesPage vertical={v} />;
    default:
      return null;
  }
}
