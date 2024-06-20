import { unstable_noStore } from "next/cache";
import CabinCard from "./CabinCard";
import { getCabins } from "../_lib/data-service";

export default async function CabinList({ filter }) {
  // this will cause the entire page to rendered dynamically again
  // this will make a difference for partial prerendering. Then this component would be dynamic, but the page would be static
  // unstable_noStore();

  const cabins = await getCabins();

  if (!cabins.length) return null;

  let displayedCabins;
  if (filter === "all") displayedCabins = cabins;

  if (filter === "small") {
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  }
  if (filter === "medium") {
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );
  }
  if (filter === "large") {
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
