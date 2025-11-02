import { useState, useEffect } from "react";

function MainSec() {

  const [contacts, setContacts]       = useState([]);
  const [search, setSearch]           = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("contactlist")) || [];
    setContacts(stored);
  }, []);

  function saveContact(event) {

    event.preventDefault();
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    if (!name.trim()) return alert("Name cannot be empty");
    if (!/^\d{10}$/.test(phone))
      return alert("Mobile must be exactly 10 digits");

    const curdata = JSON.parse(localStorage.getItem("contactlist")) || [];
    if (curdata.some((c) => c.phone === phone))
      return alert("This mobile number already exists");

    const updated = [...curdata, { name, phone }];
    localStorage.setItem("contactlist", JSON.stringify(updated));
    setContacts(updated);

    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";

    setShowAddForm(false);

  }

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <div className="flex flex-col h-auto md:h-[80vh] m-0 md:m-10">

      <div className="listsection w-full flex justify-center h-[100%]">
        <div className="container h-[100%] flex flex-col w-full md:w-2/3 lg:w-1/2 mx-auto bg-white rounded-lg px-8 py-10 border border-gray-200">
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search a contact..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-200 font-alumni text-base"
              />
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white text-base font-medium px-6 py-3 rounded-lg font-alumni whitespace-nowrap"
            >
              + Add Contact
            </button>
          </div>
          <div className="contactlist font-alumni flex-1 overflow-y-scroll space-y-2 pr-2">
            {filtered.length > 0 ? (
              filtered.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg">
                    {c.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 font-medium text-base mb-1">{c.name}</p>
                    <p className="text-gray-600 text-sm flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {c.phone}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <p className="text-gray-700 font-alumni text-lg font-medium mb-1">
                  {search ? "No contacts found" : "No contacts yet"}
                </p>
                <p className="text-gray-500 font-alumni text-sm">
                  {search ? "Try a different search term" : "Add your first contact to get started"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showAddForm && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowAddForm(false);
            }
          }}
        >
          <div 
            className="container bg-white rounded-lg px-10 py-12 w-full max-w-md mx-4 relative border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAddForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 text-2xl font-bold w-8 h-8 flex items-center justify-center"
              aria-label="Close"
            >
              ×
            </button>

            <h1 className="text-gray-900 font-alumni font-bold text-2xl mb-2">Add a Contact</h1>
            <p className="text-gray-600 text-sm mb-8 font-alumni">Create a new contact entry</p>

            <div className="field mb-6 font-alumni">
              <label className="block mb-2 text-base text-gray-700 font-medium" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="John Doe"
                className="w-full rounded-lg font-alumni bg-white border border-gray-300 text-gray-900 placeholder-gray-400 p-3 outline-none focus:border-blue-500 transition-colors duration-200 text-base"
              />
            </div>
            <div className="field mb-6 font-alumni">
              <label className="block mb-2 text-base text-gray-700 font-medium" htmlFor="phone">
                Mobile Number
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="1234567890"
                className="w-full rounded-lg font-alumni bg-white border border-gray-300 text-gray-900 placeholder-gray-400 p-3 outline-none focus:border-blue-500 transition-colors duration-200 text-base"
              />
            </div>
            <button
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white text-base font-medium py-3.5 rounded-lg font-alumni"
              onClick={saveContact}
            >
              Save Contact
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainSec;


// import { useState, useEffect } from "react";

// function MainSec() {
//   const [contacts, setContacts] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("contactlist")) || [];
//     setContacts(stored);
//   }, []);

//   function saveContact(event) {
//     event.preventDefault();
//     const name = document.getElementById("name").value;
//     const phone = document.getElementById("phone").value;

//     if (!name.trim()) return alert("Name cannot be empty");
//     if (!/^\d{10}$/.test(phone))
//       return alert("Mobile must be exactly 10 digits");

//     const curdata = JSON.parse(localStorage.getItem("contactlist")) || [];
//     if (curdata.some((c) => c.phone === phone))
//       return alert("This mobile number already exists");

//     const updated = [...curdata, { name, phone }];
//     localStorage.setItem("contactlist", JSON.stringify(updated));
//     setContacts(updated);

//     document.getElementById("name").value = "";
//     document.getElementById("phone").value = "";
//   }

//   const filtered = contacts.filter(
//     (c) =>
//       c.name.toLowerCase().includes(search.toLowerCase()) ||
//       c.phone.includes(search)
//   );

//   return (
//     <div className="gap-6 flex flex-col md:flex-row h-auto md:min-h-[80vh] m-0 md:m-10 max-w-7xl mx-auto px-4 md:px-8">
//       {/* Contacts List Section */}
//       <div className="listsection md:w-1/2 w-full">
//         <div className="container h-full flex flex-col bg-white rounded-2xl shadow-lg border border-gray-100 px-6 py-8 md:px-8 md:py-10">
//           <div className="relative mb-6">
//             <svg
//               className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>
//             <input
//               type="text"
//               name="search"
//               id="search"
//               placeholder="Search contacts..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-alumni text-sm"
//             />
//           </div>
          
//           <div className="contactlist flex-1 overflow-y-auto space-y-2 pr-2">
//             {filtered.length > 0 ? (
//               filtered.map((c, i) => (
//                 <div
//                   key={i}
//                   className="group flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-blue-50 border border-transparent hover:border-blue-100 transition-all duration-200 cursor-pointer"
//                 >
//                   <div className="flex items-center gap-3 flex-1 min-w-0">
//                     <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
//                       {c.name.charAt(0).toUpperCase()}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-gray-900 font-medium text-sm truncate">{c.name}</p>
//                     </div>
//                   </div>
//                   <span className="text-gray-600 font-alumni text-sm ml-4 flex-shrink-0">{c.phone}</span>
//                 </div>
//               ))
//             ) : (
//               <div className="flex flex-col items-center justify-center py-16 text-center">
//                 <svg
//                   className="w-16 h-16 text-gray-300 mb-4"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={1.5}
//                     d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
//                   />
//                 </svg>
//                 <p className="text-gray-500 font-alumni text-sm">
//                   {search ? "No contacts found" : "No contacts yet"}
//                 </p>
//                 <p className="text-gray-400 font-alumni text-xs mt-1">
//                   {search ? "Try a different search term" : "Add your first contact below"}
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Add Contact Section */}
//       <div className="addsection md:w-1/2 w-full flex justify-center items-start md:items-center mt-4 md:mt-0">
//         <div className="container w-full bg-white rounded-2xl shadow-lg border border-gray-100 px-6 py-8 md:px-8 md:py-10">
//           <div className="mb-8">
//             <h1 className="text-gray-900 font-bold text-2xl mb-2 font-alumni">Add a Contact</h1>
//             <p className="text-gray-500 text-sm font-alumni">Create a new contact entry</p>
//           </div>

//           <form onSubmit={saveContact} className="space-y-6">
//             <div className="field">
//               <label
//                 className="block mb-2 text-sm font-medium text-gray-700 font-alumni"
//                 htmlFor="name"
//               >
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 id="name"
//                 placeholder="John Doe"
//                 className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-alumni text-sm"
//               />
//             </div>
            
//             <div className="field">
//               <label
//                 className="block mb-2 text-sm font-medium text-gray-700 font-alumni"
//                 htmlFor="phone"
//               >
//                 Mobile Number
//               </label>
//               <input
//                 type="text"
//                 name="phone"
//                 id="phone"
//                 placeholder="1234567890"
//                 className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-alumni text-sm"
//               />
//             </div>
            
//             <button
//               type="submit"
//               className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 font-alumni text-sm transform hover:-translate-y-0.5"
//             >
//               Add Contact
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MainSec;
