"use client";
import { AuthContext } from "@/context/authcontext";
import Image from "next/image";
import React, { useContext } from "react";

function Header() {
  const auth = useContext(AuthContext);
  if (!auth) return null;

  const { user } = auth;

  return (
    <div className="p-3 shadow-sm flex items-center gap-3">
      <Image src="/a1.jpg" alt="logo" width={60} height={60} />

      {user?.picture && (
        <Image
          src={user.picture}
          alt="User Avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
      )}
    </div>
  );
}

export default Header;
