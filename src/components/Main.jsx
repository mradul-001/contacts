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

  function deleteContact(phone) {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      const curdata = JSON.parse(localStorage.getItem("contactlist")) || [];
      const updated = curdata.filter((c) => c.phone !== phone);
      localStorage.setItem("contactlist", JSON.stringify(updated));
      setContacts(updated);
    }
  }

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <div className="flex flex-col h-auto md:h-[80vh] m-0 md:m-10 px-4 mb-4 md:px-0">

      <div className="listsection w-full flex justify-center h-[90%]">
        <div className="container shadow-2xl shadow-gray-900 h-[100%] flex flex-col w-full md:w-2/3 lg:w-1/2 mx-auto bg-white rounded-lg px-4 md:px-8 py-6 md:py-10 border border-gray-200">
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
              className="bg-[#0066FF] hover:bg-[#0059dd] transition-colors duration-200 text-white text-base font-medium px-6 py-3 rounded-lg font-alumni whitespace-nowrap"
            >
              + Add Contact
            </button>
          </div>
          <div className="contactlist font-alumni flex-1 overflow-y-scroll space-y-2 pr-2">
            {filtered.length > 0 ? (
              filtered.map((c, i) => (
                <div
                  key={i}
                  className="flex cursor-pointer items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0066FF] flex items-center justify-center text-white font-semibold text-lg">
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
                  <button
                    onClick={() => deleteContact(c.phone)}
                    className="flex-shrink-0 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    aria-label="Delete contact"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
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
            className="container bg-white rounded-lg px-6 md:px-10 py-8 md:py-12 w-full max-w-md mx-4 relative border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >

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
                placeholder="Mradul"
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
            <div className="flex gap-3 mt-2">
              <button
                className="flex-1 bg-gray-200 hover:bg-gray-300 transition-colors duration-200 text-gray-700 text-base font-medium py-3.5 rounded-lg font-alumni"
                onClick={() => {
                  setShowAddForm(false);
                  document.getElementById("name").value = "";
                  document.getElementById("phone").value = "";
                }}
              >
                Cancel
              </button>
              <button
                className="flex-1 bg-[#0066FF] hover:bg-[#0066FF] transition-colors duration-200 text-white text-base font-medium py-3.5 rounded-lg font-alumni"
                onClick={saveContact}
              >
                Save Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainSec;