import search from '../../assets/search.svg'

const SearchBar = () => {
    return (
        <div className='lg:h-[120px] -mt-[50px] mx-5 lg:mx-0'>
            <div className='max-w-[960px] mx-auto shadow-xl p-5 relative bg-white rounded-lg lg:h-[88px]'>
                <div className='flex lg:flex-row flex-col'>
                <input type="text" className='h-12 lg:w-[380px] px-4' placeholder='Whats Your Next Destination?' />
                <input type="text" className='h-12 lg:w-[380px] lg:border-l border-t lg:border-t-0 lg:mt-0 mt-1 px-4' placeholder='When do you plan to depart?' />
                </div>
                <button className="primary_bg shadow-md hover:opacity-85 text-white px-6 py-3 lg:top-5 lg:absolute right-5 rounded-lg text-[18px] w-full lg:w-auto mt-2 lg:mt-0 ">
               <div className='flex gap-1.5 justify-center'>
               <img src={search} alt="" />   Search
               </div>
                </button>
            </div>
        </div>
    );
};

export default SearchBar;