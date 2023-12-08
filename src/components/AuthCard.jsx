const AuthCard = ({ logo, children }) => (
  <div className="relative py-3 sm:max-w-xl sm:mx-auto mt-12">
    <div className="absolute inset-0 bg-gradient-to-r from-[#FFAA91] to-primary shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
    <div className="relative px-4 py-5 bg-white shadow-lg sm:rounded-3xl sm:p-10 min-w-[360px]">
      <div>{logo}</div>
      {children}
    </div>
  </div>
);

export default AuthCard;
