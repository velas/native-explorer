import React from "react";
import { TopAccountsCard } from "components/TopAccountsCard";
import { SupplyCard } from "components/SupplyCard";

export function SupplyPage() {
  return (
    <div className="container-fluid mt-4">
        <div className="row">
            <div className="col-12 col-lg-4 col-xl-3">
              <SupplyCard />
            </div>
            <div className="col-12 col-lg-8 col-xl-9">
              <TopAccountsCard />
            </div>
        </div>
    </div>
  );
}
