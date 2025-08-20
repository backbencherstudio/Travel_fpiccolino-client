/* eslint-disable no-unused-vars */
import { Link, useNavigate, useParams } from "react-router-dom";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import HeadLine from "../../Shared/HeadLineComponent/HeadLine";
import { GoChevronLeft } from "react-icons/go";
import "react-range-slider-input/dist/style.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import Footer from "../../Shared/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCheckout,
  getCheckout,
} from "../../features/checkout/checkoutSlice";
import moment from "moment";
import { TiDeleteOutline } from "react-icons/ti";
import { getPackageDetails } from "../../features/pckage/packageSlice";
import EditableHeading from "../../Components/Common/EditableHeading";

const Insurance = () => {
  const [selectedInsurances, setSelectedInsurances] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const { id } = useParams();
  const { checkout } = useSelector((state) => state.checkout);
  const dispatch = useDispatch();
  const params = useParams();
  const { packageDetails } = useSelector((state) => state.package);
  
  const basePackageAmount =
    checkout?.totalPackageAmount ??
    (packageDetails?.amount
      ? parseInt(packageDetails.amount) * Math.max(parseInt(checkout?.person) || 1, 1)
      : 0) + (Number(checkout?.flightPrice) || 0);
  
  console.log("Package details:", packageDetails);
  console.log("Checkout data:", checkout);
  console.log("Base package amount:", basePackageAmount);
  console.log("Person count for calculation:", Math.max(parseInt(checkout?.person) || 1, 1));
  useEffect(() => {
    if (params.id) {
      dispatch(getPackageDetails(params.id));
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    dispatch(getCheckout());
  }, [dispatch]);

  useEffect(() => {
    const personCount = Math.max(parseInt(checkout?.person) || 1, 1);
    console.log("Insurance calculation - person count:", personCount);
    
    const insuranceTotal = selectedInsurances.reduce(
      (sum, insurance) => {
        const insurancePrice = parseInt(insurance.price || 0);
        const insuranceCost = insurancePrice * personCount;
        console.log(`Insurance: ${insurance.insuranceName}, price: ${insurancePrice}, total: ${insuranceCost}`);
        return sum + insuranceCost;
      },
      0
    );
    
    // Calculate base amount properly
    let base = 0;
    if (checkout?.toureAmount != null && checkout.toureAmount > 0) {
      base = parseInt(checkout.toureAmount);
    } else if (checkout?.totalPackageAmount != null && checkout.totalPackageAmount > 0) {
      base = parseInt(checkout.totalPackageAmount);
    } else if (checkout?.flightPrice != null && checkout.flightPrice > 0) {
      base = parseInt(checkout.flightPrice);
    } else {
      base = parseInt(basePackageAmount || 0);
    }
    
    const total = (base || 0) + insuranceTotal;
    console.log("Total amount calculation:", { base, insuranceTotal, total, personCount });
    setTotalAmount(total);
  }, [checkout?.toureAmount, checkout?.totalPackageAmount, checkout?.flightPrice, selectedInsurances, checkout?.person, basePackageAmount]);

  const handleSelectInsurance = (insurance) => {
    setSelectedInsurances((prev) => {
      const isSelected = prev.some((ins) => ins._id === insurance._id);
      if (isSelected) {
        return prev.filter((ins) => ins._id !== insurance._id);
      } else {
        return [...prev, insurance];
      }
    });
  };

  console.log(checkout);
  console.log(checkout?.totalPackageAmount);

  const { toureAmount, ...data } = checkout;

  const toureData = {
    ...data,
    insurance: selectedInsurances,
    toureAmount: (() => {
      const packageAmount = Number(data?.totalPackageAmount) || 0;
      const flightAmount = Number(data?.flightPrice) || 0;
      const insuranceTotal = selectedInsurances.reduce(
        (sum, insurance) => {
          const insurancePrice = parseInt(insurance.price || 0);
          const personCount = Math.max(parseInt(data?.person) || 1, 1);
          return sum + (insurancePrice * personCount);
        },
        0
      );
      return packageAmount + flightAmount + insuranceTotal;
    })(),
    person: Math.max(Number(data?.person) || 1, 1),
    totalPackageAmount: Number(data?.totalPackageAmount) || 0,
    flightPrice: Number(data?.flightPrice) || 0,
  };
  console.log("Insurance page - tour data being saved:", toureData);
  console.log("Person field in tour data:", toureData.person);

  const navigate = useNavigate();

  const addDataFun = () => {
    dispatch(createCheckout({ ...toureData }));
    navigate(`/personalDetails`);
  };
  // console.log("==============================================")
  // console.log("Selected Insurances:", checkout?.insurance?.price);

  return (
    <div>
      <div className="pb-20">
        <ParentComponent>
          <div className="pt-20 flex">
            <Link to={`/flight/${id}`} className="flex items-center">
              <GoChevronLeft className="text-xl" />
            </Link>
            <EditableHeading
              titleKey="insurance.back"
              defaultTitle="Ritorno al volo"
              customTitleClass="text-md"
            />
          </div>
          <div className="mt-10">
            <EditableHeading
              titleKey="insurance.title"
              subtitleKey="insurance.description"
              defaultTitle="Proteggi il tuo viaggio"
              defaultSubtitle="Assicurazione completa per un viaggio senza preoccupazioni"
            />
          </div>
        </ParentComponent>

        <div className="border border-b-[#A5A5AB] mt-14"></div>

        <ParentComponent>
          <div className="grid grid-cols-12 mt-20 lg:gap-5 xl:gap-20">
            <div className="col-span-12 lg:col-span-8">
              <div>
                <h2 className="text-[#141D2A]">
                  <EditableHeading
                    titleKey="insurance.heading"
                    defaultTitle="Proteggi il tuo viaggio"
                    customTitleClass="text-[32px] font-bold"
                  />
                </h2>
                <p className="text-[#72777F] font-[18px]">
                  <EditableHeading
                    titleKey="insurance.heading2"
                    defaultTitle="Assicurazione completa per un viaggio senza preoccupazioni"
                    customTitleClass="text-[18px] font-normal"
                  />
                </p>
                {packageDetails?.insurance?.length === 0 ? (
                  <div className="mt-5 p-6 text-center border border-[#E86731] rounded-lg">
                    <p className="text-[#72777F] text-lg">
                      <EditableHeading
                        titleKey="insurance.noInsurance"
                        defaultTitle="Nessuna assicurazione disponibile per questo pacchetto"
                        customTitleClass="text-lg font-normal"
                      />
                    </p>
                  </div>
                ) : (
                  packageDetails?.insurance?.map((item) => (
                    <div
                      key={item?._id}
                      onClick={() => handleSelectInsurance(item)}
                      className={`border ${
                        selectedInsurances.some((ins) => ins._id === item._id)
                          ? "border-transparent bg-[#E867311A]"
                          : "border-[#E86731]"
                      } hover:border-transparent rounded-lg mt-5 p-6 flex flex-col md:flex-row items-center hover:bg-[#E867311A] duration-300 cursor-pointer`}
                    >
                      <div className="md:w-[90%]">
                        <h2 className="text-[#E86731]">{item.insuranceName}</h2>
                        <p className="text-[#141D2A]">
                          {item.description?.length > 200
                            ? `${item.description.substring(0, 200)}...`
                            : item.description}
                        </p>
                      </div>
                      <div className="w-[15%] md:w-[8%] flex items-center gap-2">
                        <h2 className="text-center bg-[#E867311A] py-2 text-[#E86731] font-[500] rounded">
                          +€ {item?.price}
                        </h2>
                        {selectedInsurances.some(
                          (ins) => ins._id === item._id
                        ) && <span className="text-green-600">✓</span>}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* ======================================  Side bar ========================== */}

            <div className="col-span-12 lg:col-span-4 mt-5 lg:mt-0">
              <div className="shadow-lg rounded-lg p-2 md:p-10">
                <h2 className="font-bold text-[24px] text-[#E86731]">
                  {packageDetails?.tourName}
                </h2>
                <p>
                  {checkout?.tureDuration?.days} Giorni /{" "}
                  {checkout?.tureDuration?.nights} Notti
                </p>
                <div className="border border-b-[#c8c8ce] mt-3"></div>
                <div className="mt-4">
                  <span className="flex items-start justify-between mb-3">
                    
                    {moment(checkout?.tourDate)
                      .utc()
                      .format("DD/MM/YYYY HH:mm")}
                                         <h2 className="text-[#000000] text-[18px] font-semibold text-center">
                       € = {(() => {
                         const packageAmount = Number(checkout?.totalPackageAmount) || 0;
                         const flightAmount = Number(checkout?.flightPrice) || 0;
                         return packageAmount + flightAmount;
                       })()}
                     </h2>
                  </span>
                  <span className="flex items-start justify-between mb-3">
                    <h2>
                      <EditableHeading
                        titleKey="insurance.person"
                        defaultTitle="Passeggeri"
                        customTitleClass="text-md"
                      />
                    </h2>
                    <h2 className="text-[#000000] text-[18px] font-semibold text-center">
                      {Math.max(Number(checkout?.person) || 1, 1)}
                    </h2>
                  </span>

                  {checkout?.flightPrice && (
                    <span className="flex items-start justify-between mb-3">
                      <h2 className="flex items-center">
                        <EditableHeading
                          titleKey="insurance.flight"
                          defaultTitle="Importo del volo"
                          customTitleClass="text-md"
                        />
                      </h2>
                      <h2 className="text-[#000000] text-[18px] font-semibold text-center">
                        € = {Number(checkout?.flightPrice) || 0}
                      </h2>
                    </span>
                  )}

                  {/* {checkout?.insurance?.price && (
                    <span className="flex items-start justify-between mb-3">
                      <h2 className="flex items-center">
                        <EditableHeading
                          titleKey="insurance.flight"
                          defaultTitle="Importo del volo"
                          customTitleClass="text-md"
                        />
                      </h2>
                      <h2 className="text-[#000000] text-[18px] font-semibold text-center">
                        € = {checkout?.insurance?.price}
                      </h2>
                    </span>
                  )} */}

                  {selectedInsurances.length > 0 && (
                    <>
                      {selectedInsurances.map((insurance, index) => (
                        <span
                          key={index}
                          className="flex items-start justify-between mb-3"
                        >
                          <h2 className="flex items-center relative">
                            <TiDeleteOutline
                              className="text-red-600 cursor-pointer ml-3 text-xl hover:scale-110"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectInsurance(insurance);
                              }}
                            />
                            <EditableHeading
                              titleKey="insurance.insurance"
                              defaultTitle={`Assicurazione ${index + 1}`}
                              customTitleClass="text-md"
                            />
                            <span>{index + 1}</span>
                          </h2>
                          <h2 className="text-[#000000] text-[18px] font-semibold text-center">
                            € = {insurance?.price * Math.max(Number(checkout?.person) || 1, 1)}
                          </h2>
                        </span>
                      ))}
                    </>
                  )}

                  <span className="flex items-start justify-between mb-3 border-t pt-2">
                    <h2>
                      <EditableHeading
                        titleKey="insurance.total"
                        defaultTitle="Totale"
                        customTitleClass="text-md"
                      />
                    </h2>
                                         <h2 className="text-[20px] font-semibold">
                       € = {(() => {
                         const packageAmount = Number(checkout?.totalPackageAmount) || 0;
                         const flightAmount = Number(checkout?.flightPrice) || 0;
                         const insuranceTotal = selectedInsurances.reduce(
                           (sum, insurance) => {
                             const insurancePrice = parseInt(insurance.price || 0);
                             const personCount = Math.max(parseInt(checkout?.person) || 1, 1);
                             return sum + (insurancePrice * personCount);
                           },
                           0
                         );
                         const total = packageAmount + flightAmount + insuranceTotal;
                         console.log("Insurance page total:", { packageAmount, flightAmount, insuranceTotal, total });
                         return total;
                       })()}
                     </h2>
                  </span>

                  <span className="pb-5 block">
                    <h2 className="flex items-center">
                      <FaHeart />{" "}
                      <p className="px-1 text-[#272727]">
                        <EditableHeading
                          titleKey="insurance.scalapay"
                          defaultTitle="scalapay"
                          customTitleClass="font-bold"
                        />
                      </p>{" "}
                      <CiCircleInfo />
                    </h2>
                  </span>
                </div>

                <button
                  className="text-center block border rounded-lg bg-[#E86731] px-8 py-2 mb-4 w-full"
                  onClick={() => {
                    addDataFun();
                  }}
                >
                  <EditableHeading
                    titleKey="buttons.continue4"
                    defaultTitle=" Continuare"
                    customTitleClass="text-white"
                  />
                </button>
              </div>
            </div>
          </div>
        </ParentComponent>
      </div>

      <Footer />
    </div>
  );
};

export default Insurance;
