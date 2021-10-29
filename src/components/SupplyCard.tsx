import React from "react";
import { useSupply, useFetchSupply, Status } from "providers/supply";
import { LoadingCard } from "./common/LoadingCard";
import { ErrorCard } from "./common/ErrorCard";
import { SolBalance } from "utils";
import { TableCardBody } from "./common/TableCardBody";

export function SupplyCard() {
  const supply = useSupply();
  const fetchSupply = useFetchSupply();

  // Fetch supply on load
  React.useEffect(() => {
    if (supply === Status.Idle) fetchSupply();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (supply === Status.Disconnected) {
    return <ErrorCard text="Not connected to the cluster" />;
  }

  if (supply === Status.Idle || supply === Status.Connecting)
    return <LoadingCard />;

  if (typeof supply === "string") {
    return <ErrorCard text={supply} retry={fetchSupply} />;
  }

  return (
    <>
      <div>
        <h3 className="pt-3 card-title">SUPPLY OVERVIEW</h3>
      </div>
      <div className="card">
        <div className="supply-overview-card">
          <h4 className="mt-4 ml-4">Total Supply (VLX)</h4>
          <h4 className="text-right mr-4 my-4">
            <SolBalance lamports={supply.total} maximumFractionDigits={0} />
          </h4>
        </div>
        <div className="supply-overview-card">
          <h4 className="mt-4 ml-4">Circulating Supply (VLX)</h4>
          <h4 className="text-right mr-4 my-4">
            <SolBalance lamports={supply.circulating} maximumFractionDigits={0} />
          </h4>
        </div>
        <div className="supply-overview-card">
          <h4 className="mt-4 ml-4">Non-Circulating Supply (VLX)</h4>
          <h4 className="text-right mr-4 my-4">
            <SolBalance lamports={supply.nonCirculating} maximumFractionDigits={0} />

          </h4>
        </div>
      </div>
    </>
  );
}
