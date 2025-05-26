import SelectDestination from "./booking/SelectDestination";

const Customer = () => {
  return (
    <div className="grid grid-cols-2 h-full">
      <div className="col-span-1 flex justify-center items-center">
        <SelectDestination />
      </div>
      <div className="col-span-1 bg-emerald-500 flex justify-center items-center">
        <img src="/bg_customer_2.png" alt="" className="w-3/4" />
      </div>
    </div>
  );
};

export default Customer;
