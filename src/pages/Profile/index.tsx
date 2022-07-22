import React from "react";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  return (
    <div>
      Should have different page structure around souls and requests
      <div className="relative">
        <input
          type="range"
          className="form-range w-full h-6 p-0 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none"
          id="customRange"
        />
        <label htmlFor="customRange" className="">
          Example range
        </label>
      </div>
    </div>
  );
};

export default Profile;
