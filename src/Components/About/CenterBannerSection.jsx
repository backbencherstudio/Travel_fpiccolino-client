import EditableHeading from "../Common/EditableHeading";

const CenterBannerSection = ({ bannerImage }) => {
  const bannerDetails = {
    image: bannerImage,
    titleTopKey: "about_banner_title",
    descriptionKeys: [
      "about_banner_desc_1",
      "about_banner_desc_2",
      "about_banner_desc_3",
      "about_banner_desc_4",
      "about_banner_desc_5",
    ],
    defaultDescription: [
      "Itinerari Personalizzati: Ogni viaggio è creato in modo unico per adattarsi ai tuoi interessi, al tuo stile e al tuo ritmo.",
      "Esperienze Esclusive: Ottieni accesso privilegiato e momenti indimenticabili che vanno oltre le guide turistiche.",
      "Pianificazione Impeccabile: Dalla prenotazione al ritorno a casa, gestiamo ogni dettaglio così che tu possa concentrarti sul godere del viaggio.",
      "Supporto 24/7: Il nostro team è qui per te in qualsiasi momento, garantendoti tranquillità ovunque tu sia.",
      "Connessioni Locali: Immergiti in esperienze autentiche e incontra le persone che rendono ogni luogo speciale.",
    ],
  };

  return (
    <>
      <EditableHeading
        titleKey="center_banner_title"
        defaultTitle="Rendiamo il Tuo Viaggio Indimenticabile"
        customTitleClass="font-duera-expanded text-[#000000] text-[30px] lg:text-[32px] font-extrabold leading-[41.6px] text-center max-w-[1345px] mx-auto px-5"
      />

      <ul className="text-[#72777F] text-[18px] text-center mt-8   max-w-[1350px] mx-auto px-5">
        {bannerDetails.descriptionKeys.map((key, index) => (
          <li className="py-2" key={index}>
            <EditableHeading
              titleKey={key}
              defaultTitle={bannerDetails.defaultDescription[index]}
              customTitleClass="text-[#72777F] text-[18px]"
            />
          </li>
        ))}
      </ul>
      <div className="relative h-[520px]">
        <img
          src={bannerImage}
          alt="banner"
          className="w-full h-full object-cover"
        />
      </div>
    </>
  );
};

export default CenterBannerSection;
