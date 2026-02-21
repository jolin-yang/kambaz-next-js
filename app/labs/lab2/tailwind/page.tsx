import "./index.css";
import TailwindSpacing from "./TailwindSpacing";
import TailwindTypography from "./TailwindTypography";
import TailwindBackgroundColors from "./TailwindBackgroundColors";
import TailwindResponsiveDesign from "./TailwindResponsiveDesign";
import TailwindFilters from "./TailwindFilters";
import TailwindGrids from "./TailwindGrids";

export default function TailwindLab() {
 return (
    <div>
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-8">Tailwind CSS</h1>
        </div>
    <TailwindSpacing />
    <br />
    <TailwindTypography />
    <br />
    <TailwindBackgroundColors />
    <br />
    <TailwindResponsiveDesign />
    <br /><br />
    <TailwindFilters />
    <br /><br />
    <TailwindGrids />
   </div>
 );
}

