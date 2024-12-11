/* eslint-disable react/no-unescaped-entities */
import blogDetailsImage from "../../assets/Images/blogDetails.jpg"
import HeroScetion from "../../Shared/HeroComponent/HeroScetion";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";

const Policy = () => {
    const heroContent = {
        heroImage: blogDetailsImage,
        titleOne: "Privacy policy",
        descriptionOne: "Your Data, Our Commitment to Transparency and Security",
    }

    return (
        <div>
            <HeroScetion heroContent={heroContent} />

            <div className="bg-[#FFFFFF] py-20">
                <ParentComponent>
                    <div className="grid grid-cols-12 lg:gap-5 xl:gap-20 grid-cols-reverse">
                        <div className="col-span-12 lg:col-span-9 lg:order-1 lg:pl-16 border-[#62D3D4] lg:border-l ">
                            <div >

                                <h2 className=" text-[24px] md:text-[32px] font-bold text-[#141D2A] mb-8 ">
                                    Information on the Processing of Personal Data for Candidates pursuant to Art. 13 of EU Regulation 2016/679
                                </h2>

                                <p className="text-[#72777F]" >We protect your personal data during the selection process: here’s how we handle the information you provide through the "Work with Us" portal.</p>

                                <div className="mt-8">
                                    <h2 className="text-[#141D2A] font-bold " >1. Data Controller</h2>
                                    <p className="text-[#72777F] mt-1" >[Company Name], located at [Company Address], is the Data Controller of the personal data provided by candidates through the "Work with Us" portal for the purposes of selection and evaluation of applications.</p>
                                </div>
                                <div className="mt-8">
                                    <h2 className="text-[#141D2A] font-bold " >2. Types of Data Collected</h2>
                                    <p className="text-[#72777F] mt-1" >In the application process, we collect personal data such as first name, last name, email address, phone number, curriculum vitae, and relevant information voluntarily provided by the candidate for the assessment of their professional profile.</p>
                                </div>
                                <div className="mt-8">
                                    <h2 className="text-[#141D2A] font-bold " >3. Purpose of Processing</h2>
                                    <p className="text-[#72777F] mt-1" >Personal data is processed solely to manage applications for open job positions, evaluate the qualifications and experiences of candidates, and, if applicable, to propose future opportunities in line with the candidate's profile.</p>
                                </div>
                                <div className="mt-8">
                                    <h2 className="text-[#141D2A] font-bold " >4. Legal Basis for Processing</h2>
                                    <p className="text-[#72777F] mt-1" >The processing of data is based on the execution of pre-contractual measures at the request of the candidate (Art. 6, par. 1, lett. b of the GDPR). Providing data is optional, but refusal may make it impossible to complete the selection process.</p>
                                </div>
                                <div className="mt-8">
                                    <h2 className="text-[#141D2A] font-bold " >5. Methods of Processing and Data Retention</h2>
                                    <p className="text-[#72777F] mt-1" >Data is processed electronically and, where necessary, in paper form, in compliance with the principles of fairness, legality, and transparency, ensuring security and confidentiality. Data will be retained for a maximum period of [specify duration] from collection or until the purposes for which it was collected are fulfilled.</p>
                                </div>
                                <div className="mt-8">
                                    <h2 className="text-[#141D2A] font-bold " >6. Rights of the Data Subject</h2>
                                    <p className="text-[#72777F] mt-1" >The candidate has the right to exercise a series of rights recognized by the General Data Protection Regulation (GDPR) in Articles 15-22, including.</p>

                                    <ul className="" >
                                        <li> <span className="text-[#141D2A]  " >Right of Access:</span> to obtain confirmation as to whether or not personal data concerning them is being processed and, if so, to access such data. </li>
                                    </ul>
                                </div>
                                <div className="mt-8">
                                    <h2 className="text-[#141D2A] font-bold " >7. Changes to This Privacy Notice</h2>
                                    <p className="text-[#72777F] mt-1" >This privacy notice may be updated periodically to reflect any changes in regulations, our data processing processes, or our business practices. Any changes made will be communicated through publication on the "Work with Us" portal so that candidates can always be informed of the most recent aspects related to the protection of their personal data. We encourage all candidates to regularly check this section to stay informed of updates and ensure full awareness of their rights and the processing methods.</p>
                                </div>

                                sk_test_51HwWHRCeMjBQYGyCJoqZ0VMflLoGGxaFrxqbmIBo2XreSB7MohnauPYcAq9IXvp9HFGfylCpiRs3z8Tomapeqnl400MmBLKOhp

                            </div>
                        </div>

                        {/* ======================================  Side bar ========================== */}
                        <div className="col-span-12 lg:col-span-3 mt-5 lg:mt-0">
                            <div className="rounded-lg">
                                <h2 className="font-bold text-[22px] hover:bg-[#FDF0EA] duration-300 hover:text-[#E86731] py-[16px] px-6 rounded-md mb-2">
                                    Booking and Reservations
                                </h2>
                                <h2 className="font-bold text-[22px] hover:bg-[#FDF0EA] duration-300 hover:text-[#E86731] py-[16px] px-6 rounded-md mb-2">
                                    Travel Experience and Itinerary
                                </h2>
                                <h2 className="font-bold text-[22px] hover:bg-[#FDF0EA] duration-300 hover:text-[#E86731] py-[16px] px-6 rounded-md mb-2">
                                    Travel Experience and Itinerary
                                </h2>
                                <h2 className="font-bold text-[22px] hover:bg-[#FDF0EA] duration-300 hover:text-[#E86731] py-[16px] px-6 rounded-md mb-2">
                                    Travel Insurance and Safety
                                </h2>
                            </div>
                        </div>
                    </div>
                </ParentComponent>
            </div>

        </div>
    );
};

export default Policy;